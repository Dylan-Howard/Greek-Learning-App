using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Koine.PostMorphology
{
  public class Morphology
  {
    public int morphologyId { get; set; }
    public Guid morphologyGUID { get; set; }
    public string content { get; set; }
    public int posId { get; set; }
    public int? caseId { get; set; }
    public int? tenseId { get; set; }
    public int? voiceId { get; set; }
    public int? moodId { get; set; }
    public int? personId { get; set; }
    public int? numberId { get; set; }
    public int? genderId { get; set; }
    public int? patternId { get; set; }
    public int? degreeId { get; set; }
    public int rootId { get; set; }
  }
  public class OutputType
  {
    [SqlOutput("dbo.[Morphology]", connectionStringSetting: "SqlConnectionString")]
    public Morphology Morphology { get; set; }

    public HttpResponseData HttpResponse { get; set; }
  }
  public static class PostMorphology
  {
    [Function("PostMorphology")]
    public static async Task<OutputType> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "morphologies")] HttpRequestData req,
        FunctionContext executionContext)
    {
      var logger = executionContext.GetLogger("PostMorphology");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      Morphology? morphology = JsonSerializer.Deserialize<Morphology>(requestBody);
      
      morphology.morphologyGUID = Guid.NewGuid();

      return new OutputType()
      {
        Morphology = morphology,
        HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
      };
    }
  }
}