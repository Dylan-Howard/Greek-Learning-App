using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetGrammaticalForm
{
  public class GrammaticalForm
  {
    public Guid grammarGUID { get; set; }
    public int grammarId { get; set; }
    public string name { get; set; }
    public string abbreviation { get; set; }
    public int lessonId { get; set; }
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

