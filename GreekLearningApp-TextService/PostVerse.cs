using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Koine.PostVerse
{
  public class Verse
  {
    public Guid verseGUID { get; set; }
    public int verseNumber { get; set; }
    public int chapterId { get; set; }
  }
  public class OutputType
  {
    [SqlOutput("dbo.[Verse]", connectionStringSetting: "SqlConnectionString")]
    public Verse Verse { get; set; }

    public HttpResponseData HttpResponse { get; set; }
  }
  public static class PostVerse
  {
    // create a new ToDoItem from body object
    // uses output binding to insert new item into ToDo table
    [Function("PostVerse")]
    public static async Task<OutputType> Run(
    // public static async Task<IActionResult> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "verses")] HttpRequestData req,
        FunctionContext executionContext)
    {
      var logger = executionContext.GetLogger("PostVerse");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      Verse? verse = JsonSerializer.Deserialize<Verse>(requestBody);
      
      verse.verseGUID = Guid.NewGuid();

      return new OutputType()
      {
        Verse = verse,
        HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
      };
    }
  }
}