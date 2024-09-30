using System.Text.Json.Serialization;

namespace KoineUsers;

public class Lesson {
  [JsonPropertyName("lessonId")]
  public int LessonId { get; set; }
  [JsonPropertyName("isComplete")]
  public bool IsComplete { get; set; }
}
public class Vocab {
  [JsonPropertyName("wordId")]
  public int WordId { get; set; }
  [JsonPropertyName("isComplete")]
  public bool IsComplete { get; set; }
}
public class UserProgress {
  [JsonPropertyName("lessons")]
  public required Lesson[] Lessons { get; set; }
  [JsonPropertyName("vocabulary")]
  public required Vocab[] Vocabulary { get; set; }
}
public class UserSettings {
  [JsonPropertyName("prefersDarkMode")]
  public bool PrefersDarkMode { get; set; }
  [JsonPropertyName("translation")]
  public required string Translation { get; set; }
}
public class User {
  [JsonPropertyName("id")]
  public required string Id { get; set; }
  [JsonPropertyName("name")]
  public required string Name { get; set; }
  [JsonPropertyName("progress")]
  public UserProgress? Progress { get; set; }
  [JsonPropertyName("settings")]
  public UserSettings? Settings { get; set; }
}