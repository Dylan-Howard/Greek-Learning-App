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

namespace KoineUsers;

public class GetUser
  {
    private readonly ILogger<GetUser> _logger;

    public GetUser(ILogger<GetUser> logger)
    {
      _logger = logger;
    }

    [Function("GetUser")]
    public IActionResult Run(
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

      _logger.LogInformation($"Retrieved user: {user?.Id}");

      return new OkObjectResult(user);
    }
  }

  class GetUsers {

    [Function("GetUsers")]
    public static IActionResult Run(
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
    public static IActionResult Run(
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

      return new OkObjectResult(user.Progress?.Lessons);
    }
  }
  public class GetUserVocabulary
  {
    [Function("GetUserVocabulary")]
    public static IActionResult Run(
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

      return new OkObjectResult(user.Progress?.Vocabulary);
    }
  }
  public class GetUserSettings
  {
    [Function("GetUserSettings")]
    public static IActionResult Run(
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

      return new OkObjectResult(user.Settings);
    }
  }
