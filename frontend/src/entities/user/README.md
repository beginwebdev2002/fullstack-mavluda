# 📁 user

[Root](/.) > [frontend](/frontend) > [src](/frontend/src) > [entities](/frontend/src/entities) > [user](/frontend/src/entities/user)

**FSD Layer:** Entity

## 🎯 Purpose
Delivering luxury-tier architectural components and high-performance logic for the **User** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience.

**Architecture Layer:** Entities (Feature Sliced Design / Layered Architecture)

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 user"]
  Root --> constants["📁 constants"]
  Root --> model["📁 model"]
  Root --> auth_service_ts["📄 auth.service.ts"]
  Root --> index_ts["📄 index.ts"]
  Root --> user_service_ts["📄 user.service.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `auth.service.ts` | TypeScript | Core logic and utilities for this domain. | @angular |
| `index.ts` | TypeScript | Core logic and utilities for this domain. | N/A |
| `user.service.ts` | TypeScript | Core logic and utilities for this domain. | @angular |

## 🔗 Dependencies
- `./model/user.model`
- `@angular/common/http`
- `@angular/core`
- `@angular/router`
- `jwt-decode`
- `rxjs`
- `rxjs/operators`

## 🛠️ Usage
```markdown
```markdown
> This directory acts primarily as a structural container or logic module.
> To interact with its contents, import the relevant exported members from the `index.ts` or specifically targeted files.
```
```
