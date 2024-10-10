using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace KoineStudy;

public class GetUserSet
{
    private static readonly HttpClient httpClient = new HttpClient();
    private readonly ILogger<GetUserSets> _logger;

    public GetUserSet(ILogger<GetUserSets> logger)
    {
        _logger = logger;
    }

    [Function("GetUserSet")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route="users/{userId}/sets/{setId}")]
            HttpRequestData req, string userId, string setId)
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

        var setResponse = await httpClient.GetAsync($"https://koine.azure-api.net/api/sets/{setId}");
        var set = await setResponse.Content.ReadFromJsonAsync<Set>();

        if (set == null) {
            return req.CreateResponse(System.Net.HttpStatusCode.FailedDependency);
        }

        List<UserWord> userSetWords = [];
        int incompleteCount = 0;

        for (var i = 0; i < set.Words.Count; i++) {
            UserWordProgress? userWord;
            userWordMap.TryGetValue(set.Words[i].RootId, out userWord);

            if (userWord == null) {
                incompleteCount += 1;
                userWord = new UserWordProgress {
                    Step = 0,
                    NextReview = DateTime.Now,
                    IsComplete = false,
                };
            }

            userSetWords.Add(new UserWord {
                RootId = set.Words[i].RootId,
                Content = set.Words[i].Content,
                Gloss = set.Words[i].Gloss,
                Step = userWord.Step,
                NextReview = userWord.NextReview,
                IsComplete = userWord.IsComplete,
            });
        }

        float completeCount = set.Words.Count - incompleteCount;
        float totalWords = set.Words.Count != 0 ? set.Words.Count : 1;

        var userSet = new UserSet {
            SetId = set.SetId,
            Title = set.Title,
            Description = set.Description,
            Words = userSetWords,
            Progress = completeCount / totalWords * 100
        };

        var request = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await request.WriteAsJsonAsync(userSet);

        return request;
    }
}
