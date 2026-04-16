# [root](/) / [backend](/backend) / [src](/backend/src) / [modules](/backend/src/modules) / [booking](/backend/src/modules/booking) / [infrastructure](/backend/src/modules/booking/infrastructure) / [schemas](/backend/src/modules/booking/infrastructure/schemas)

## 🏷️ 📁 Schemas

### 🎯 PURPOSE
The `schemas` directory forms a critical foundation within the Mavluda Beauty ecosystem, meticulously orchestrating the schemas logic to ensure a seamless and premium experience.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  schemas[📁 schemas]
  schemas --> schemas_booking_schema_ts(booking.schema.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `booking.schema.ts` | `ts` | Core logic implementation. | @nestjs |

### 🔗 DEPENDENCIES
- `@nestjs/mongoose`
- `mongoose`

### 🛠️ USAGE
```typescript
// Seamlessly integrate schemas into your refined workflows:
import { /* exported members */ } from '@path/to/schemas';
```
