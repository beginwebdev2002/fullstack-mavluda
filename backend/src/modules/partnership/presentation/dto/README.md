# 📁 dto

[Root](/.) > [backend](/backend) > [src](/backend/src) > [modules](/backend/src/modules) > [partnership](/backend/src/modules/partnership) > [presentation](/backend/src/modules/partnership/presentation) > [dto](/backend/src/modules/partnership/presentation/dto)

## 🎯 Purpose
Backend module defining application routes, business logic, and data access for the domain.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 dto"]
  Root --> create_partnership_dto_ts["📄 create-partnership.dto.ts"]
  Root --> update_partnership_dto_ts["📄 update-partnership.dto.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-partnership.dto.ts` | TypeScript | Provides core logic and orchestration for create-partnership.dto.ts. | N/A |
| `update-partnership.dto.ts` | TypeScript | Provides core logic and orchestration for update-partnership.dto.ts. | @nestjs |

## 🔗 Dependencies
- `./create-partnership.dto`
- `@nestjs/mapped-types`

## 🛠️ Usage
```typescript
import { Module } from '@nestjs/common';
// Import specific services/controllers provided by this module
```
