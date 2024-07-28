using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace Koine.GetMorphology
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
  public class MorphologyDetails
  {
    public int morphologyId { get; set; }
    public string content { get; set; }
    public string posName { get; set; }
    public string? caseName { get; set; }
    public string? tenseName { get; set; }
    public string? voiceName { get; set; }
    public string? moodName { get; set; }
    public string? personName { get; set; }
    public string? numberName { get; set; }
    public string? genderName { get; set; }
    public string? patternName { get; set; }
    public string? degreeName { get; set; }
    public string rootName { get; set; }
  }
  public class UnitMorphology
  {
    public int unitId { get; set; }
    public int verseNumber { get; set; }
    public string content { get; set; }
    public int morphologyId { get; set; }
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

