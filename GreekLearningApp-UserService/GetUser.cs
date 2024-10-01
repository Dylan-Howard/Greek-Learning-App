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
      await response.WriteAsJsonAsync(user.Progress?.Vocabulary);

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

  public class GetUserLessons
  {
    [Function("GetUserLessons")]
    public static async Task<HttpResponseData> RunAsync(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/{id}/lessons")] HttpRequestData req,
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
  public class GetUserVocabulary
  {
    [Function("GetUserVocabulary")]
    public static async Task<HttpResponseData> RunAsync(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/{id}/vocabulary")] HttpRequestData req,
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
