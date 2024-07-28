using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Koine.PostGrammaticalForm
{
  public class GrammaticalForm
  {
    public Guid grammarGUID { get; set; }
    public string name { get; set; }
    public string abreviation { get; set; }
    public int lessonId { get; set; }
  }
  public class OutputType
  {
    [SqlOutput("dbo.[GrammaticalForm]", connectionStringSetting: "SqlConnectionString")]
    public GrammaticalForm GrammaticalForm { get; set; }

    public HttpResponseData HttpResponse { get; set; }
  }
  public static class PostGrammaticalForm
  {
    [Function("PostGrammaticalForm")]
    public static async Task<OutputType> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "grammaticalForms")] HttpRequestData req,
        FunctionContext executionContext)
    {
      var logger = executionContext.GetLogger("PostGrammaticalForm");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      GrammaticalForm? grammaticalForm = JsonSerializer.Deserialize<GrammaticalForm>(requestBody);
      
      grammaticalForm.grammarGUID = Guid.NewGuid();

      return new OutputType()
      {
        GrammaticalForm = grammaticalForm,
        HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
      };
    }
  }
}