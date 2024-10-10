using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;

namespace KoineUsers;

public class GetUser
  {
    [Function("GetUser")]
    public static async Task<HttpResponseData> RunAsync(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/{id}")] HttpRequestData req,
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
      await response.WriteAsJsonAsync(user);

      return response;
    }
  }

  class GetUsers {

    [Function("GetUsers")]
    public static async Task<HttpResponseData> RunAsync(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users")]
        HttpRequestData req,
      [CosmosDBInput("koineUsers", "user-container",
        Connection = "CosmosDbConnectionSetting"
      )] IEnumerable<User> users)
    {
      var response = req.CreateResponse(HttpStatusCode.OK);
      await response.WriteAsJsonAsync(users);

      return response;
    }
  }
