using System.Net;
using KoineUsers;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace KoineUsers;
public class GetUserVocabulary
{
    [Function("GetUserVocabulary")]
    public static async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/{id}/words")] HttpRequestData req,
        [CosmosDBInput("koineUsers", "user-container",
            Connection = "CosmosDbConnectionSetting",
            Id = "{id}",
            PartitionKey = "{id}"
        )] User user
        )
    {
        if (user == null)
        {
            return req.CreateResponse(HttpStatusCode.NotFound);
        }

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(user.Progress?.Vocabulary);

        return response;
    }
}