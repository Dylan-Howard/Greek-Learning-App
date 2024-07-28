// using System;
// using System.Collections.Generic;
// using System.IO;
// using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Koine.PostLesson
{
  public class Lesson
  {
    public Guid lessonGUID { get; set; }
    public string title { get; set; }
  }
  public class OutputType
  {
    [SqlOutput("dbo.[Lesson]", connectionStringSetting: "SqlConnectionString")]
    public Lesson Lesson { get; set; }

    public HttpResponseData HttpResponse { get; set; }
  }
  public static class PostLesson
  {
    [Function("PostLesson")]
    public static async Task<OutputType> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "lessons")] HttpRequestData req,
        FunctionContext executionContext)
    {
      var logger = executionContext.GetLogger("PostLesson");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      Lesson? lesson = JsonSerializer.Deserialize<Lesson>(requestBody);
      
      lesson.lessonGUID = Guid.NewGuid();

      return new OutputType()
      {
        Lesson = lesson,
        HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
      };
    }
  }
}