# Requirements Document

## Introduction
The **Azure-to-Supabase Migration** project aims to consolidate the backend infrastructure of the Greek Learning App from a distributed Azure microservices architecture (Azure Functions, Azure SQL, CosmosDB) to a unified, open-source backend-as-a-service platform using Supabase.

This migration is driven by the need to simplify the technology stack, reduce operational overhead, and optimize costs by leveraging the Supabase free tier. As there are currently no active users, this will be treated as a fresh deployment of the infrastructure rather than a live data migration, allowing for architectural improvements without legacy constraints.

## Requirements

### Requirement 1: Database Architecture & Schema
**Objective:** As a developer, I want a unified relational database schema in Supabase (PostgreSQL), so that I can manage both structured text data and flexible user data in a single, queryable system.

#### Acceptance Criteria
1. WHEN the Supabase project is initialized THEN the system SHALL contain relational tables for `Roots`, `Morphologies`, `Units`, `Verses`, `Chapters`, and `Books` mirroring the existing `TextService` schema.
2. WHEN the Supabase project is initialized THEN the system SHALL contain tables for `Users`, `UserSettings`, `UserProgress`, and `Sets` to replace the previous CosmosDB/UserService structures.
3. WHERE data requires flexible schemas (e.g., `UserSettings`), THE system SHALL utilize PostgreSQL `JSONB` columns.
4. WHILE accessing database tables THE system SHALL enforce Row Level Security (RLS) policies to ensure users can only access their own data or public read-only text data.

### Requirement 2: Authentication System
**Objective:** As a user, I want to sign up and log in using Supabase Auth, so that my identity is securely managed within the same ecosystem as my data.

#### Acceptance Criteria
1. WHEN a user signs up THEN the system SHALL create a new identity in Supabase Auth.
2. WHEN a new user is created in Supabase Auth THEN the system SHALL automatically trigger a database entry in the `public.users` table to store application-specific profile data.
3. IF the application is running in development or production THEN the system SHALL use the Supabase Auth SDK for session management, replacing the existing Clerk integration.
4. WHERE a user is unauthenticated THE system SHALL deny access to protected routes and private data resources.

### Requirement 3: Backend Logic & Edge Functions
**Objective:** As a developer, I want to replace Azure Functions with Supabase Edge Functions or direct database queries, so that I can reduce latency and maintenance overhead.

#### Acceptance Criteria
1. WHEN the frontend requests text data (e.g., "GetWordsByChapter") THEN the system SHALL execute a Supabase RPC (Remote Procedure Call) or an optimized database query to return the complex joined data.
2. IF a business logic operation requires server-side processing (e.g., complex study algorithm) THEN the system SHALL execute a Supabase Edge Function written in TypeScript/Deno.
3. WHERE the logic was previously contained in `GreekLearningApp-TextService` (C#), THE system SHALL provide equivalent functionality via PostgreSQL Views or Functions.
4. WHERE the logic was previously contained in `GreekLearningApp-UserService` and `StudyService` (C#), THE system SHALL provide equivalent functionality via direct Supabase Client CRUD operations protected by RLS.
5. WHEN implementing the "Reader" feature, THE system SHALL preserve the "Adaptive Interlinear Text" logic (currently in `GreekLearningApp-ReaderService/handler.go`) to correctly determine recognized vs. unrecognized words based on user progress.

### Requirement 4: Frontend Integration
**Objective:** As a user, I want the frontend application to interact seamlessly with the new backend, so that I can continue to use the app without interruption.

#### Acceptance Criteria
1. WHEN the application initializes THEN it SHALL configure the global Supabase client using environment variables.
2. WHILE the user navigates the application THE frontend SHALL replace all legacy HTTP calls to Azure Function endpoints with `supabase-js` client methods.
3. IF the user attempts to access the application THEN the frontend SHALL no longer request resources from Clerk or Azure endpoints.
4. WHERE data is fetched for the "Reader" or "Vocab" features THE system SHALL strictly adhere to the new Supabase response structures.