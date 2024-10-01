using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;

namespace KoineUsers;

public class CreateUserResponse
{
  [CosmosDBOutput("koineUsers", "user-container",
    Connection = "CosmosDbConnectionSetting", CreateIfNotExists = true)]
  public required User? User { get; set; }
  public required HttpResponseData HttpResponse { get; set; }
};

public class CreateUser
{
    [Function("CreateUser")]
    public static async Task<CreateUserResponse> RunAsync(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users")] HttpRequestData req)
    {
      User? requestUser = await req.ReadFromJsonAsync<User>();

      if (requestUser == null || requestUser.Id == null) {
        // Return a response to both HTTP trigger and Azure Cosmos DB output binding.
        return new CreateUserResponse
        {
          User = null,
          HttpResponse = req.CreateResponse(HttpStatusCode.BadRequest)
        };
      }

      var user = new User
      {
        Id = requestUser.Id ?? Guid.NewGuid().ToString(),
        Name = requestUser.Name ?? "",
        Progress = requestUser.Progress ?? new UserProgress
        {
          Lessons = [],
          Vocabulary = []
        },
        Settings = new UserSettings
        {
          PrefersDarkMode = false,
          Translation = "esv"
        }
      };

      var response = req.CreateResponse(HttpStatusCode.OK);
      await response.WriteAsJsonAsync(new ResponseUser { Id = user.Id });

      // Return a response to both HTTP trigger and Azure Cosmos DB output binding.
      return new CreateUserResponse
      {
        User = user,
        HttpResponse = response
      };
    }
  }
