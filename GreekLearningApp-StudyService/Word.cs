using System.Text.Json.Serialization;

namespace KoineStudy;

public class Word
{
    [JsonPropertyName("rootId")]
    public int RootId { get; set; }
    [JsonPropertyName("content")]
    public string? Content { get; set; }
    [JsonPropertyName("gloss")]
    public string? Gloss { get; set; }
}

public class UserWord : Word
{
    [JsonPropertyName("step")]
    public int Step { get; set; }
    [JsonPropertyName("nextReview")]
    public DateTime NextReview { get; set; }
    [JsonPropertyName("isComplete")]
    public bool IsComplete { get; set; }
}

public class UserWordProgress {
    [JsonPropertyName("wordId")]
    public int WordId { get; set; }
    [JsonPropertyName("step")]
    public int Step { get; set; }
    [JsonPropertyName("nextReview")]
    public DateTime NextReview { get; set; }
    [JsonPropertyName("isComplete")]
    public bool IsComplete { get; set; }
}