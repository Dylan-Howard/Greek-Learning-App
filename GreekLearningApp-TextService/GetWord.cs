using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetWord
{
  public class Word
  {
    public Guid rootGUID { get; set; }
    public int rootId { get; set; }
    public string content { get; set; }
    public int occurances { get; set; }
  }
  public class GetWord
  {

    [Function("GetWord")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "words/{rootId}")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[Root] where [rootId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={rootId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Word> word)
    {
      return new OkObjectResult(word.FirstOrDefault());
    }
  }

  public class GetWords
  {
    [Function("GetWords")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "words")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[Root]",
        commandType: System.Data.CommandType.Text,
        parameters: "",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Word> word)
    {
      return new OkObjectResult(word);
    }
  }
    public class GetWordsByChapter
  {
    [Function("GetWordsByChapter")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "chapters/{chapterId}/words")]
      HttpRequest req,
      [SqlInput(
        commandText: "SELECT rt.[rootId], rt.[content], rt.[occurances] FROM dbo.[Root] rt INNER JOIN dbo.[Morphology] mrp ON rt.[rootId] = mrp.[rootId] INNER JOIN dbo.[Unit] unt ON mrp.[morphologyId] = unt.[morphologyId] INNER JOIN dbo.[Verse] vrs ON vrs.[verseId] = unt.[verseId] WHERE vrs.[chapterId] = @Id GROUP BY rt.[rootId], rt.[content], rt.[occurances] ORDER BY MIN(unt.[unitPlacement])",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={chapterId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Word> word)
    {
      return new OkObjectResult(word);
    }
  }
}

