using System.Text.Json.Serialization;

namespace KoineUsers;

public class Lesson {
  [JsonPropertyName("lessonId")]
  public int LessonId { get; set; }
  [JsonPropertyName("isComplete")]
  public bool IsComplete { get; set; }

  public static implicit operator string?(Lesson? l)
  {
    if (l == null) {
      return null;
    }

    string objString = $"{{ \tLessonId: {l.LessonId},\tIsComplete: {l.IsComplete} }}";

    return objString;
  }
}
public class Vocab {
  [JsonPropertyName("wordId")]
  public int WordId { get; set; }
  [JsonPropertyName("isComplete")]
  public bool IsComplete { get; set; }

  public static implicit operator string?(Vocab? v)
  {
    if (v == null) {
      return null;
    }

    string objString = $"{{ \tWordId: {v.WordId},\tIsComplete: {v.IsComplete} }}";

    return objString;
  }
}
public class UserProgress {
  [JsonPropertyName("lessons")]
  public required Lesson[] Lessons { get; set; }
  [JsonPropertyName("vocabulary")]
  public required Vocab[] Vocabulary { get; set; }

  public static implicit operator string?(UserProgress? u)
  {
    if (u == null) {
      return null;
    }

    string objString = $"{{\n" +
      $"\tLessons: {u.Lessons},\n" +
      $"\tVocabulary: {u.Vocabulary},\n" +
    "}}";

    return objString;
  }
}
public class UserSettings {
  [JsonPropertyName("prefersDarkMode")]
  public bool PrefersDarkMode { get; set; }
  [JsonPropertyName("translation")]
  public required string Translation { get; set; }

  public static implicit operator string?(UserSettings? u)
  {
    if (u == null) {
      return null;
    }

    string objString = $"{{\n" +
      $"\tPrefersDarkMode: {u.PrefersDarkMode},\n" +
      $"\tTranslation: {u.Translation},\n" +
    "}}";

    return objString;
  }
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

  public static implicit operator ResponseUser?(User u)
  {
    return new ResponseUser { Id = u.Id };
  }

  public static implicit operator string?(User u)
  {
    string objString = $"{{\n" +
      $"\tId: {u.Id},\n" +
      $"\tName: {u.Name},\n" +
      $"\tSettings: {u.Settings},\n" +
      $"\tProgress: {u.Progress?.Lessons.Length} lesson(s) and {u.Progress?.Vocabulary.Length} vocabulary word(s),\n" +
    "}}";

    return objString;
  }
}

public class ResponseUser {
  [JsonPropertyName("id")]
  public required string Id { get; set; }
}
