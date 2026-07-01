# AREID 🧠🔋
> **A**utonomous **R**esilient **E**conomic **I**ntelligence **D**ispatcher

AREID is a high-performance LLM routing engine and observability suite designed for solo developers and AI-native startups. It treats free-tier API quotas as a precious, recharging "Battery" fleet, using autonomous intelligence to route prompts to the most efficient provider.

## 🏗️ Workspace Architecture

This project is structured as a **Turborepo Monorepo** managing a hybrid Python/TypeScript stack:

- **`packages/reid-core`** (`@meta-code-v2/core`): The heartbeat of the system. A FastAPI-based Hub that handles 14-dial semantic classification, identity-based rotation, and local-first semantic memory via `sqlite-vec`.
- **`apps/web`**: (Incoming) A full-featured Next.js dashboard for enterprise-grade observability and fleet management.
- **`apps/docs`**: Documentation site for the AREID protocol and API references.

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Fill in your free-tier API keys (Groq, Gemini, Kimi, etc.)
   ```

3. **Start the Refinery (API Hub):**
   ```bash
   pnpm dev
   ```
   *Launches the FastAPI Hub on `localhost:8080` and begins background harvesting.*

4. **Launch the Cockpit (TUI):**
   ```bash
   pnpm ui
   ```
   *Opens the high-density Textual dashboard for real-time monitoring.*

## 🌍 Remote Access (Cross-Machine Setup)

AREID is designed to work across your **Tailscale Tailnet**. You can run the Hub on a powerful machine (e.g., M1 Pro) and connect to it from a lightweight client (e.g., Intel MBP).

### 1. Connection Details
From your remote machine, use the Hub machine's **Tailscale IP** or **MagicDNS** name:
- **Endpoint:** `http://tessara:8080/v1` or `http://100.114.239.45:8080/v1`
- **Model:** `auto` (to use the REID intelligent classifier)
- **API Key:** `sk-reid-free` (or any string)

### 2. Client Configuration (OpenClaw / Paperclip)
Set your tool's **OpenAI API Base** to the endpoint above. No other local configuration is needed on the client machine.

## 🔋 Core Features

- **The Brain:** 14-Dial Semantic Classifier that maps prompts to 4 calibrated performance tiers.
- **The Battery:** Persistent quota tracking and automatic identity rotation to maximize free reasoning.
- **The Bridge:** Automated Web-to-API bridge for harvesting high-tier reasoning from Gemini/Claude web interfaces.
- **The Memory:** Local-first `sqlite-vec` vault that learns from every interaction and provides "Life-Boat" fallbacks.
- **The Shield:** Bi-directional PII and Secret scrubber ensuring zero-leak "Guerilla" development.

## 🛠️ Technology Stack

- **Orchestration:** Turborepo, pnpm
- **Engine:** Python 3.13, FastAPI, LiteLLM, PDM
- **Database:** SQLite, `sqlite-vec` (Vector search)
- **TUI:** Textual (30+ FPS observability)
- **Web:** Next.js (React), TailwindCSS

## 📜 Documentation

- [Project Vision](./.gsd/PROJECT.md)
- [Implementation Epics](./_bmad-output/planning-artifacts/epics.md)
- [Architecture Blueprint](./_bmad-output/planning-artifacts/architecture.md)

## ⚖️ License

MIT
