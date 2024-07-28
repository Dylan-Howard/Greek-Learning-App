using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Koine.PostChapter
{
  public class Chapter
  {
    public Guid chapterGUID { get; set; }
    public int chapterNumber { get; set; }
    public int textId { get; set; }
  }
  public class OutputType
  {
    [SqlOutput("dbo.[Chapter]", connectionStringSetting: "SqlConnectionString")]
    public Chapter Chapter { get; set; }

    public HttpResponseData HttpResponse { get; set; }
  }
  public static class PostChapter
  {
    // create a new ToDoItem from body object
    // uses output binding to insert new item into ToDo table
    [Function("PostChapter")]
    public static async Task<OutputType> Run(
    // public static async Task<IActionResult> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "chapters")] HttpRequestData req,
        FunctionContext executionContext)
    {
      var logger = executionContext.GetLogger("PostChapter");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      Chapter? chapter = JsonSerializer.Deserialize<Chapter>(requestBody);
      
      chapter.chapterGUID = Guid.NewGuid();

      // Proceed with processing if necessary values are present
      return new OutputType()
      {
        Chapter = chapter,
        HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
      };
    }
  }
}