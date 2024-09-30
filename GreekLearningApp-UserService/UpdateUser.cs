using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace KoineUsers;

public class UpdateUser
{
  private readonly ILogger<RegisterUser> _logger;

  public UpdateUser(ILogger<RegisterUser> logger)
  {
    _logger = logger;
  }

  [Function("UpdateUser")]
  public static async Task<MultiResponse> RunAsync(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users/{id}")] HttpRequestData req,
    string id)
  {
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      User? reqUser = JsonSerializer.Deserialize<User>(requestBody);

      if (id != null) {
        var user = new User
        {
          Id = id,
          Name = reqUser?.Name ?? "",
          Progress = reqUser?.Progress,
          Settings = reqUser?.Settings,
        };

        var okResponse = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await okResponse.WriteAsJsonAsync(new ResponseUser { Id = id });

        // Return a response to both HTTP trigger and Azure Cosmos DB output binding.
        return new MultiResponse()
        {
          User = user,
          HttpResponse = okResponse
        };
      }

      var response = req.CreateResponse(System.Net.HttpStatusCode.NotFound);

      // Return a response to both HTTP trigger and Azure Cosmos DB output binding.
      return new MultiResponse()
      {
        User = null,
        HttpResponse = response
      };
    }
  }
