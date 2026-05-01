[Root](/.) > [frontend](/frontend) > [src](/frontend/src) > [shared](/frontend/src/shared) > [pipes](/frontend/src/shared/pipes)

# 📁 Pipes (Shared Layer)

## 🎯 Purpose
Delivering luxury-tier architectural components and high-performance logic for the **pipes** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience.
This directory operates within the **Shared Layer** of the Feature Sliced Design (FSD) architecture.

## 🏗️ Architecture
```mermaid
graph TD
  pipes["📁 pipes"]
  pipes --> index_ts["📄 index.ts"]
  pipes --> safe_html_pipe_ts["📄 safe-html.pipe.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `index.ts` | TypeScript | Provides core logic and orchestration for index.ts. | N/A |
| `safe-html.pipe.ts` | TypeScript | Provides core logic and orchestration for safe-html.pipe.ts. | @angular |

## 🔗 Dependencies
- `./safe-html.pipe`, `@angular/core`, `@angular/platform-browser`

## 🛠️ Usage
```typescript
// Example usage within the Mavluda Beauty ecosystem
import { relevantMember } from './core';

// Integrate into the application architecture
relevantMember.execute();
```