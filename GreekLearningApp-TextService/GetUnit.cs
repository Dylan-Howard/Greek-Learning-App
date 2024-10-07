using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetUnit
{
  public class Unit
  {
    [JsonPropertyName("unitGUID")]
    public Guid UnitGUID { get; set; }
    [JsonPropertyName("unitId")]
    public int UnitId { get; set; }
    [JsonPropertyName("unitPlacement")]
    public int UnitPlacement { get; set; }
    [JsonPropertyName("content")]
    public required string Content { get; set; }
    [JsonPropertyName("morphologyId")]
    public int MorphologyId { get; set; }
    [JsonPropertyName("verseId")]
    public int VerseId { get; set; }
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

