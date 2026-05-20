# 🏷️ Dto

[🏠 Home](../../../../../../README.md) ❯ [backend](../../../../../README.md) ❯ [src](../../../../README.md) ❯ [modules](../../../README.md) ❯ [booking](../../README.md) ❯ [presentation](../README.md) ❯ **dto**

**FSD Layer:** `App`

## 🎯 PURPOSE
Core implementation for the dto domain within the luxury Mavluda Beauty ecosystem.

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    f_dto["📁 dto"]
    f_dto --> f_create_booking_dto_ts["📄 create-booking.dto.ts"]
    f_dto --> f_update_booking_dto_ts["📄 update-booking.dto.ts"]
```


## 📄 FILE REGISTRY
| Entry Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `📄 create-booking.dto.ts` | Logic/Utility | Classes: CreateBookingDto | None |
| `📄 update-booking.dto.ts` | Logic/Utility | Classes: UpdateBookingDto | @nestjs/mapped-types |


## 🔗 DEPENDENCIES
- `@nestjs/mapped-types`

## 🛠️ USAGE
Explore the files and directories within this path to understand the refined logic that powers the Mavluda Beauty experience. Refer to the specific classes and functions outlined in the registry for implementation details.
