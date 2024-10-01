using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;

namespace KoineUsers;

public class UserUpdateResponse
  {
    [CosmosDBOutput("koineUsers", "user-container",
      Connection = "CosmosDbConnectionSetting")]
    public required User? User { get; set; }
    public required HttpResponseData HttpResponse { get; set; }
}

public class UpdateUser
{
  [Function("UpdateUser")]
  public static async Task<UserUpdateResponse> RunAsync(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users/{id}")] HttpRequestData req,
    string id)
  {
    User? requestUser = await req.ReadFromJsonAsync<User>();

    if (id == null || requestUser == null) {
      var notFoundResponse = req.CreateResponse(HttpStatusCode.NotFound);

      return new UserUpdateResponse
      {
        User = null,
        HttpResponse = notFoundResponse
      };
    }

    if (id != requestUser.Id) {
      var badRequestRepsonse = req.CreateResponse(HttpStatusCode.BadRequest);

      return new UserUpdateResponse
      {
        User = null,
        HttpResponse = badRequestRepsonse
      };
    }

    var user = new User
    {
      Id = requestUser.Id,
      Name = requestUser.Name,
      Progress = requestUser.Progress,
      Settings = requestUser.Settings,
    };

    var okResponse = req.CreateResponse(HttpStatusCode.OK);
    await okResponse.WriteAsJsonAsync(new ResponseUser { Id = user.Id });
    
    // Return a response to both HTTP trigger and Azure Cosmos DB output binding.
    return new UserUpdateResponse
    {
      User = user,
      HttpResponse = okResponse
    };
  }
}
