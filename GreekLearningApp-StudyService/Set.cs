using System.Text.Json.Serialization;

namespace KoineStudy;

public class SetListItem
{
    [JsonPropertyName("setId")]
    public int SetId { get; set; }
    [JsonPropertyName("title")]
    public required string Title { get; set; }
    [JsonPropertyName("description")]
    public required string Description { get; set; }
}
public class Set : SetListItem
{
    [JsonPropertyName("words")]
    public required List<UserWord> Words { get; set; }
}
public class UserSet
{
    [JsonPropertyName("setId")]
    public int SetId { get; set; }
    [JsonPropertyName("title")]
    public required string Title { get; set; }
    [JsonPropertyName("description")]
    public required string Description { get; set; }
    [JsonPropertyName("words")]
    public required List<UserWord> Words { get; set; }
    [JsonPropertyName("progress")]
    public required float Progress { get; set; }
}