# AREID Web Dashboard (`apps/web`)

The enterprise-grade observability layer for the Autonomous Resilient Economic Intelligence Dispatcher. This Next.js application provides a rich visual interface for managing your LLM "Battery" fleet and analyzing economic yields.

## 🚀 Key Features

- **Tactical Overview:** Real-time visualization of all API provider health and quota levels.
- **Economic Yields:** Detailed dashboards showing historical "Ghost Savings" and efficiency grades.
- **Fleet Management:** Interface for configuring identity clusters and provider rotation policies.
- **Semantic Explorer:** Search and analyze archived memories stored in the local semantic vault.

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- pnpm 10+
- A running instance of the **AREID Hub** (on localhost:8080)

### Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 🏗️ Architecture

- **Framework:** Next.js 16 (App Router)
- **Styling:** CSS Modules, TailwindCSS
- **State:** React Server Components + Local fetching from the Hub API.

## ⚖️ License
MIT
