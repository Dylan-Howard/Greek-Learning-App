using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Koine.GetTranslation
{
  public class Translation
  {
    public Guid translationGUID { get; set; }
    public int translationId { get; set; }
    public required string content { get; set; }
  }
  public class GetTranslation
  {

    [Function("GetTranslation")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "units/{untiId}/translation")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[Translation] where [unitId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={untiId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Translation> translation)
    {
      return new OkObjectResult(translation.FirstOrDefault());
    }
  }

  public class GetTranslations
  {
    [Function("GetTranslations")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "translations")]
      HttpRequest req,
      [SqlInput(commandText: "select [translationId], [content] from dbo.[Translation]",
        commandType: System.Data.CommandType.Text,
        parameters: "",
        connectionStringSetting: "SqlConnectionString")] IEnumerable<Translation> translations,
      FunctionContext executionContext
      )
    {
      var logger = executionContext.GetLogger("GetTranslations");
      logger.LogInformation("C# HTTP trigger function processed a request.");

      return new OkObjectResult(translations);
    }
  }
}

