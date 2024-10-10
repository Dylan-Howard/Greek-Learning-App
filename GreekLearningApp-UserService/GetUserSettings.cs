using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;

namespace KoineUsers;
  
public class GetUserSettings
{
    [Function("GetUserSettings")]
    public static async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/{id}/settings")] HttpRequestData req,
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
      await response.WriteAsJsonAsync(user.Settings);

      return response;
    }
}