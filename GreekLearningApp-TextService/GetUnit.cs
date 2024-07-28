using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetUnit
{
  public class Unit
  {
    public Guid unitGUID { get; set; }
    public int unitId { get; set; }
    public int unitPlacement { get; set; }
    public string content { get; set; }
    public int morphologyId { get; set; }
    public int verseId { get; set; }
  }
  public class GetUnit
  {

    [Function("GetUnit")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "units/{unitId}")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[Unit] where [unitId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={unitId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Unit> unit)
    {
      return new OkObjectResult(unit.FirstOrDefault());
    }
  }

  public class GetUnits
  {
    [Function("GetUnits")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "units")]
      HttpRequest req,
      [SqlInput(commandText: "SELECT TOP(1000) * from dbo.[Unit]",
        commandType: System.Data.CommandType.Text,
        parameters: "",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Unit> unit)
    {
      return new OkObjectResult(unit);
    }
  }
  public class GetUnitsByChapter
  {
    [Function("GetUnitsByChapter")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "chapters/{chapterId}/units")]
      HttpRequest req,
      [SqlInput(commandText: "SELECT * from dbo.[Verse] vrs INNER JOIN dbo.[Unit] unt ON vrs.[verseId] = unt.[verseId] WHERE vrs.[chapterId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={chapterId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Unit> unit)
    {
      return new OkObjectResult(unit);
    }
  }
}

