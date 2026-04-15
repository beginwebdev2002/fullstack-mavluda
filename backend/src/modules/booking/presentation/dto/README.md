# [backend](/backend) / [src](/backend/src) / [modules](/backend/src/modules) / [booking](/backend/src/modules/booking) / [presentation](/backend/src/modules/booking/presentation) / [dto](/backend/src/modules/booking/presentation/dto)

## 🏷️ 📨 Dto

### 🎯 PURPOSE
The `dto` directory forms a critical foundation within the Mavluda Beauty ecosystem, meticulously orchestrating the dto logic to ensure a seamless and premium experience. Rooted in the NestJS backend architecture, it delivers robust, high-performance operations tailored for high-end beauty and wedding services.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  dto[📨 dto]
  dto --> create_booking_dto_ts(create-booking.dto.ts)
  dto --> update_booking_dto_ts(update-booking.dto.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-booking.dto.ts` | `ts` | Encapsulates premium logic and definitions for `create-booking.dto.ts`. | None |
| `update-booking.dto.ts` | `ts` | Encapsulates premium logic and definitions for `update-booking.dto.ts`. | @nestjs/mapped-types |


### 🔗 DEPENDENCIES
- `@nestjs/mapped-types`

### 🛠️ USAGE
```typescript
// Seamlessly integrate dto into your refined workflows:
import { /* exported members */ } from '@path/to/dto';
```
