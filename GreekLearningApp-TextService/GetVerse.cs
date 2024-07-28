using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetVerse
{
  public class Verse
  {
    public Guid verseGUID { get; set; }
    public int verseId { get; set; }
    public int verseNumber { get; set; }
    public int chapterId { get; set; }
  }
  public class GetVerse
  {

    [Function("GetVerse")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "verses/{verseId}")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[Verse] where [verseId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={textId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Verse> verse)
    {
      return new OkObjectResult(verse.FirstOrDefault());
    }
  }

  public class GetVerses
  {
    [Function("GetVerses")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "verses")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[Verse]",
        commandType: System.Data.CommandType.Text,
        parameters: "",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Verse> verse)
    {
      return new OkObjectResult(verse);
    }
  }
}

