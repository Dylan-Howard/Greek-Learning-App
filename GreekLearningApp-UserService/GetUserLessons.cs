using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using KoineUsers;

namespace KoineUsers;
public class GetUserLessons
{
    [Function("GetUserLessons")]
    public static async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/{id}/lessons")]
            HttpRequestData req,
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
        await response.WriteAsJsonAsync(user.Progress?.Lessons);

        return response;
    }
}