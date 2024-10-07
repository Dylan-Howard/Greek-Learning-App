using System.Text.Json;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Koine.UpdateWord
{
  public class Word
  {
    public int rootId { get; set; }
    public string content { get; set; }
    public int occurances { get; set; }
  }
  public class OutputType
  {
    [SqlOutput("dbo.[Root]", connectionStringSetting: "SqlConnectionString")]
    public Word? Word { get; set; }

    public required HttpResponseData HttpResponse { get; set; }
  }
  public static class UpdateWord
  {
    [Function("UpdateWord")]
    public static async Task<OutputType> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "words/update")] HttpRequestData req,
        FunctionContext executionContext)
    {
      var logger = executionContext.GetLogger("PostWord");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      Word? word = JsonSerializer.Deserialize<Word>(requestBody);

      if (word == null) {
        return new OutputType {
          Word = null,
          HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError)
        };
      }

      return new OutputType()
      {
        Word = word,
        HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
      };
    }
  }
}
