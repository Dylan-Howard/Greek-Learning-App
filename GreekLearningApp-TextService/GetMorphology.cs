using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetMorphology
{
  public class Morphology
  {
    [JsonPropertyName("morphologyId")]
    public int MorphologyId { get; set; }
    [JsonPropertyName("morphologyGUID")]
    public Guid MorphologyGUID { get; set; }
    [JsonPropertyName("content")]
    public required string Content { get; set; }
    [JsonPropertyName("posId")]
    public int PosId { get; set; }
    [JsonPropertyName("caseId")]
    public int? CaseId { get; set; }
    [JsonPropertyName("tenseId")]
    public int? TenseId { get; set; }
    [JsonPropertyName("voiceId")]
    public int? VoiceId { get; set; }
    [JsonPropertyName("moodId")]
    public int? MoodId { get; set; }
    [JsonPropertyName("personId")]
    public int? PersonId { get; set; }
    [JsonPropertyName("numberId")]
    public int? NumberId { get; set; }
    [JsonPropertyName("genderId")]
    public int? GenderId { get; set; }
    [JsonPropertyName("patternId")]
    public int? PatternId { get; set; }
    [JsonPropertyName("degreeId")]
    public int? DegreeId { get; set; }
    [JsonPropertyName("rootId")]
    public int RootId { get; set; }
  }
  public class MorphologyDetails
  {
    [JsonPropertyName("morphologyId")]
    public int MorphologyId { get; set; }
    [JsonPropertyName("content")]
    public required string Content { get; set; }
    [JsonPropertyName("posName")]
    public required string PosName { get; set; }
    [JsonPropertyName("caseName")]
    public string? CaseName { get; set; }
    [JsonPropertyName("tenseName")]
    public string? TenseName { get; set; }
    [JsonPropertyName("voiceName")]
    public string? VoiceName { get; set; }
    [JsonPropertyName("moodName")]
    public string? MoodName { get; set; }
    [JsonPropertyName("personName")]
    public string? PersonName { get; set; }
    [JsonPropertyName("numberName")]
    public string? NumberName { get; set; }
    [JsonPropertyName("genderName")]
    public string? GenderName { get; set; }
    [JsonPropertyName("patternName")]
    public string? PatternName { get; set; }
    [JsonPropertyName("degreeName")]
    public string? DegreeName { get; set; }
    [JsonPropertyName("rootName")]
    public string RootName { get; set; }
  }
  public class UnitMorphology
  {
    [JsonPropertyName("unitId")]
    public int UnitId { get; set; }
    [JsonPropertyName("verseNumber")]
    public int VerseNumber { get; set; }
    [JsonPropertyName("content")]
    public required string Content { get; set; }
    [JsonPropertyName("morphologyId")]
    public int MorphologyId { get; set; }
    [JsonPropertyName("posId")]
    public int PosId { get; set; }
    [JsonPropertyName("caseId")]
    public int? CaseId { get; set; }
    [JsonPropertyName("tenseId")]
    public int? TenseId { get; set; }
    [JsonPropertyName("voiceId")]
    public int? VoiceId { get; set; }
    [JsonPropertyName("moodId")]
    public int? MoodId { get; set; }
    [JsonPropertyName("personId")]
    public int? PersonId { get; set; }
    [JsonPropertyName("numberId")]
    public int? NumberId { get; set; }
    [JsonPropertyName("genderId")]
    public int? GenderId { get; set; }
    [JsonPropertyName("patternId")]
    public int? PatternId { get; set; }
    [JsonPropertyName("degreeId")]
    public int? DegreeId { get; set; }
    [JsonPropertyName("rootId")]
    public int RootId { get; set; }
  }
  public class GetMorphology
  {

    [Function("GetMorphology")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "morphologies/{morphologyId}")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[Morphology] where [morphologyId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={morphologyId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Morphology> morphology)
    {
      return new OkObjectResult(morphology.FirstOrDefault());
    }
  }
  public class GetMorphologies
  {
    [Function("GetMorphologies")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "morphologies")]
      HttpRequest req,
      [SqlInput(commandText: "select * from dbo.[Morphology]",
        commandType: System.Data.CommandType.Text,
        parameters: "",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Morphology> morphology)
    {
      return new OkObjectResult(morphology);
    }
  }
  public class GetMorphologyByUnit
  {

    [Function("GetMorphologyByUnit")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "units/{unitId}/morphology")]
      HttpRequest req,
      [SqlInput(commandText: "SELECT * FROM dbo.[Morphology] mrp INNER JOIN dbo.[Unit] unt ON mrp.[morphologyId] = unt.[morphologyId] WHERE [unitId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={unitId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Morphology> morphology)
    {
      return new OkObjectResult(morphology.FirstOrDefault());
    }
  }
  public class GetMorphologyDetails
  {

    [Function("GetMorphologyDetails")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "morphologies/{morphologyId}/details")]
      HttpRequest req,
      [SqlInput(commandText: "SELECT mph.morphologyId, mph.[content], pos.[name] AS 'posName', cse.[name] AS 'caseName', tns.[name] AS 'tenseName', voc.[name] AS 'voiceName', moo.[name] AS 'moodName', per.[name] AS 'personName', num.[name] AS 'numberName', pat.[name] AS 'patternName', gen.[name] AS 'genderName', deg.[name] AS 'degreeName', roo.[content] AS 'rootName' FROM [dbo].[Morphology] mph LEFT JOIN [dbo].[GrammaticalForm] pos ON pos.[grammarId] = mph.[posId] LEFT JOIN [dbo].[GrammaticalForm] cse ON cse.[grammarId] = mph.[caseId] LEFT JOIN [dbo].[GrammaticalForm] tns ON tns.[grammarId] = mph.[tenseId] LEFT JOIN [dbo].[GrammaticalForm] voc ON voc.[grammarId] = mph.[voiceId] LEFT JOIN [dbo].[GrammaticalForm] moo ON moo.[grammarId] = mph.[moodId] LEFT JOIN [dbo].[GrammaticalForm] per ON per.[grammarId] = mph.[personId] LEFT JOIN [dbo].[GrammaticalForm] num ON num.[grammarId] = mph.[numberId] LEFT JOIN [dbo].[GrammaticalForm] pat ON pat.[grammarId] = mph.[genderId] LEFT JOIN [dbo].[GrammaticalForm] gen ON gen.[grammarId] = mph.[patternId] LEFT JOIN [dbo].[GrammaticalForm] deg ON deg.[grammarId] = mph.[degreeId] LEFT JOIN [dbo].[Root] roo ON roo.[rootId] = mph.[rootId] WHERE mph.[morphologyId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={morphologyId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<MorphologyDetails> details)
    {
      return new OkObjectResult(details.FirstOrDefault());
    }
  }
  public class GetMorphologyAbbreviation
  {

    [Function("GetMorphologyAbbreviation")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "morphologies/{morphologyId}/abbreviation")]
      HttpRequest req,
      [SqlInput(commandText: "SELECT mph.morphologyId, mph.[content], pos.[abreviation] AS 'posName', cse.[abreviation] AS 'caseName', tns.[abreviation] AS 'tenseName', voc.[abreviation] AS 'voiceName', moo.[abreviation] AS 'moodName', per.[abreviation] AS 'personName', num.[abreviation] AS 'numberName', pat.[abreviation] AS 'patternName', gen.[abreviation] AS 'genderName', deg.[abreviation] AS 'degreeName', roo.[content] AS 'rootName' FROM [dbo].[Morphology] mph LEFT JOIN [dbo].[GrammaticalForm] pos ON pos.[grammarId] = mph.[posId] LEFT JOIN [dbo].[GrammaticalForm] cse ON cse.[grammarId] = mph.[caseId] LEFT JOIN [dbo].[GrammaticalForm] tns ON tns.[grammarId] = mph.[tenseId] LEFT JOIN [dbo].[GrammaticalForm] voc ON voc.[grammarId] = mph.[voiceId] LEFT JOIN [dbo].[GrammaticalForm] moo ON moo.[grammarId] = mph.[moodId] LEFT JOIN [dbo].[GrammaticalForm] per ON per.[grammarId] = mph.[personId] LEFT JOIN [dbo].[GrammaticalForm] num ON num.[grammarId] = mph.[numberId] LEFT JOIN [dbo].[GrammaticalForm] pat ON pat.[grammarId] = mph.[genderId] LEFT JOIN [dbo].[GrammaticalForm] gen ON gen.[grammarId] = mph.[patternId] LEFT JOIN [dbo].[GrammaticalForm] deg ON deg.[grammarId] = mph.[degreeId] LEFT JOIN [dbo].[Root] roo ON roo.[rootId] = mph.[rootId] WHERE mph.[morphologyId] = @Id",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={morphologyId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<MorphologyDetails> details)
    {
      return new OkObjectResult(details.FirstOrDefault());
    }
  }
  public class GetMorphologiesByChapter
  {

    [Function("GetMorphologiesByChapter")]
    public static IActionResult Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "chapters/{chapterId}/morphologies")]
      HttpRequest req,
      [SqlInput(commandText: "SELECT unt.unitId, vrs.verseNumber, unt.content, mrp.morphologyId, mrp.posId, mrp.caseId, mrp.tenseId, mrp.voiceId, mrp.moodId, mrp.personId, mrp.numberId, mrp.genderId, mrp.patternId, mrp.degreeId, mrp.rootId FROM [dbo].[Chapter] chp INNER JOIN [dbo].[Verse] vrs ON vrs.[chapterId] = chp.[chapterId] INNER JOIN [dbo].[Unit] unt ON unt.[verseId] = vrs.[verseId] INNER JOIN [dbo].[Morphology] mrp ON mrp.[morphologyId] = unt.[morphologyId] WHERE chp.chapterId = @Id ORDER BY vrs.verseNumber, unt.unitId",
        commandType: System.Data.CommandType.Text,
        parameters: "@Id={chapterId}",
        connectionStringSetting: "SqlConnectionString")]
    IEnumerable<UnitMorphology> morphology)
    {
      return new OkObjectResult(morphology);
    }
  }
}

