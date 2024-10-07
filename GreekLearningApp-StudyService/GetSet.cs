using System.Text.Json.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace KoineStudy.GetSet;

public class Word
{
    [JsonPropertyName("rootId")]
    public int RootId { get; set; }
    [JsonPropertyName("content")]
    public required string Content { get; set; }
    [JsonPropertyName("gloss")]
    public required string Gloss { get; set; }
}
public class Set
{
    [JsonPropertyName("setId")]
    public int SetId { get; set; }
    [JsonPropertyName("title")]
    public int Title { get; set; }
    [JsonPropertyName("description")]
    public int Description { get; set; }
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

    [Function("GetSets")]
    public async Task<HttpResponseData> RunAsync([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route="sets")] HttpRequestData req)
    {

        // _logger.LogInformation("C# HTTP trigger function processed a request.");

        // var response = await httpClient.GetAsync("https://koine.azure-api.net/api/words");

        // const List<Set> sets = [
        //   new Set {
        //     SetId = 1,
        //     Words = new List<Word>()
        //   }
        // ]

        var request = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await request.WriteStringAsync();

        return request;
    }
}
