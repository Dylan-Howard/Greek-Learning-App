using Koine.KoineUser;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Koine.CreateUser
{
  public class ResponseUser {
    public string id { get; set; }
  }
  public class MultiResponse
  {
    [CosmosDBOutput("koineUsers", "user-container",
      Connection = "CosmosDbConnectionSetting", CreateIfNotExists = true)]
    public required User User { get; set; }
    public required HttpResponseData HttpResponse { get; set; }
  }
  public class RegisterUser
  {
    private readonly ILogger<RegisterUser> _logger;

    public RegisterUser(ILogger<RegisterUser> logger)
    {
      _logger = logger;
    }

    [Function("CreateUser")]
    public static async Task<MultiResponse> RunAsync(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users")] HttpRequestData req)
    {
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      User? reqUser = JsonSerializer.Deserialize<User>(requestBody);

      var user = new User
      {
        id = reqUser?.id ?? Guid.NewGuid().ToString(),
        name = reqUser?.name ?? "",
        progress = reqUser?.progress ?? new UserProgress
        {
          lessons = [],
          vocabulary = []
        },
        settings = new UserSettings
        {
          prefersDarkMode = false,
          translation = "esv"
        }
      };

      var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
      // response.Headers.Add("Content-Type", "application/json");
      await response.WriteAsJsonAsync(new ResponseUser { id = user.id });

      // Return a response to both HTTP trigger and Azure Cosmos DB output binding.
      return new MultiResponse()
      {
        User = user,
        HttpResponse = response
      };
    }
  }
}
