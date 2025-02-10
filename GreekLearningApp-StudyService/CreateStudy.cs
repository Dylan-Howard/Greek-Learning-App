using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Google.Protobuf.WellKnownTypes;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace KoineStudy;

public class CreateStudyRequest {
    [JsonPropertyName("userId")]
    public required string UserId { get; set; }
    [JsonPropertyName("setId")]
    public required int SetId { get; set; }
}

public class CreateStudy
{
    private static readonly HttpClient httpClient = new HttpClient();
    private readonly ILogger<GetUserSets> _logger;

    public CreateStudy(ILogger<GetUserSets> logger)
    {
        _logger = logger;
    }

    private StudyQuestion CreateQuestion(int currentWord, string promptType, string responseType, List<UserWord> wordBank) {

        QuestionPrompt prompt;
        UserWord promptWord = wordBank[currentWord];

        if (promptType == "text") {
            prompt = new TextPrompt{
              Type = "text",
              Text = promptWord.Content ?? "No text available"
            };
        } else {
            prompt = new TextPrompt{
              Type = "text",
              Text = promptWord.Content ?? "No text available"
            };
        }

        IEnumerable<QuestionChoice> choices = [];
        if (responseType == "text") {
            choices = choices.Append(new TextChoice {
                Type = "text",
                Text = promptWord.Content ?? "No text available"
            });

            var responseChoices = choices.ToList();

            var rng = new Random();
            for (var i = 0; i < 3; i++) {
                var insertIndex = rng.Next(0, responseChoices.Count);

                choices = choices.Append(new TextChoice {
                    Type = "text",
                    Text = responseChoices[insertIndex].Text ?? "No text available"
                });

                responseChoices.RemoveAt(insertIndex);
            }
        } else {
            choices = choices.Append(new TextChoice {
                Type = "text",
                Text = promptWord.Content ?? "No text available"
            });

            var responseChoices = choices.ToList();

            var rng = new Random();
            for (var i = 0; i < 3; i++) {
                var insertIndex = rng.Next(0, responseChoices.Count);

                choices = choices.Append(new TextChoice {
                    Type = "text",
                    Text = responseChoices[insertIndex].Text ?? "No text available"
                });

                responseChoices.RemoveAt(insertIndex);
            }
        }

        return new StudyQuestion {
            Prompt = prompt,
            Options = choices,
            Answer = 0,
            IsActive = true
        };
    }

    [Function("CreateStudy")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route="studies")]
            HttpRequestData req)
    {
        CreateStudyRequest? request = await req.ReadFromJsonAsync<CreateStudyRequest>();

        if (request == null) {
            return req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
        }

        _logger.LogInformation($"https://koine.azure-api.net/api/users/{request.UserId}/sets/{request.SetId}");
        
        var setResponse = await httpClient.GetAsync($"https://koine.azure-api.net/api/users/{request.UserId}/sets/{request.SetId}");
        if (setResponse.StatusCode != System.Net.HttpStatusCode.OK) {
          return req.CreateResponse(System.Net.HttpStatusCode.FailedDependency);
        }
        _logger.LogInformation(await setResponse.Content.ReadAsStringAsync());
        var userSet = await setResponse.Content.ReadFromJsonAsync<UserSet>();

        if (userSet == null) {
            return req.CreateResponse(System.Net.HttpStatusCode.FailedDependency);
        }

        List<UserWord> toReview = userSet.Words
            .OrderBy((wrd) => wrd.IsComplete)
            .OrderBy((wrd) => wrd.IsComplete)
            .Take(12)
            .ToList();

        IEnumerable<StudyQuestion> questions = [];
        for (var i = 0; i < toReview.Count; i++) {
            // string promptType = i % 2 == 0 ? "image" : "text";
            // string responseType = i + 1 % 4 == 0 ? "image" : "text";
            string promptType = "text";
            string responseType = "text";
            questions = questions.Append(CreateQuestion(i, promptType, responseType, toReview));
        }

        var study = new Study {
            StudyId = 1,
            Questions = questions
        };

        var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await response.WriteAsJsonAsync<Study>(study);

        return response;
    }
}
