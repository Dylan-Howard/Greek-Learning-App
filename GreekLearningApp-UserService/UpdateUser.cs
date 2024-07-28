using Koine.KoineUser;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Koine.UpdateUser
{
  public class ResponseUser {
    public string id { get; set; }
  }
  public class MultiResponse
  {
    [CosmosDBOutput("koineUsers", "user-container",
      Connection = "CosmosDbConnectionSetting", CreateIfNotExists = true)]
    public required User? User { get; set; }
    public required HttpResponseData HttpResponse { get; set; }
  }
  public class RegisterUser
  {
    private readonly ILogger<RegisterUser> _logger;

    public RegisterUser(ILogger<RegisterUser> logger)
    {
      _logger = logger;
    }

    [Function("UpdateUser")]
    public static async Task<MultiResponse> RunAsync(
      [HttpTrigger(AuthorizationLevel.Anonymous, "patch", Route = "users/{id}")] HttpRequestData req,
      string id)
    {
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      User? reqUser = JsonSerializer.Deserialize<User>(requestBody);

      if (id != null) {
        var user = new User
        {
          id = id,
          name = reqUser?.name ?? "",
          progress = reqUser?.progress,
          settings = reqUser?.settings,
        };

        var okResponse = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await okResponse.WriteAsJsonAsync(new ResponseUser { id = id });

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
}
