[Root](/.) > [backend](/backend) > [src](/backend/src) > [modules](/backend/src/modules) > [admin-settings](/backend/src/modules/admin-settings) > [presentation](/backend/src/modules/admin-settings/presentation) > [dto](/backend/src/modules/admin-settings/presentation/dto)

# 📁 Dto

## 🎯 Purpose
Delivering luxury-tier architectural components and high-performance logic for the **dto** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience.

## 🏗️ Architecture
```mermaid
graph TD
  dto["📁 dto"]
  dto --> create_admin_settings_dto_ts["📄 create-admin-settings.dto.ts"]
  dto --> update_admin_settings_dto_ts["📄 update-admin-settings.dto.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-admin-settings.dto.ts` | TypeScript | Provides core logic and orchestration for create-admin-settings.dto.ts. | N/A |
| `update-admin-settings.dto.ts` | TypeScript | Provides core logic and orchestration for update-admin-settings.dto.ts. | @nestjs |

## 🔗 Dependencies
- `../../domain/interfaces/admin-settings.interface`, `./create-admin-settings.dto`, `@nestjs/mapped-types`, `class-transformer`, `class-validator`

## 🛠️ Usage
```typescript
// Example usage within the Mavluda Beauty ecosystem
import { relevantMember } from './core';

// Integrate into the application architecture
relevantMember.execute();
```