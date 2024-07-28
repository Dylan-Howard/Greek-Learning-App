using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetSelections
{
  public class Selections
  {
    public TextSelection[] texts { get; set; }
    public ChapterSelection[] chapters { get; set; }
  }
  public class TextSelection
  {
    public int textId { get; set; }
    public string title { get; set; }
  }
  public class ChapterSelection
  {
    public int chapterId { get; set; }
    public int chapterNumber { get; set; }
  }
    
  public class GetSelectionsByTextId
  {
    [Function("GetSelectionsByTextId")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "selections/{textId}")]
      HttpRequest req,
      [SqlInput(commandText: "select [textId], [title] from dbo.[Text]",
        commandType: System.Data.CommandType.Text,
        parameters: "",
        connectionStringSetting: "SqlConnectionString")
      ] IEnumerable<TextSelection> texts,
      [SqlInput(commandText: "SELECT [chapterId], [chapterNumber] FROM dbo.[Chapter] chp INNER JOIN [dbo].[Text] txt ON txt.[textID] = chp.[textId] WHERE txt.[textId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={textId}",
        connectionStringSetting: "SqlConnectionString")
      ] IEnumerable<ChapterSelection> chapters
    )
    {
      var selections = new Selections
      {
        texts = texts.ToArray(),
        chapters = chapters.ToArray(),
      };
      
      return new OkObjectResult(selections);
    }
  }
}
