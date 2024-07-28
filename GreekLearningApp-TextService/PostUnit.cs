using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Koine.PostUnit
{
  public class Unit
  {
    public Guid unitGUID { get; set; }
    public int unitPlacement { get; set; }
    public string content { get; set; }
    public int morphologyId { get; set; }
    public int verseId { get; set; }
  }
  public class OutputType
  {
    [SqlOutput("dbo.[Unit]", connectionStringSetting: "SqlConnectionString")]
    public Unit Unit { get; set; }

    public HttpResponseData HttpResponse { get; set; }
  }
  public static class PostUnit
  {
    [Function("PostUnit")]
    public static async Task<OutputType> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "units")] HttpRequestData req,
        FunctionContext executionContext)
    {
      var logger = executionContext.GetLogger("PostUnit");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      Unit? unit = JsonSerializer.Deserialize<Unit>(requestBody);
      
      unit.unitGUID = Guid.NewGuid();

      return new OutputType()
      {
        Unit = unit,
        HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
      };
    }
  }
}