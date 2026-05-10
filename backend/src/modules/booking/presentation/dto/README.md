# 📁 dto

[Root](/.) > [backend](/backend) > [src](/backend/src) > [modules](/backend/src/modules) > [booking](/backend/src/modules/booking) > [presentation](/backend/src/modules/booking/presentation) > [dto](/backend/src/modules/booking/presentation/dto)

## 🎯 Purpose
Delivering luxury-tier architectural components and high-performance logic for the **dto** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience.

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
| `create-booking.dto.ts` | TypeScript | Handles logic and definitions for create-booking.dto.ts | None |
| `update-booking.dto.ts` | TypeScript | Handles logic and definitions for update-booking.dto.ts | @nestjs/mapped-types |

## 🔗 Dependencies
- `./create-booking.dto`
- `@nestjs/mapped-types`

## 🛠️ Usage
```typescript
// Example usage within the Mavluda Beauty ecosystem
import { relevantMember } from './dto';

// Integrate into the application architecture
relevantMember.execute();
```
