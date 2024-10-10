using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace KoineStudy;

public class GetUserSets
{
    private static readonly HttpClient httpClient = new HttpClient();
    private readonly ILogger<GetUserSets> _logger;

    public GetUserSets(ILogger<GetUserSets> logger)
    {
        _logger = logger;
    }

    [Function("GetUserSets")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route="users/{userId}/sets")]
            HttpRequestData req, string userId)
    {

        var userWordsResponse = await httpClient.GetAsync($"https://koine.azure-api.net/api/users/{userId}/words");
        var userWords = await userWordsResponse.Content.ReadFromJsonAsync<List<UserWordProgress>>();

        if (userWords == null) {
            return req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
        }

        Dictionary<int, UserWordProgress> userWordMap = [];
        for (var i = 0; i < userWords.Count; i ++) {
            userWordMap.Add(userWords[i].WordId, userWords[i]);
        }

        var setsResponse = await httpClient.GetAsync("https://koine.azure-api.net/api/sets");
        var sets = await setsResponse.Content.ReadFromJsonAsync<List<SetListItem>>();

        if (sets == null) {
            return req.CreateResponse(System.Net.HttpStatusCode.FailedDependency);
        }

        List<UserSet> userSets = [];

        for (var i = 0; i < sets.Count; i ++) {
            var setResponse = await httpClient.GetAsync($"https://koine.azure-api.net/api/sets/{sets[i].SetId}");
            var set = await setResponse.Content.ReadFromJsonAsync<Set>();

            if (set == null) {
                return req.CreateResponse(System.Net.HttpStatusCode.FailedDependency);
            }

            List<UserWord> userSetWords = [];
            int incompleteCount = 0;

            for (var j = 0; j < set.Words.Count; j++) {
                UserWordProgress? userWord;
                userWordMap.TryGetValue(set.Words[j].RootId, out userWord);

                if (userWord == null) {
                    incompleteCount += 1;
                    userWord = new UserWordProgress {
                        Step = 0,
                        NextReview = DateTime.Now,
                        IsComplete = false,
                    };
                }

                userSetWords.Add(new UserWord {
                    RootId = set.Words[j].RootId,
                    Content = set.Words[j].Content,
                    Gloss = set.Words[j].Gloss,
                    Step = userWord.Step,
                    NextReview = userWord.NextReview,
                    IsComplete = userWord.IsComplete,
                });
            }

            float completeCount = set.Words.Count - incompleteCount;
            float totalWords = set.Words.Count != 0 ? set.Words.Count : 1;

            userSets.Add(new UserSet {
                SetId = sets[i].SetId,
                Title = sets[i].Title,
                Description = sets[i].Description,
                Words = userSetWords,
                Progress = completeCount / totalWords * 100
            });
        }

        var request = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await request.WriteAsJsonAsync(userSets);

        return request;
    }
}
