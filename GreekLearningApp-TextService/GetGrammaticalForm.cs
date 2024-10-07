using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetGrammaticalForm
{
  public class GrammaticalForm
  {
    [JsonPropertyName("grammarGUID")]
    public Guid GrammarGUID { get; set; }
    [JsonPropertyName("grammarId")]
    public int GrammarId { get; set; }
    [JsonPropertyName("name")]
    public required string Name { get; set; }
    [JsonPropertyName("abbreviation")]
    public required string Abbreviation { get; set; }
    [JsonPropertyName("lessonId")]
    public int LessonId { get; set; }
  }
  public class GetGrammaticalForm
  {

    [Function("GetGrammaticalForm")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "grammaticalForms/{grammarId}")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[GrammaticalForm] where [grammarId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={textId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<GrammaticalForm> grammaticalForm)
    {
      return new OkObjectResult(grammaticalForm.FirstOrDefault());
    }
  }

  public class GetGrammaticalForms
  {
    [Function("GetGrammaticalForms")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "grammaticalForms")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[GrammaticalForm]",
        commandType: System.Data.CommandType.Text,
        parameters: "",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<GrammaticalForm> grammaticalForm)
    {
      return new OkObjectResult(grammaticalForm);
    }
  }
}

