# AREID ESLint Configuration (`packages/eslint-config`)

Centralized ESLint configurations for the AREID monorepo. This package enforces high code quality standards and consistent stylistic rules across all TypeScript and React projects in the workspace.

## 🚀 Key Configurations

- **base.js:** Standard rules for pure TypeScript packages.
- **next-js.js:** Optimized for Next.js 16 and React 19.
- **react-internal.js:** Specific rules for shared component libraries.

## 🏗️ Usage

Extend these configs in your package's `eslint.config.js`:

```javascript
import baseConfig from "@repo/eslint-config/base";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  // Your custom overrides
];
```

## ⚖️ License
MIT
