using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace KoineTexts;

public class Set
{
    [JsonPropertyName("setId")]
    public int SetId { get; set; }
    [JsonPropertyName("title")]
    public string? Title { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
}
public class SetResponse : Set
{
    [JsonPropertyName("words")]
    public required List<Word> Words { get; set; }
}
public class GetSet
{
    private static readonly HttpClient httpClient = new HttpClient();
    private readonly ILogger<GetSet> _logger;

    public GetSet(ILogger<GetSet> logger)
    {
        _logger = logger;
    }

    [Function("GetSet")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route="sets/{setId}")]
        HttpRequestData req,
        [SqlInput(commandText: "SELECT * FROM dbo.[Set] WHERE setId = @Id",
            commandType: System.Data.CommandType.Text,
            parameters: "@Id={setId}",
            connectionStringSetting: "SqlConnectionString")]
        IEnumerable<Set> sets)
    {
        var set = sets.FirstOrDefault();

        if (set == null) {
            return req.CreateResponse(System.Net.HttpStatusCode.NotFound);
        }

        var membersResponse = await httpClient.GetAsync($"https://koine.azure-api.net/api/sets/{set.SetId}/members");
        
        if (membersResponse.StatusCode != System.Net.HttpStatusCode.OK) {
            _logger.LogInformation(membersResponse.StatusCode.ToString());

            return req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
        }
        _logger.LogInformation(membersResponse.Content.ToString());
        var members = await membersResponse.Content.ReadFromJsonAsync<List<Word>>();

        if (members == null) {
            return req.CreateResponse(System.Net.HttpStatusCode.NotFound);
        }

        var setResponse = new SetResponse {
            SetId = set.SetId,
            Title = set.Title,
            Description = set.Description,
            Words = members
        };

        var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await response.WriteAsJsonAsync(setResponse);

        return response;
    }
}

public class GetSets
{
    private readonly ILogger<GetSet> _logger;

    public GetSets(ILogger<GetSet> logger)
    {
        _logger = logger;
    }

    [Function("GetSets")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route="sets")]
        HttpRequestData req,
        [SqlInput(commandText: "select * from dbo.[Set]",
            commandType: System.Data.CommandType.Text,
            parameters: "",
            connectionStringSetting: "SqlConnectionString")]
        IEnumerable<Set> sets)
    {
        if (sets == null) {
            return req.CreateResponse(System.Net.HttpStatusCode.NotFound);
        }

        var request = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await request.WriteAsJsonAsync(sets);

        return request;
    }
}

