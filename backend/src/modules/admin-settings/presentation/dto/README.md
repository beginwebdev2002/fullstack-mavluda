# 📁 dto

[Root](/.) > [backend](/backend) > [src](/backend/src) > [modules](/backend/src/modules) > [admin-settings](/backend/src/modules/admin-settings) > [presentation](/backend/src/modules/admin-settings/presentation) > [dto](/backend/src/modules/admin-settings/presentation/dto)

## 🎯 Purpose
Backend module defining application routes, business logic, and data access for the domain.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 dto"]
  Root --> create_admin_settings_dto_ts["📄 create-admin-settings.dto.ts"]
  Root --> update_admin_settings_dto_ts["📄 update-admin-settings.dto.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-admin-settings.dto.ts` | TypeScript | Provides core logic and orchestration for create-admin-settings.dto.ts. | N/A |
| `update-admin-settings.dto.ts` | TypeScript | Provides core logic and orchestration for update-admin-settings.dto.ts. | @nestjs |

## 🔗 Dependencies
- `./create-admin-settings.dto`
- `@nestjs/mapped-types`
- `class-transformer`

## 🛠️ Usage
```typescript
import { Module } from '@nestjs/common';
// Import specific services/controllers provided by this module
```
