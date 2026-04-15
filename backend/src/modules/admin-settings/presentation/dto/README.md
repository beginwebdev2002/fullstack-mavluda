# [backend](/backend) / [src](/backend/src) / [modules](/backend/src/modules) / [admin-settings](/backend/src/modules/admin-settings) / [presentation](/backend/src/modules/admin-settings/presentation) / [dto](/backend/src/modules/admin-settings/presentation/dto)

## 🏷️ 📨 Dto

### 🎯 PURPOSE
The `dto` directory forms a critical foundation within the Mavluda Beauty ecosystem, meticulously orchestrating the dto logic to ensure a seamless and premium experience. Rooted in the NestJS backend architecture, it delivers robust, high-performance operations tailored for high-end beauty and wedding services.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  dto[📨 dto]
  dto --> create_admin_settings_dto_ts(create-admin-settings.dto.ts)
  dto --> update_admin_settings_dto_ts(update-admin-settings.dto.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-admin-settings.dto.ts` | `ts` | Encapsulates premium logic and definitions for `create-admin-settings.dto.ts`. | None |
| `update-admin-settings.dto.ts` | `ts` | Encapsulates premium logic and definitions for `update-admin-settings.dto.ts`. | @nestjs/mapped-types |


### 🔗 DEPENDENCIES
- `@nestjs/mapped-types`

### 🛠️ USAGE
```typescript
// Seamlessly integrate dto into your refined workflows:
import { /* exported members */ } from '@path/to/dto';
```
