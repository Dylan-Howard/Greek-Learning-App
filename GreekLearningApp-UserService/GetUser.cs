using Koine.KoineUser;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker.Extensions;
using Microsoft.Azure;
using Microsoft.Azure.WebJobs.Extensions.CosmosDB;
using System.Net;
using Newtonsoft.Json;
using Microsoft.Azure.Documents.Client;

namespace Koine.GetUser
{
  public class GetUser
  {
    private readonly ILogger<GetUser> _logger;

    public GetUser(ILogger<GetUser> logger)
    {
      _logger = logger;
    }

    [Function("GetUser")]
    public async Task<IActionResult> Run(
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
        _logger.LogInformation($"User with ID '{user}' not found.");
        return new NotFoundResult(); 
      }

      _logger.LogInformation($"Retrieved user: {user?.id}");

      return new OkObjectResult(user);
    }
  }

  class GetUsers {

    [Function("GetUsers")]
    public async Task<IActionResult> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users")]
        HttpRequestData req,
      [CosmosDBInput("koineUsers", "user-container",
        Connection = "CosmosDbConnectionSetting"
      )] IEnumerable<User> users)
    {
      return new OkObjectResult(users);
    }
  }

  public class GetUserLessons
  {
    [Function("GetUserLessons")]
    public async Task<IActionResult> Run(
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
        return new NotFoundResult(); 
      }

      return new OkObjectResult(user.progress?.lessons);
    }
  }
  public class GetUserVocabulary
  {
    [Function("GetUserVocabulary")]
    public async Task<IActionResult> Run(
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
        return new NotFoundResult(); 
      }

      return new OkObjectResult(user.progress?.vocabulary);
    }
  }
  public class GetUserSettings
  {
    [Function("GetUserSettings")]
    public async Task<IActionResult> Run(
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
        return new NotFoundResult(); 
      }

      return new OkObjectResult(user.settings);
    }
  }
}
