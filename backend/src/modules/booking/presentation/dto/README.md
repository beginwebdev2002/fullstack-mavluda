[🏠 Home](../../../../../../README.md) > [backend](../../../../../README.md) > [src](../../../../README.md) > [modules](../../../README.md) > [booking](../../README.md) > [presentation](../README.md) > [dto](./README.md)

# 📁 dto

### 🎯 PURPOSE
Welcome to the exquisite **dto** module of the Mavluda Beauty ecosystem. This directory handles specific domain assets and logic. It is designed adhering to our 'Luxury Professional' standards.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  Root_dto["📁 dto"]
  f_create_booking_dto_ts["create-booking.dto.ts"]
  Root_dto --> f_create_booking_dto_ts
  f_update_booking_dto_ts["update-booking.dto.ts"]
  Root_dto --> f_update_booking_dto_ts
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-booking.dto.ts` | TypeScript File | Defines classes: CreateBookingDto. | None |
| `update-booking.dto.ts` | TypeScript File | Defines classes: UpdateBookingDto. | @nestjs |

### 🔗 DEPENDENCIES
- `@nestjs/mapped-types`

### 🛠️ USAGE
```typescript
// Example interaction or integration snippet
// Import members from dto based on module boundaries
```
