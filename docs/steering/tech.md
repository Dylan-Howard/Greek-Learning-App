---
title: Technology Stack
description: "The technology stack and development tools used in the project."
inclusion: always
---

# Technology Stack

## Frontend
- **Framework:** Next.js 14 (App Router)
- **Library:** React 18
- **Language:** TypeScript
- **UI Framework:** Material UI (@mui/material)
- **State/Logic:** React Hooks

## Backend & Infrastructure (Migration in Progress)
**CRITICAL DEVELOPMENT DIRECTIVE:**
The project is migrating to Supabase.
- **New Features/Fixes:** MUST be implemented using the **Target Architecture** (Supabase/TypeScript).
- **Legacy Code (C#/Go):** Treat as **READ-ONLY REFERENCE**. Do not modify, extend, or fix the existing Azure Functions. Use them solely to understand business logic for reimplementation.

### Target Architecture (Supabase)
- **Platform:** Supabase (BaaS)
- **Database:** PostgreSQL
- **Auth:** Supabase Auth
- **Logic:** Supabase Edge Functions (TypeScript/Deno) & Database Webhooks/Triggers
- **Client:** `supabase-js`

### Legacy Architecture (Azure) - REFERENCE ONLY
*These components are deprecated. Do not modify.*
- **Compute:** Azure Functions (v4)
- **Languages:** C# (.NET 8.0), Go (1.22)
- **Databases:** Azure SQL, Azure CosmosDB
- **Auth:** Clerk

## Development Tools
- **Package Manager:** npm
- **Version Control:** Git
- **Hosting:** GitHub Pages (Legacy/Demo), potentially Vercel or Supabase Hosting for production.
