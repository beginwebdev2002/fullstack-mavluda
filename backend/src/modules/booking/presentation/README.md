# [root](/) / [backend](/backend) / [src](/backend/src) / [modules](/backend/src/modules) / [booking](/backend/src/modules/booking) / [presentation](/backend/src/modules/booking/presentation)

## 🏷️ 📁 Presentation

### 🎯 PURPOSE
The `presentation` backend module encapsulates the business logic, presentation, and data access for presentation.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  presentation[📁 presentation]
  presentation --> presentation_dto[📁 dto]
  presentation --> presentation_booking_controller_ts(booking.controller.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `booking.controller.ts` | `ts` | Handles incoming HTTP requests. | @nestjs |

### 🔗 DEPENDENCIES
- `../application/booking.service`
- `./dto/create-booking.dto`
- `./dto/update-booking.dto`
- `@nestjs/common`

### 🛠️ USAGE
```typescript
// Seamlessly integrate presentation into your refined workflows:
import { /* exported members */ } from '@path/to/presentation';
```
