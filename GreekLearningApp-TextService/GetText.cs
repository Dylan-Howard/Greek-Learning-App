using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Koine.GetText
{
  public class Text
  {
    [JsonPropertyName("textGUID")]
    public Guid TextGUID { get; set; }
    [JsonPropertyName("textId")]
    public int TextId { get; set; }
    [JsonPropertyName("title")]
    public required string Title { get; set; }
  }
  public class GetText
  {

    [Function("GetText")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "texts/{textId}")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[Text] where [textId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={textId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Text> text)
    {
      return new OkObjectResult(text.FirstOrDefault());
    }
  }

  public class GetTexts
  {
    [Function("GetTexts")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "texts")]
      HttpRequest req,
      [SqlInput(commandText: "select [textId], [title] from dbo.[Text]",
        commandType: System.Data.CommandType.Text,
        parameters: "",
        connectionStringSetting: "SqlConnectionString")] IEnumerable<Text> text,
      FunctionContext executionContext
      )
    {
      var logger = executionContext.GetLogger("PostChapter");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      return new OkObjectResult(text);
    }
  }
}

