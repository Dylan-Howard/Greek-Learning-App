using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Koine.PostWord
{
  public class Word
  {
    public Guid rootGUID { get; set; }
    public string content { get; set; }
    public int occurances { get; set; }
  }
  public class OutputType
  {
    [SqlOutput("dbo.[Root]", connectionStringSetting: "SqlConnectionString")]
    public Word Word { get; set; }

    public HttpResponseData HttpResponse { get; set; }
  }
  public static class PostWord
  {
    [Function("PostWord")]
    public static async Task<OutputType> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "words")] HttpRequestData req,
        FunctionContext executionContext)
    {
      var logger = executionContext.GetLogger("PostWord");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      Word? word = JsonSerializer.Deserialize<Word>(requestBody);

      return new OutputType()
      {
        Word = word,
        HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
      };
    }
  }
}