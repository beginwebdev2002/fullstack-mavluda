# 📁 pipes

[Root](/.) > [frontend](/frontend) > [src](/frontend/src) > [shared](/frontend/src/shared) > [pipes](/frontend/src/shared/pipes)

**FSD Layer:** Shared

## 🎯 Purpose
Delivering luxury-tier architectural components and high-performance logic for the **Pipes** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience.

**Architecture Layer:** Shared (Feature Sliced Design / Layered Architecture)

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 pipes"]
  Root --> index_ts["📄 index.ts"]
  Root --> safe_html_pipe_ts["📄 safe-html.pipe.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `index.ts` | TypeScript | Core logic and utilities for this domain. | N/A |
| `safe-html.pipe.ts` | TypeScript | Core logic and utilities for this domain. | @angular |

## 🔗 Dependencies
- `@angular/core`
- `@angular/platform-browser`

## 🛠️ Usage
```markdown
```markdown
> This directory acts primarily as a structural container or logic module.
> To interact with its contents, import the relevant exported members from the `index.ts` or specifically targeted files.
```
```
