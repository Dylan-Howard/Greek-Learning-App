namespace Koine.KoineUser {
  public class Lesson {
    public int lessonId { get; set; }
    public bool isComplete { get; set; }
  }
  public class Vocab {
    public int wordId { get; set; }
    public bool isComplete { get; set; }
  }
  public class UserProgress {
    public Lesson[] lessons { get; set; }
    public Vocab[] vocabulary { get; set; }
  }
  public class UserSettings {
    public bool prefersDarkMode { get; set; }
    public string translation { get; set; }
  }
  public class User {
    public required string id { get; set; }
    public required string name { get; set; }
    public UserProgress? progress { get; set; }
    public UserSettings? settings { get; set; }
  }
}