package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
)

const API_URL = "https://koine.azure-api.net/api/"

/* Text Service structs */
type Text struct {
	TextId		int			`json:"textId"`
	Title			string	`json:"title"`
}

type Chapter struct {
	ChapterId			int			`json:"chapterId"`
	ChapterNumber	int	`json:"chapterNumber"`
	TextId				int			`json:"textId"`
}

type Unit struct {
	UnitId int	`json:"unitId"`
	Content string	`json:"content"`
	MorphologyId int	`json:"morphologyId"`
}

type Root struct {
	RootId			int			`json:"rootId"`
  Content			string	`json:"content"`
  Occurances	int			`json:"occurances"`
}

type GrammaticalForm struct {
	GrammarId			int			`json:"grammarId"`
	Name					string	`json:"name"`
	Abbreviation	string	`json:"abbreviation"`
	LessonId			int			`json:"lessonId"`
}

type Grammar struct {
	GrammaticalForms []GrammaticalForm
}

func (g Grammar) GetAbbreviation(grammarId int) string {
	for i := 0; i < len(g.GrammaticalForms); i++ {
		if g.GrammaticalForms[i].GrammarId == grammarId {
			return g.GrammaticalForms[i].Abbreviation
		}
	}

	return ""
}

type UnitMorphology struct {
	UnitId				int			`json:"unitId"`
	VerseNumber		int			`json:"verseNumber"`
	MorphologyId	int			`json:"morphologyId"`
	Content				string	`json:"content"`
	PosId					int			`json:"posId"`
	CaseId				int			`json:"caseId"`
	TenseId				int			`json:"tenseId"`
	VoiceId				int			`json:"voiceId"`
	MoodId				int			`json:"moodId"`
	PersonId			int			`json:"personId"`
	NumberId			int			`json:"numberId"`
	GenderId			int			`json:"genderId"`
	PatternId			int			`json:"patternId"`
	DegreeId			int			`json:"degreeId"`
	RootId				int			`json:"rootId"`
}

func (m UnitMorphology) GetAbbreviation(g Grammar) string {
	pos := g.GetAbbreviation(m.PosId)
	abbreviation := pos + "-"

	/* Verbal Forms */
	if pos == "V" || pos == "Art" || pos == "P" {
		if m.TenseId != 0 {
			abbreviation += g.GetAbbreviation(m.TenseId)
		}
		if m.VoiceId != 0 {
			abbreviation += g.GetAbbreviation(m.VoiceId)
		}
		if m.MoodId != 0 {
			abbreviation += g.GetAbbreviation(m.MoodId)
		}

		if pos != "Inf" {
			if m.PersonId != 0 {
				abbreviation += "-" + g.GetAbbreviation(m.PersonId)
			}
			if m.NumberId != 0 {
				abbreviation += g.GetAbbreviation(m.NumberId)
			}
		}
	}

	/* Nounal Forms */
	if pos == "N" {
		if m.CaseId != 0 {
			abbreviation += g.GetAbbreviation(m.CaseId)
		}
		if m.GenderId != 0 {
			abbreviation += g.GetAbbreviation(m.GenderId)
		}
		if m.NumberId != 0 {
			abbreviation += g.GetAbbreviation(m.NumberId)
		}
		
		if m.PatternId != 0 {
			abbreviation += "-" + g.GetAbbreviation(m.PatternId)
		}
		if m.DegreeId != 0 {
			abbreviation += g.GetAbbreviation(m.DegreeId)
		}
	}

	return abbreviation
}

func (m UnitMorphology) GetTranslation(tranlationId string) string {
	return m.Content + "(To be translated)"
}

type UnitLessons struct {
	PosLesssonId			int
	CaseLesssonId			int
	TenseLesssonId		int
	VoiceLesssonId		int
	MoodLesssonId			int
	PersonLesssonId		int
	NumberLesssonId		int
	GenderLesssonId		int
	PatternLesssonId	int
	DegreeLesssonId		int
	RootId						int
}

/* User Service structs */
type UserLesson struct {
	LessonId		int		`json:"lessonId"`
	IsComplete	bool	`json:"isComplete"`
}

type UserVocab struct {
	WordId			int		`json:"wordId"`
	IsComplete	bool	`json:"isComplete"`
}

type UserProgress struct {
	UserLessons			[]UserLesson	`json:"lessons"`
	UserVocabulary	[]UserVocab		`json:"vocabulary"`
}

type User struct {
	Id				string				`json:"id"`
	Name 			string				`json:"name"`
	Progress	UserProgress	`json:"progress"`
}

func (u User) hasCompletedLesson(lessonId int) bool {
	for i := 0; i < len(u.Progress.UserLessons); i++ {
		if u.Progress.UserLessons[i].LessonId == lessonId {
			return u.Progress.UserLessons[i].IsComplete
		}
	}
	return false
}

func (u User) hasCompletedVocab(wordId int) bool {
	for i := 0; i < len(u.Progress.UserVocabulary); i++ {
		if u.Progress.UserVocabulary[i].WordId == wordId {
			return u.Progress.UserVocabulary[i].IsComplete
		}
	}
	return false
}

func (u User) DoesRecognize(l UnitLessons) string {
	if l.RootId != 0 {
		isComplete := u.hasCompletedVocab(l.RootId)
		if !isComplete {
			return "unrecognized"
		}
	}
	if l.PosLesssonId != 0 {
		isComplete := u.hasCompletedLesson(l.PosLesssonId)
		if !isComplete {
			return "needs help"
		}
	}
	if l.CaseLesssonId != 0 {
		isComplete := u.hasCompletedLesson(l.CaseLesssonId)
		if !isComplete {
			return "needs help"
		}
	}
	if l.TenseLesssonId != 0 {
		isComplete := u.hasCompletedLesson(l.TenseLesssonId)
		if !isComplete {
			return "needs help"
		}
	}
	if l.VoiceLesssonId != 0 {
		isComplete := u.hasCompletedLesson(l.VoiceLesssonId)
		if !isComplete {
			return "needs help"
		}
	}
	if l.MoodLesssonId != 0 {
		isComplete := u.hasCompletedLesson(l.MoodLesssonId)
		if !isComplete {
			return "needs help"
		}
	}
	if l.PersonLesssonId != 0 {
		isComplete := u.hasCompletedLesson(l.PersonLesssonId)
		if !isComplete {
			return "needs help"
		}
	}
	if l.NumberLesssonId != 0 {
		isComplete := u.hasCompletedLesson(l.NumberLesssonId)
		if !isComplete {
			return "needs help"
		}
	}
	if l.GenderLesssonId != 0 {
		isComplete := u.hasCompletedLesson(l.GenderLesssonId)
		if !isComplete {
			return "needs help"
		}
	}
	if l.PatternLesssonId != 0 {
		isComplete := u.hasCompletedLesson(l.PatternLesssonId)
		if !isComplete {
			return "needs help"
		}
	}
	if l.DegreeLesssonId != 0 {
		isComplete := u.hasCompletedLesson(l.DegreeLesssonId)
		if !isComplete {
			return "needs help"
		}
	}

	return "recognized"
}

/* Language Rendering structs */
type Tutor struct {
	Texts			[]Text
	Chapters	[]Chapter
	Grammar		Grammar
	Roots			[]Root
}

func (t Tutor) GetUnitLessonId(grammarId int) int {
	for i := 0; i < len(t.Grammar.GrammaticalForms); i++ {
		if t.Grammar.GrammaticalForms[i].GrammarId == grammarId {
			return t.Grammar.GrammaticalForms[i].LessonId
		}
	}

	return 0
}

func (t Tutor) GetUnitLessonIds(m UnitMorphology) UnitLessons {
	lessonIds := UnitLessons{
		RootId: m.RootId,
	}
	lessonIds.PosLesssonId = t.GetUnitLessonId(m.PosId)
	if m.CaseId != 0 {
		lessonIds.PosLesssonId = t.GetUnitLessonId(m.PosId)
	}
	if m.TenseId != 0 {
		lessonIds.TenseLesssonId = t.GetUnitLessonId(m.TenseId)
	}
	if m.VoiceId != 0 {
		lessonIds.VoiceLesssonId = t.GetUnitLessonId(m.VoiceId)
	}
	if m.MoodId != 0 {
		lessonIds.MoodLesssonId = t.GetUnitLessonId(m.MoodId)
	}
	if m.PersonId != 0 {
		lessonIds.PersonLesssonId = t.GetUnitLessonId(m.PersonId)
	}
	if m.NumberId != 0 {
		lessonIds.NumberLesssonId = t.GetUnitLessonId(m.NumberId)
	}
	if m.GenderId != 0 {
		lessonIds.GenderLesssonId = t.GetUnitLessonId(m.GenderId)
	}
	if m.PatternId != 0 {
		lessonIds.PatternLesssonId = t.GetUnitLessonId(m.PatternId)
	}
	if m.DegreeId != 0 {
		lessonIds.DegreeLesssonId = t.GetUnitLessonId(m.DegreeId)
	}

	return lessonIds
}

/* Page structs */
type SelectionOptions struct {
	Texts			[]Text		`json:"texts"`
	Chapters	[]Chapter	`json:"chapters"`
}

type TextUnit struct {
	UnitId				int			`json:"unitId"`
	Content 			string	`json:"content"`
	HelpText 			string	`json:"helpText"`
	MorphologyId	int			`json:"morphologyId"`
	VerseNumber		int			`json:"verseNumber"`
}

type Page struct {
	Selection	SelectionOptions	`json:"selection"`
	Title			string						`json:"title"`
	Text			[]TextUnit				`json:"text"`
}

type PageRequest struct {
	ChapterId	int			`json:"chapterId"`
	UserId		string	`json:"userId"`
}

func fetch(baseUrl string, resource string) http.Response {
	resp, err := http.Get(baseUrl + resource)
	if err != nil {
		log.Fatalln(err)
	}

	if resp.StatusCode != http.StatusOK {
		defer resp.Body.Close()
		log.Printf("Status returned %d\n", resp.StatusCode)
	}

	return *resp
}

func fetchChapter(chapterId int) (Chapter, error) {

	resp := fetch(API_URL, "chapters/" + strconv.Itoa(chapterId))
	defer resp.Body.Close()

	/* Decode the request body into the user struct */
	var chapter Chapter
	decoder := json.NewDecoder(resp.Body)
	err := decoder.Decode(&chapter)
	if err != nil {
		log.Println(err)
		log.Println("Failed to decode")
		return Chapter{}, err
	}

	return chapter, nil;
}

func fetchTexts() ([]Text, error) {

	resp := fetch(API_URL, "texts")
	defer resp.Body.Close()

	/* Decode the request body into the user struct */
	var texts []Text
	decoder := json.NewDecoder(resp.Body)
	err := decoder.Decode(&texts)
	if err != nil {
		log.Println(err)
		log.Println("Failed to decode")
		return nil, err
	}

	return texts, nil;
}

func fetchChapters(textId int) ([]Chapter, error) {

	resp := fetch(API_URL, "texts/" + strconv.Itoa(textId) + "/chapters")
	defer resp.Body.Close()

	/* Decode the request body into the user struct */
	var chapters []Chapter
	decoder := json.NewDecoder(resp.Body)
	err := decoder.Decode(&chapters)
	if err != nil {
		log.Println(err)
		log.Println("Failed to decode")
		return nil, err
	}

	return chapters, nil;
}

func fetchUnits(chapterId int) ([]Unit, error) {
	resp := fetch(API_URL, "chapters/" + strconv.Itoa(chapterId) + "/units")
	defer resp.Body.Close()

	/* Decode the request body into the user struct */
	var units []Unit
	decoder := json.NewDecoder(resp.Body)
	err := decoder.Decode(&units)
	if err != nil {
		log.Println(err)
		log.Println("Failed to decode")
		return nil, err
	}

	return units, nil;
}

func fetchUnitMorphologies(chapterId int) ([]UnitMorphology, error) {
	resp := fetch(API_URL, "chapters/" + strconv.Itoa(chapterId) + "/morphologies")
	defer resp.Body.Close()

	/* Decode the request body into the user struct */
	var morphologies []UnitMorphology
	decoder := json.NewDecoder(resp.Body)
	err := decoder.Decode(&morphologies)
	if err != nil {
		log.Println(err)
		log.Println("Failed to decode")
		return nil, err
	}

	return morphologies, nil;
}

func fetchGrammaticalForms() ([]GrammaticalForm, error) {
	resp := fetch(API_URL, "grammaticalForms")
	defer resp.Body.Close()

	/* Decode the request body into the user struct */
	var grammaticalForms []GrammaticalForm
	decoder := json.NewDecoder(resp.Body)
	err := decoder.Decode(&grammaticalForms)
	if err != nil {
		log.Println(err)
		log.Println("Failed to decode")
		return nil, err
	}

	return grammaticalForms, nil;
}

func fetchRoots(chapterId int)  ([]Root, error) {
	resp := fetch(API_URL, "chapters/" + strconv.Itoa(chapterId) + "/words")
	defer resp.Body.Close()

	/* Decode the request body into the user struct */
	var roots []Root
	decoder := json.NewDecoder(resp.Body)
	err := decoder.Decode(&roots)
	if err != nil {
		log.Println(err)
		log.Println("Failed to decode")
		return nil, err
	}

	return roots, nil;
}

func fetchUser(userId string) (User, error) {
	resp := fetch(API_URL, "users/" + userId)
	defer resp.Body.Close()

	/* Decode the request body into the user struct */
	var user User
	decoder := json.NewDecoder(resp.Body)
	err := decoder.Decode(&user)
	if err != nil {
		log.Println(err)
		log.Println("Failed to decode")
		return User{}, err
	}

	return user, nil;
}

func (t Tutor) GetRoot(rootId int) string {
	for i := 0; i < len(t.Roots); i++ {
		if t.Roots[i].RootId == rootId {
			return t.Roots[i].Content
		}
	}

	return "unknown"
}

func (t Tutor) RenderTitle(c Chapter) string {

	for i := 0; i < len(t.Texts); i++ {
		if t.Texts[i].TextId == c.TextId {
			return t.Texts[i].Title + " " + strconv.Itoa(c.ChapterNumber)
		}
	}

	return "Untitled"
}

func (t Tutor) RenderChapter(chapterId int, user User) ([]TextUnit, error) {
	unitMorphologies, err := fetchUnitMorphologies(chapterId)
	if err != nil {
		return nil, err
	}

	textUnits := []TextUnit{}

	for i := 0; i < len(unitMorphologies); i++ {
		textUnit := TextUnit{
			UnitId: unitMorphologies[i].UnitId,
			MorphologyId: unitMorphologies[i].MorphologyId,
			VerseNumber: unitMorphologies[i].VerseNumber,
		}

		/* Determines user recognition */
		var recognition string
		if user.Id != "guest" {
			lessonId := t.GetUnitLessonIds(unitMorphologies[i])
			recognition = user.DoesRecognize(lessonId)
		} else {
			recognition = "recognized"
		}

		/* Builds TextUnit Content according to user recognition */
		if recognition == "recognized" {
			textUnit.Content = unitMorphologies[i].Content
		}
		if recognition == "needs help" {
			textUnit.Content = unitMorphologies[i].Content
			textUnit.HelpText = "[" + unitMorphologies[i].GetAbbreviation(t.Grammar) + "; " + t.GetRoot(unitMorphologies[i].RootId) + "]"
		}
		if recognition == "unrecognized" {
			textUnit.Content = unitMorphologies[i].GetTranslation("esv")
		}

		textUnits = append(textUnits, textUnit)
	}

	return textUnits, nil
}

func handlePageRequest(rw http.ResponseWriter, req *http.Request) {
	header := rw.Header()
	header.Add("Content-Type", "application/json")
	header.Add("Access-Control-Allow-Methods", "POST, OPTIONS")
	header.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

	if req.Method == http.MethodOptions {
		rw.WriteHeader(http.StatusOK)
		return
	}

	if req.Method != http.MethodPost {
		rw.WriteHeader(http.StatusNotAcceptable)
    return
  }

	prq := &PageRequest{}

	decoder := json.NewDecoder(req.Body)
  err := decoder.Decode(prq)
  if err != nil {
		rw.WriteHeader(http.StatusBadRequest)
    return
  }

	/* Fetch Resources */
	chapter, err := fetchChapter(prq.ChapterId)
	if err != nil {
		rw.WriteHeader(http.StatusFailedDependency)
		return
	}
	texts, err := fetchTexts()
	if err != nil {
		rw.WriteHeader(http.StatusFailedDependency)
		return
	}
	chapters, err := fetchChapters(chapter.TextId)
	if err != nil {
		rw.WriteHeader(http.StatusFailedDependency)
		return
	}
	roots, err := fetchRoots(prq.ChapterId)
	if err != nil {
		rw.WriteHeader(http.StatusFailedDependency)
		return
	}
	grammaticalForms, err := fetchGrammaticalForms()
	if err != nil {
		rw.WriteHeader(http.StatusFailedDependency)
		return
	}

	/* Fetch user if UserId is present */
	var user User
	if prq.UserId != "guest" {
		user, err = fetchUser(prq.UserId)
		if err != nil {
			rw.WriteHeader(http.StatusFailedDependency)
			return
		}
	} else {
		user = User{
			Id: "guest",
		}
	}

	/* Render Page Content */
	tutor := Tutor{
		Texts: texts,
		Chapters: chapters,
		Grammar: Grammar{GrammaticalForms: grammaticalForms},
		Roots: roots,
	}

	textUnits, err := tutor.RenderChapter(prq.ChapterId, user)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	/* Initialize Page */
	selection := SelectionOptions{
		Texts: texts,
		Chapters: chapters,
	}
	
	page := Page{
		Selection: selection,
		Title: tutor.RenderTitle(chapter),
		Text: textUnits,
	}
	
	/* Return HTTP Response */
	jsonData, err := json.Marshal(page)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	rw.Write(jsonData);
}

func handleOther(rw http.ResponseWriter, req *http.Request) {
	header := rw.Header()
	header.Add("Content-Type", "application/json")
	header.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	header.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

	response := req.URL

	/* Return HTTP Response */
	jsonData, err := json.Marshal(response)
	if err != nil {
		rw.WriteHeader(http.StatusFound)
		return
	}

	rw.Write(jsonData)
}

func main() {
  listenAddr := ":8080"
  if val, ok := os.LookupEnv("FUNCTIONS_CUSTOMHANDLER_PORT"); ok {
    listenAddr = ":" + val
  }
	http.HandleFunc("/api/reader", handlePageRequest)
	http.HandleFunc("/", handleOther)
  log.Printf("About to listen on %s. Go to https://127.0.0.1%s/", listenAddr, listenAddr)
  log.Fatal(http.ListenAndServe(listenAddr, nil))
}
