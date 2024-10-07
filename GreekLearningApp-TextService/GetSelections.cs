using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetSelections
{
  public class Selections
  {
    [JsonPropertyName("texts")]
    public required TextSelection[] Texts { get; set; }
    [JsonPropertyName("chapters")]
    public required ChapterSelection[] Chapters { get; set; }
  }
  public class TextSelection
  {
      [JsonPropertyName("textId")]
      public int TextId { get; set; }
      [JsonPropertyName("title")]
      public required string Title { get; set; }

      public TextSelection(string title)
      {
          Title = title ?? "";
      }
  }
  public class ChapterSelection
  {
    [JsonPropertyName("chapterId")]
    public int ChapterId { get; set; }
    [JsonPropertyName("chapterNumber")]
    public int ChapterNumber { get; set; }
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
        Texts = texts.ToArray(),
        Chapters = chapters.ToArray(),
      };
      
      return new OkObjectResult(selections);
    }
  }
}
