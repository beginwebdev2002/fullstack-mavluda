# [root](/) / [backend](/backend) / [src](/backend/src) / [modules](/backend/src/modules) / [booking](/backend/src/modules/booking) / [presentation](/backend/src/modules/booking/presentation) / [dto](/backend/src/modules/booking/presentation/dto)

## 🏷️ 📁 Dto

### 🎯 PURPOSE
The `dto` backend module encapsulates the business logic, presentation, and data access for dto.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  dto[📁 dto]
  dto --> dto_create_booking_dto_ts(create-booking.dto.ts)
  dto --> dto_update_booking_dto_ts(update-booking.dto.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-booking.dto.ts` | `ts` | Data transfer objects and models. | None |
| `update-booking.dto.ts` | `ts` | Data transfer objects and models. | @nestjs |

### 🔗 DEPENDENCIES
- `./create-booking.dto`
- `@nestjs/mapped-types`

### 🛠️ USAGE
```typescript
// Seamlessly integrate dto into your refined workflows:
import { /* exported members */ } from '@path/to/dto';
```
