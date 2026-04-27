# 📁 dto

[Root](/.) > [backend](/backend) > [src](/backend/src) > [modules](/backend/src/modules) > [user](/backend/src/modules/user) > [presentation](/backend/src/modules/user/presentation) > [dto](/backend/src/modules/user/presentation/dto)

## 🎯 Purpose
Backend module defining application routes, business logic, and data access for the domain.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 dto"]
  Root --> create_user_dto_ts["📄 create-user.dto.ts"]
  Root --> update_user_dto_ts["📄 update-user.dto.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-user.dto.ts` | TypeScript | Provides core logic and orchestration for create-user.dto.ts. | N/A |
| `update-user.dto.ts` | TypeScript | Provides core logic and orchestration for update-user.dto.ts. | @nestjs |

## 🔗 Dependencies
- `./create-user.dto`
- `@nestjs/mapped-types`

## 🛠️ Usage
```typescript
import { Module } from '@nestjs/common';
// Import specific services/controllers provided by this module
```
