# [root](/) / [backend](/backend) / [src](/backend/src) / [modules](/backend/src/modules) / [partnership](/backend/src/modules/partnership) / [presentation](/backend/src/modules/partnership/presentation) / [dto](/backend/src/modules/partnership/presentation/dto)

## 🏷️ 📁 Dto

### 🎯 PURPOSE
The `dto` directory forms a critical foundation within the Mavluda Beauty ecosystem, meticulously orchestrating the dto logic to ensure a seamless and premium experience.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  dto[📁 dto]
  dto --> dto_create_partnership_dto_ts(create-partnership.dto.ts)
  dto --> dto_update_partnership_dto_ts(update-partnership.dto.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-partnership.dto.ts` | `ts` | Data transfer objects and models. | None |
| `update-partnership.dto.ts` | `ts` | Data transfer objects and models. | @nestjs |

### 🔗 DEPENDENCIES
- `./create-partnership.dto`
- `@nestjs/mapped-types`

### 🛠️ USAGE
```typescript
// Seamlessly integrate dto into your refined workflows:
import { /* exported members */ } from '@path/to/dto';
```
