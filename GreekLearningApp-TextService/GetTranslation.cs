using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;

namespace KoineTexts;
public class Translation
{
    [JsonPropertyName("translationGuid")]
    public Guid TranslationGuid { get; set; }
    [JsonPropertyName("translationId")]
    public int TranslationId { get; set; }
    [JsonPropertyName("unitId")]
    public int UnitId { get; set; }
    [JsonPropertyName("content")]
    public required string Content { get; set; }
}
public class GetTranslation
{
    [Function("GetTranslation")]
    public static IActionResult Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "units/{unitId}/translation")]
        HttpRequest req,
        [SqlInput(commandText: "select * from dbo.[Translation] where [unitId] = @Id",
            commandType: System.Data.CommandType.Text,
            parameters: "@Id={unitId}",
            connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Translation> translations)
    {
        return new OkObjectResult(translations.FirstOrDefault());
    }
}


