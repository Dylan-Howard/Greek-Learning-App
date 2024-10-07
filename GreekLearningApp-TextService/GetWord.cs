using System.Net;
using System.Text.Json.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace KoineTexts;

public class Word
{
    [JsonPropertyName("rootGUID")]
    public Guid RootGUID { get; set; }
    [JsonPropertyName("rootId")]
    public int RootId { get; set; }
    [JsonPropertyName("content")]
    public required string Content { get; set; }
    [JsonPropertyName("occurances")]
    public int Occurances { get; set; }
    [JsonPropertyName("gloss")]
    public string? Gloss { get; set; }
}
public class GetWord
{

    [Function("GetWord")]
    public static async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "words/{rootId}")]
        HttpRequestData req,
        [SqlInput(commandText: "select * from dbo.[Root] where [rootId] = @Id",
            commandType: System.Data.CommandType.Text,
            parameters: "@Id={rootId}",
            connectionStringSetting: "SqlConnectionString")]
        IEnumerable<Word> word)
    {
        if (word == null)
        {
          return req.CreateResponse(HttpStatusCode.NotFound);
        }

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(word.FirstOrDefault());

        return response;
    }
  }

public class GetWords
{
    [Function("GetWords")]
    public static async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "words")]
        HttpRequestData req,
        [SqlInput(commandText: "select * from dbo.[Root]",
            commandType: System.Data.CommandType.Text,
            parameters: "",
            connectionStringSetting: "SqlConnectionString")]
        IEnumerable<Word> words)
    {
        if (words == null)
        {
          return req.CreateResponse(HttpStatusCode.NotFound);
        }

        try {
            string? occurances = req.FunctionContext
                ?.BindingContext
                ?.BindingData["occurances"]
                ?.ToString();

            string? comparison = req.FunctionContext
                ?.BindingContext
                ?.BindingData["comparison"]
                ?.ToString();

                if (occurances != null && comparison != null) {
                    if (comparison == "greater") {
                        words = words.Where((wrd) => wrd.Occurances > int.Parse(occurances));
                    } else {
                        words = words.Where((wrd) => wrd.Occurances < int.Parse(occurances));
                    }
                }
        } catch (Exception) {
          return req.CreateResponse(HttpStatusCode.BadRequest);
        }

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(words);

        return response;
    }
}
public class GetWordsByChapter
{
    [Function("GetWordsByChapter")]
    public static async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "chapters/{chapterId}/words")]
        HttpRequestData req,
        [SqlInput(
            commandText: "SELECT rt.[rootId], rt.[content], rt.[occurances] FROM dbo.[Root] rt INNER JOIN dbo.[Morphology] mrp ON rt.[rootId] = mrp.[rootId] INNER JOIN dbo.[Unit] unt ON mrp.[morphologyId] = unt.[morphologyId] INNER JOIN dbo.[Verse] vrs ON vrs.[verseId] = unt.[verseId] WHERE vrs.[chapterId] = @Id GROUP BY rt.[rootId], rt.[content], rt.[occurances] ORDER BY MIN(unt.[unitPlacement])",
            commandType: System.Data.CommandType.Text,
            parameters: "@Id={chapterId}",
            connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Word> words)
    {
        if (words == null)
        {
          return req.CreateResponse(HttpStatusCode.NotFound);
        }

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(words);

        return response;
    }
}

public class GetWordsByBook
{
    [Function("GetWordsByBook")]
    public static async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "books/{textId}/words")]
        HttpRequestData req,
        [SqlInput(
            commandText: "SELECT rt.[rootId], rt.[content], rt.[occurances] FROM dbo.[Root] rt INNER JOIN dbo.[Morphology] mrp ON rt.[rootId] = mrp.[rootId] INNER JOIN dbo.[Unit] unt ON mrp.[morphologyId] = unt.[morphologyId] INNER JOIN dbo.[Verse] vrs ON vrs.[verseId] = unt.[verseId] INNER JOIN dbo.[Chapter] chp ON chp.[chapterId] = vrs.[chapterId] WHERE chp.[textId] = @Id GROUP BY rt.[rootId], rt.[content], rt.[occurances] ORDER BY MIN(unt.[unitPlacement])",
            commandType: System.Data.CommandType.Text,
            parameters: "@Id={textId}",
            connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Word> words)
    {
        if (words == null)
        {
          return req.CreateResponse(HttpStatusCode.NotFound);
        }

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(words);

        return response;
    }
}
