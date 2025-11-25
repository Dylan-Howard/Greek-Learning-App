# Implementation Tasks

- [ ] 1. Initialize Supabase project structure and environment
  - Create local Supabase configuration and initialization files
  - Configure environment variables for local development (`.env.local`)
  - Set up SQL migration directory structure
  - _Requirements: 1.1, 4.1_

- [ ] 2. Implement Text and Grammar database tables
  - Create migration script for `texts`, `chapters`, `verses`, `units`
  - Create migration script for `morphologies`, `roots`, `grammatical_forms`, `lessons`
  - Create migration script for `translations`
  - Define foreign keys and indexes for performance
  - _Requirements: 1.1, 3.3_

- [ ] 3. Implement User Management database tables
  - Create migration script for `public.users` profile table
  - Create migration script for `user_settings` with JSONB column
  - Create migration script for `user_vocabulary` and `user_lessons`
  - Create migration script for `sets` and `set_membership`
  - _Requirements: 1.2, 1.3_

- [ ] 4. Import static reference data
  - Prepare CSV/SQL seed files for Greek texts and parsing data
  - Create seed script to populate Text and Grammar tables
  - Verify data integrity of imported static content
  - _Requirements: 1.1_

- [ ] 5. Configure Supabase Auth and User Triggers
  - Configure Supabase Auth settings (providers, email templates)
  - Create PL/pgSQL function to handle new user creation
  - Create database trigger `on_auth_user_created` to insert into `public.users`
  - _Requirements: 2.1, 2.2_

- [ ] 6. Implement Row Level Security (RLS) Policies
  - Enable RLS on all created tables
  - Create policy: Allow public read access to Text/Grammar tables
  - Create policy: Allow users to CRUD only their own rows in User tables
  - Create policy: Deny all access to unauthenticated users for private data
  - _Requirements: 1.4, 2.4_

- [ ] 7. Implement `render_chapter` RPC function
  - Create PL/pgSQL function `render_chapter` signature
  - Implement logic to join Units, Morphology, and Grammatical Forms
  - Implement logic to check `user_vocabulary` and `user_lessons`
  - Implement status determination ('recognized', 'needs_help', 'unrecognized')
  - Return composite table result
  - _Requirements: 3.1, 3.3, 3.5_

- [ ] 8. Implement `update_user_progress` database function
  - Create PL/pgSQL function `update_user_progress`
  - Implement batch insert/update logic for `user_lessons`
  - Implement batch insert/update logic for `user_vocabulary`
  - Ensure transactional integrity
  - _Requirements: 3.4_

- [ ] 9. Implement `user-progress` Edge Function
  - Initialize Supabase Edge Function project
  - Create `user-progress` function handler in TypeScript/Deno
  - Implement request validation and parsing
  - Call `update_user_progress` RPC from the Edge Function
  - Handle errors and return standardized JSON response
  - _Requirements: 3.2_

- [ ] 10. Setup Supabase Client in Next.js Application
  - Install `@supabase/supabase-js` and `@supabase/auth-helpers-nextjs`
  - Create `utils/supabase.ts` for client initialization
  - Configure environment variables in Next.js
  - _Requirements: 4.1_

- [ ] 11. Refactor Authentication Flow
  - Remove Clerk SDK and dependencies
  - Create Supabase Auth context provider
  - Update Sign-up, Login, and Logout components to use Supabase Auth
  - Protect routes using Supabase session checks
  - _Requirements: 2.3, 4.3_

- [ ] 12. Refactor Reader Service Integration
  - Remove legacy Azure `ReaderService` HTTP calls
  - Implement data fetching using `rpc('render_chapter')`
  - Update frontend types to match RPC response structure
  - Handle loading states and errors from Supabase client
  - _Requirements: 4.2, 4.4_

- [ ] 13. Refactor User Service Integration
  - Remove legacy Azure `UserService` and `StudyService` calls
  - Implement direct DB queries for User Profile and Settings
  - Implement Edge Function calls for progress updates
  - Update frontend state management for user data
  - _Requirements: 4.2, 3.4_

- [ ] 14. Implement Unit Tests
  - Write SQL tests for table structures and constraints
  - Write PL/pgSQL tests for `render_chapter` logic (mocking data)
  - Write frontend unit tests for Supabase client utility
  - _Requirements: Testing Strategy_

- [ ] 15. Implement Property-Based Tests
  - Configure `fast-check` for property-based testing
  - Implement `RLS Isolation` test (Property 1)
  - Implement `Adaptive Interlinear` correctness test (Property 5)
  - Implement `Migration Equivalence` test (Property 6)
  - _Requirements: Testing Strategy_

- [ ] 16. Implement Integration Tests
  - Write end-to-end test for User Signup flow
  - Write end-to-end test for Chapter Rendering flow
  - Validate no calls are made to legacy Azure endpoints
  - _Requirements: Testing Strategy_

- [ ] 17. Update Documentation
  - Update API documentation with new RPC and Edge Function details
  - Update architecture diagrams in `README.md` or `docs/`
  - Remove legacy Azure deployment guides
  - Document local development setup with Supabase
  - _Requirements: Documentation_