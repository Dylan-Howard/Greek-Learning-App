using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Koine.PostTranslation
{
  public class Translation
  {
      [Column("translationGUID")]
      [JsonPropertyName("translationGUID")]
      public Guid TranslationGUID { get; set; }
      [Column("unitId")]
      [JsonPropertyName("unitId")]
      public int UnitId { get; set; }
      [Column("content")]
      [JsonPropertyName("content")]
      public required string Content { get; set; }
  }
  public class OutputType
  {
    [SqlOutput("dbo.[Translation]", connectionStringSetting: "SqlConnectionString")]
    public Translation? Translation { get; set; }

    public required HttpResponseData HttpResponse { get; set; }
  }
  public static class PostTranslation
  {
    // create a new Translation from body object
    // uses output binding to insert new item into ToDo table
    [Function("PostTranslation")]
    public static async Task<OutputType> Run(
    // public static async Task<IActionResult> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "translations")] HttpRequestData req,
        FunctionContext executionContext)
    {
      var logger = executionContext.GetLogger("PostTranslation");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      Translation? translationItem = JsonSerializer.Deserialize<Translation>(requestBody);

      if (translationItem == null) {
          return new OutputType {
              Translation = null,
              HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError)
          };
      }

      translationItem.TranslationGUID = Guid.NewGuid();

      // Proceed with processing if necessary values are present
      return new OutputType()
      {
          Translation = translationItem,
          HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
      };
    }
  }
}