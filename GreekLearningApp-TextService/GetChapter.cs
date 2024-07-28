using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetChapter
{
    public class Chapter
    {
      public int chapterId { get; set; }
      public int chapterNumber { get; set; }
      public int textId { get; set; }
    }
    public class GetChapter
    {
        [Function("GetChapter")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "chapters/{chapterId}")]
            HttpRequest req,
            [SqlInput(commandText: "SELECT [chapterId], [chapterNumber], [textId] FROM dbo.[Chapter] WHERE [chapterId] = @Id",
                commandType: System.Data.CommandType.Text,
                parameters: "@Id={chapterId}",
                connectionStringSetting: "SqlConnectionString")]
            IEnumerable<Chapter> chapter)
        {

            return new OkObjectResult(chapter.FirstOrDefault());
        }
    }
    public class GetChapters
    {
        [Function("GetChapters")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "chapters")]
            HttpRequest req,
            [SqlInput(commandText: "SELECT [chapterId], [chapterNumber], chp.[textId] FROM dbo.[Chapter] chp",
                commandType: System.Data.CommandType.Text,
                parameters: "",
                connectionStringSetting: "SqlConnectionString")]
            IEnumerable<Chapter> chapter)
        {

            return new OkObjectResult(chapter);
        }
    }
    public class GetChaptersByTextId
    {
        [Function("GetChaptersByTextId")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "texts/{textId}/chapters")]
            HttpRequest req,
            [SqlInput(commandText: "SELECT [chapterId], [chapterNumber], chp.[textId] FROM dbo.[Chapter] chp INNER JOIN [dbo].[Text] txt ON txt.[textID] = chp.[textId] WHERE txt.[textId] = @Id",
                commandType: System.Data.CommandType.Text,
                parameters: "@Id={textId}",
                connectionStringSetting: "SqlConnectionString")]
            IEnumerable<Chapter> chapter)
        {

            return new OkObjectResult(chapter);
        }
    }
}
