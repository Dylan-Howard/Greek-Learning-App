namespace Koine.Texts
{
  public class Chapter
  {
    public Guid chapterGUID { get; set; }
    public int chapterId { get; set; }
    public string? title { get; set; }
    public int chapterNumber { get; set; }
    public Guid textId { get; set; }
  }
}