### **Task 1: feat(text-service): Implement batch translation endpoint**

This task introduces a new, efficient endpoint in the `TextService` to fetch all translations for a given chapter at once, directly addressing the primary N+1 query bottleneck.

*   **Sub-task 1.1: feat(text-service): Add `GetTranslationsByChapter` function**
    *   Create a new C# file `GetTranslations.cs` in the `GreekLearningApp-TextService` project.
    *   Define a new Azure Function `GetTranslationsByChapter` that responds to the route `GET /chapters/{chapterId}/translations`.
    *   Implement the SQL input binding with the following query to efficiently retrieve all relevant translations:
        ```sql
        SELECT t.* FROM dbo.[Translation] t
        INNER JOIN dbo.[Unit] u ON t.unitId = u.unitId
        INNER JOIN dbo.[Verse] v ON u.verseId = v.verseId
        WHERE v.chapterId = @Id
        ```
    *   Ensure the function returns an `OkObjectResult` containing the `IEnumerable<Translation>`.

### **Task 2: refactor(reader-service): Fetch data concurrently**

This task refactors the `ReaderService` to change its data fetching strategy from a sequential waterfall to a parallel fan-out, significantly reducing the time spent waiting on network I/O.

*   **Sub-task 2.1: refactor(reader-service): Introduce a data resource struct**
    *   In `handler.go`, define a new struct `PageDataResources` to act as a container for all the data fetched concurrently.
    *   This struct will hold fields for `chapter`, `texts`, `roots`, `grammaticalForms`, `unitMorphologies`, and the user, centralizing the data required for the render stage.

*   **Sub-task 2.2: refactor(reader-service): Parallelize fetch operations**
    *   Modify the `handlePageRequest` function in `handler.go`.
    *   Use `sync.WaitGroup` to launch goroutines for each independent fetch operation (`fetchChapter`, `fetchTexts`, `fetchRoots`, `fetchGrammaticalForms`, `fetchUnitMorphologies`, `fetchUser`).
    *   Implement an error channel to safely collect and handle any errors that occur within the concurrent operations. The function should wait for all fetches to complete before proceeding.

### **Task 3: feat(reader-service): Integrate batch translation endpoint**

This task updates the `ReaderService` to consume the new batch translation endpoint created in Task 1, completing the N+1 optimization.

*   **Sub-task 3.1: feat(reader-service): Add `fetchTranslationsForChapter` function**
    *   In `handler.go`, create a new function `fetchTranslationsForChapter` that calls the new `GET /chapters/{chapterId}/translations` endpoint.
    *   Integrate this new function into the parallel fetching mechanism established in Task 2.

*   **Sub-task 3.2: refactor(reader-service): Use translation map for rendering**
    *   Modify the `RenderChapter` function in `handler.go` to accept the full list of translations fetched in the previous step.
    *   Inside the function, transform the slice of translations into a `map[int]string` for efficient, O(1) lookups by `UnitId`.
    *   Update the rendering loop to use this map for retrieving translations, completely removing the old, inefficient per-word `fetchTranslation` call.
    *   Delete the now-obsolete `fetchTranslation` function.
