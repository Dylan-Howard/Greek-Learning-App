using System.Text.Json.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace KoineTexts;

public class SetMembership
{
    [JsonPropertyName("setId")]
    public int SetId { get; set; }
    [JsonPropertyName("rootId")]
    public int RootId { get; set; }
}

public class GetSetMemberships
{
    private static readonly HttpClient httpClient = new HttpClient();
    private readonly ILogger<GetSet> _logger;

    public GetSetMemberships(ILogger<GetSet> logger)
    {
        _logger = logger;
    }

    [Function("GetSetMemberships")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route="sets/{setId}/memberships")]
        HttpRequestData req,
        [SqlInput(commandText: "select * from dbo.[SetMembership] where [setId] = @Id",
            commandType: System.Data.CommandType.Text,
            parameters: "@Id={setId}",
            connectionStringSetting: "SqlConnectionString")]
        IEnumerable<SetMembership> memberships)
    {
        if (memberships == null) {
            return req.CreateResponse(System.Net.HttpStatusCode.NotFound);
        }

        var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await response.WriteAsJsonAsync(memberships);

        return response;
    }
}

public class GetSetMembers
{
    private static readonly HttpClient httpClient = new HttpClient();
    private readonly ILogger<GetSet> _logger;

    public GetSetMembers(ILogger<GetSet> logger)
    {
        _logger = logger;
    }

    [Function("GetSetMembers")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route="sets/{setId}/members")]
        HttpRequestData req,
        [SqlInput(commandText: "SELECT rot.[rootGUID], rot.[rootId], rot.[content], rot.[occurances], rot.[gloss] FROM dbo.[SetMembership] mem INNER JOIN dbo.[Root] rot ON rot.[rootId] = mem.[rootId] WHERE mem.[setId] = @Id",
            commandType: System.Data.CommandType.Text,
            parameters: "@Id={setId}",
            connectionStringSetting: "SqlConnectionString")]
        IEnumerable<Word> members)
    {
        if (members == null) {
            return req.CreateResponse(System.Net.HttpStatusCode.NotFound);
        }

        var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await response.WriteAsJsonAsync(members);

        return response;
    }
}
