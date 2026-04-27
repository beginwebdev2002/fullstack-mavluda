# 📁 dto

[Root](/.) > [backend](/backend) > [src](/backend/src) > [modules](/backend/src/modules) > [booking](/backend/src/modules/booking) > [presentation](/backend/src/modules/booking/presentation) > [dto](/backend/src/modules/booking/presentation/dto)

## 🎯 Purpose
Backend module defining application routes, business logic, and data access for the domain.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 dto"]
  Root --> create_booking_dto_ts["📄 create-booking.dto.ts"]
  Root --> update_booking_dto_ts["📄 update-booking.dto.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-booking.dto.ts` | TypeScript | Provides core logic and orchestration for create-booking.dto.ts. | N/A |
| `update-booking.dto.ts` | TypeScript | Provides core logic and orchestration for update-booking.dto.ts. | @nestjs |

## 🔗 Dependencies
- `./create-booking.dto`
- `@nestjs/mapped-types`

## 🛠️ Usage
```typescript
import { Module } from '@nestjs/common';
// Import specific services/controllers provided by this module
```
