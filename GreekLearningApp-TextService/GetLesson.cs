using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;

namespace Koine.GetLesson
{
  public class Lesson
  {
    public Guid lessonGUID { get; set; }
    public int lessonId { get; set; }
    public string title { get; set; }
  }
  public class GetLesson
  {

    [Function("GetLesson")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "lessons/{lessonId}")]
      HttpRequest req,
      [SqlInput(commandText: "SELECT * FROM dbo.[Lesson] WHERE [lessonId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={lessonId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Lesson> lesson)
    {
      return new OkObjectResult(lesson.FirstOrDefault());
    }
  }

  public class GetLessons
  {
    [Function("GetLessons")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "lessons")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[Lesson]",
        commandType: System.Data.CommandType.Text,
        parameters: "",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Lesson> lesson)
    {
      return new OkObjectResult(lesson);
    }
  }
  public class GetLessonByGrammaticalForm
  {

    [Function("GetLessonByGrammaticalForm")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "grammaticalForms/{grammarId}/lessons")]
      HttpRequest req,
      [SqlInput(commandText: "SELECT * FROM dbo.[Lesson] lsn INNER JOIN [dbo].[GrammaticalForm] frm ON lsn.[lessonId] = frm.[lessonId] WHERE frm.[grammarId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={grammarId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Lesson> lesson)
    {
      return new OkObjectResult(lesson.FirstOrDefault());
    }
  }
}

