```markdown
# meta-code-v2 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill provides guidance on contributing to the `meta-code-v2` TypeScript codebase. It covers the project's coding conventions, file organization, import/export patterns, and testing structure. By following these patterns, contributors can ensure consistency and maintainability throughout the repository.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userProfile.ts`, `dataFetcher.ts`

### Import Style
- Use **relative imports** for referencing modules within the project.
  - Example:
    ```typescript
    import { fetchData } from './dataFetcher';
    ```

### Export Style
- Prefer **named exports** over default exports.
  - Example:
    ```typescript
    // In userProfile.ts
    export function getUserProfile(id: string) { ... }
    ```
    ```typescript
    // In another file
    import { getUserProfile } from './userProfile';
    ```

### Commit Patterns
- Commit messages are **freeform** with no strict prefix requirements.
- Average commit message length: ~62 characters.

## Workflows

_No automated workflows detected in the repository._

## Testing Patterns

- Test files follow the pattern: `*.test.*`
  - Example: `userProfile.test.ts`
- The specific testing framework is **unknown**.
- To write a test:
  1. Create a file alongside the source file, using the `.test.ts` suffix.
  2. Implement test cases for the exported functions or classes.
  3. Run tests using the project's preferred test runner (not specified).

  Example:
  ```typescript
  // userProfile.test.ts
  import { getUserProfile } from './userProfile';

  describe('getUserProfile', () => {
    it('returns the correct user data', () => {
      const result = getUserProfile('123');
      expect(result.id).toBe('123');
    });
  });
  ```

## Commands
| Command | Purpose |
|---------|---------|
| /test   | Run all tests in the repository |
| /lint   | Lint the codebase (if linter configured) |
| /build  | Build the TypeScript project (if build script exists) |
```
