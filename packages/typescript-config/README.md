# AREID TypeScript Configuration (`packages/typescript-config`)

Shared TypeScript configurations for the AREID monorepo. This package ensures consistent compiler rules and type safety standards across all apps and packages.

## 🚀 Key Configurations

- **base.json:** The foundational TS config for the workspace.
- **nextjs.json:** Specific overrides for Next.js 16 applications.
- **react-library.json:** Optimized for shared React 19 component libraries.

## 🏗️ Usage

Extend these configs in your package's `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }]
  }
}
```

## ⚖️ License
MIT
