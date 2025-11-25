---
title: Project Structure
description: "Overview of the file structure and organization conventions."
inclusion: always
---

# Project Structure

The project is organized as a monorepo containing the frontend application and backend microservices.

## High-Level Directories

- **`GreekLearningApp-Frontend/`**: The main Next.js web application.
  - `app/`: Next.js App Router directory (Routes, Pages, Layouts).
  - `public/`: Static assets.
  - `types/`: Global TypeScript definitions.
- **`GreekLearningApp-ReaderService/`**: (Legacy/Reference) Go-based backend. **Read-Only.**
- **`GreekLearningApp-StudyService/`**: (Legacy/Reference) C#/.NET backend. **Read-Only.**
- **`GreekLearningApp-TextService/`**: (Legacy/Reference) C#/.NET backend. **Read-Only.**
- **`GreekLearningApp-UserService/`**: (Legacy/Reference) C#/.NET backend. **Read-Only.**
- **`supabase/`**: Target location for Supabase configuration, Edge Functions, and migrations.
- **`GreekLearningApp-Illustrations/`**: Design assets and raw illustration files (`.ai`, `.svg`).
- **`docs/`**: Project documentation.
  - `specs/`: Feature specifications and migration guides.
- **`.kiro/`**: AI steering and configuration files.

## Documentation Conventions
- Architecture docs: `docs/architecture/`
- Feature specs: `docs/features/<feature_name>/`
- Operational docs: `docs/operations/`
