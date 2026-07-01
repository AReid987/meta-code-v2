# Slice S02: Quota Tracker Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a robust, persistent Quota Tracker that extracts real-time usage information from provider API headers and persists it to SQLite.

**Architecture:** 
- Enhance `LLMProvider` interface to return `ProviderUsage` along with the response.
- Update `OpenAIProvider`, `AnthropicProvider`, and `GoogleProvider` to extract quota headers.
- Implement `SQLiteQuotaTracker` as a persistent alternative to `InMemoryQuotaTracker`.
- Integrate `QuotaTracker` into `UnifiedClient` to automatically update quotas after each call.

**Tech Stack:** TypeScript, SQLite (via `better-sqlite3` or similar), Node.js.

---

### Task 1: Enhance Types and Interfaces

**Files:**
- Modify: `packages/llm-router/src/types.ts`

**Step 1: Update `ChatResponse` to include `usage_metadata` from headers**
**Step 2: Update `LLMProvider.chat` return type if necessary**
**Step 3: Commit**

### Task 2: Implement Header Extraction in OpenAIProvider

**Files:**
- Modify: `packages/llm-router/src/providers/openai.ts`

**Step 1: Update `chat` method to extract `x-ratelimit-*` headers**
**Step 2: Update `getUsage` to return actual tracked usage if available**
**Step 3: Commit**

### Task 3: Implement Header Extraction in AnthropicProvider

**Files:**
- Modify: `packages/llm-router/src/providers/anthropic.ts`

**Step 1: Update `chat` method to extract `anthropic-ratelimit-*` headers**
**Step 2: Commit**

### Task 4: Implement SQLiteQuotaTracker

**Files:**
- Create: `packages/llm-router/src/quota-tracker/sqlite.ts`
- Modify: `packages/llm-router/src/index.ts` (export new tracker)

**Step 1: Install `better-sqlite3` and `@types/better-sqlite3`**
**Step 2: Implement `SQLiteQuotaTracker` class**
**Step 3: Write tests for `SQLiteQuotaTracker`**
**Step 4: Commit**

### Task 5: Integrate Quota Tracker in UnifiedClient

**Files:**
- Modify: `packages/llm-router/src/unified-client.ts`

**Step 1: Update `chat` method to call `quotaTracker.trackUsage` and `quotaTracker.updateQuota` based on response headers**
**Step 2: Commit**

### Task 6: Final Verification and TDD pass

**Step 1: Create a mock provider test to verify end-to-end quota flow**
**Step 2: Run all tests**
**Step 3: Commit**
