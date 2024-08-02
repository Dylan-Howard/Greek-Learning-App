DROP TABLE IF EXISTS
	[dbo].[Unit],
	[dbo].[Morphology],
	[dbo].[Root],
	[dbo].[GrammaticalForm],
	[dbo].[Verse],
	[dbo].[Chapter],
	[dbo].[Text];

CREATE TABLE [Text] (
  textId INT IDENTITY(1, 1) PRIMARY KEY,
  textGUID UNIQUEIDENTIFIER,
  title NVARCHAR(64) NOT NULL,
);

CREATE TABLE [Chapter] (
	chapterId INT IDENTITY(1, 1) PRIMARY KEY,
  chapterGUID UNIQUEIDENTIFIER NOT NULL,
  chapterNumber INT NOT NULL,
	textId INT FOREIGN KEY REFERENCES Text(textId) NOT NULL,
);

CREATE TABLE [Verse] (
	verseId INT IDENTITY(1, 1) PRIMARY KEY,
  verseGUID UNIQUEIDENTIFIER NOT NULL,
  verseNumber INT NOT NULL,
	chapterId INT FOREIGN KEY REFERENCES Chapter(chapterId) NOT NULL,
);

CREATE TABLE [Lesson] (
  lessonId INT IDENTITY(1, 1) PRIMARY KEY,
  lessonGUID UNIQUEIDENTIFIER NOT NULL,
  title NVARCHAR(64) NOT NULL,
)

CREATE TABLE [GrammaticalForm] (
  grammarId INT IDENTITY(1, 1) PRIMARY KEY,
  grammarGUID UNIQUEIDENTIFIER NOT NULL,
  [name] NVARCHAR(24) NOT NULL,
  abbreviation NVARCHAR(3) NOT NULL,
  lessonId INT FOREIGN KEY REFERENCES Lesson(lessonId) NOT NULL,
)

CREATE TABLE [Root] (
  rootId INT IDENTITY(1, 1) PRIMARY KEY,
  rootGUID UNIQUEIDENTIFIER NOT NULL,
  [content] NVARCHAR(24) NOT NULL,
  occurances INT NULL,
)

CREATE TABLE [Morphology] (
  morphologyId INT IDENTITY(1, 1) PRIMARY KEY,
  morphologyGUID UNIQUEIDENTIFIER NOT NULL,
  [content] NVARCHAR(24) NOT NULL,
  posId INT FOREIGN KEY REFERENCES [GrammaticalForm](grammarId) NOT NULL,
  caseId INT FOREIGN KEY REFERENCES [GrammaticalForm](grammarId) NULL,
  tenseId INT FOREIGN KEY REFERENCES [GrammaticalForm](grammarId) NULL,
  voiceId INT FOREIGN KEY REFERENCES [GrammaticalForm](grammarId) NULL,
  moodId INT FOREIGN KEY REFERENCES [GrammaticalForm](grammarId) NULL,
  personId INT FOREIGN KEY REFERENCES [GrammaticalForm](grammarId) NULL,
  numberId INT FOREIGN KEY REFERENCES [GrammaticalForm](grammarId) NULL,
  genderId INT FOREIGN KEY REFERENCES [GrammaticalForm](grammarId) NULL,
  patternId INT FOREIGN KEY REFERENCES [GrammaticalForm](grammarId) NULL,
  degreeId INT FOREIGN KEY REFERENCES [GrammaticalForm](grammarId) NULL,
  rootId INT FOREIGN KEY REFERENCES [Root](rootId),
)

CREATE TABLE [Unit] (
	unitId INT IDENTITY(1, 1) PRIMARY KEY,
  unitGUID UNIQUEIDENTIFIER NOT NULL,
  unitPlacement INT NOT NULL,
  content NVARCHAR(48) NOT NULL,
  morphologyId INT FOREIGN KEY REFERENCES [Morphology](morphologyId) NOT NULL,
	verseId INT FOREIGN KEY REFERENCES Verse(verseId) NOT NULL,
);

CREATE TABLE [Translation] (
	translationId INT IDENTITY PRIMARY KEY,
	translationGUID UNIQUEIDENTIFIER NOT NULL,
	unitID INT NOT NULL FOREIGN KEY REFERENCES Unit(unitId),
	[content] NVARCHAR(64) NOT NULL
)