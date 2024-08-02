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

namespace Koine.PostText
{
  public class Text
  {
      public Guid textGUID { get; set; }
    public string title { get; set; }
  }
  public class OutputType
  {
    [SqlOutput("dbo.[Text]", connectionStringSetting: "SqlConnectionString")]
    public Text Text { get; set; }

    public HttpResponseData HttpResponse { get; set; }
  }
  public static class PostText
  {
    // create a new ToDoItem from body object
    // uses output binding to insert new item into ToDo table
    [Function("PostText")]
    public static async Task<OutputType> Run(
    // public static async Task<IActionResult> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "texts")] HttpRequestData req,
        FunctionContext executionContext)
    {
      var logger = executionContext.GetLogger("PostText");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      Text? textItem = JsonSerializer.Deserialize<Text>(requestBody);

      textItem.textGUID = Guid.NewGuid();

      // Proceed with processing if necessary values are present
      return new OutputType()
      {
        Text = textItem,
        HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
      };
    }
  }
}