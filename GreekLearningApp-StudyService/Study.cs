using System.Text.Json.Serialization;

namespace KoineStudy;

public class QuestionPrompt
{
    [JsonPropertyName("type")]
    public required string Type { get; set; }
    public string? Text { get; set; }
    public string? Source { get; set; }
}
public class TextPrompt : QuestionPrompt
{
    [JsonPropertyName("text")]
    public new required string Text { get; set; }
}
public class ImagePrompt : QuestionPrompt
{
    [JsonPropertyName("source")]
    public new required string Source { get; set; }
}
public class AudioPrompt : QuestionPrompt
{
    [JsonPropertyName("source")]
    public new required string Source { get; set; }
}
public class QuestionChoice
{
    [JsonPropertyName("type")]
    public required string Type { get; set; }
    public string? Text { get; set; }
    public string? Source { get; set; }
}
public class TextChoice : QuestionChoice
{
    [JsonPropertyName("text")]
    public new required string Text { get; set; }
}
public class ImageChoice : QuestionChoice
{
    [JsonPropertyName("source")]
    public new required string Source { get; set; }
}
public class AudioChoice : QuestionChoice
{
    [JsonPropertyName("source")]
    public new required string Source { get; set; }

    public AudioChoice(string source)
    {
        Type = "audio";
        Source = source;
    }
}
public class StudyQuestion
{
    [JsonPropertyName("prompt")]
    public required QuestionPrompt Prompt { get; set; }
    [JsonPropertyName("options")]
    public required IEnumerable<QuestionChoice> Options { get; set; }
    [JsonPropertyName("answer")]
    public int Answer { get; set; }
    [JsonPropertyName("isActive")]
    public bool IsActive { get; set; }
}
public class Study {
    [JsonPropertyName("studyId")]
    public int StudyId { get; set; }
    [JsonPropertyName("isActive")]
    public bool IsActive { get; set; }
    [JsonPropertyName("description")]
    public required IEnumerable<StudyQuestion> Questions { get; set; }
}