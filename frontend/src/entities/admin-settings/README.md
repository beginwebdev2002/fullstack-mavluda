# [root](/) / [frontend](/frontend) / [src](/frontend/src) / [entities](/frontend/src/entities) / [admin-settings](/frontend/src/entities/admin-settings)

## 🏷️ 📁 Admin-settings (Entity Layer)

### 🎯 PURPOSE
The `admin-settings` entity defines the data models and core business logic for the admin-settings domain within the frontend.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  admin_settings[📁 admin-settings]
  admin_settings --> admin_settings_admin_settings_service_ts(admin-settings.service.ts)
  admin_settings --> admin_settings_index_ts(index.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `admin-settings.service.ts` | `ts` | Business logic and service layer. | @angular, @core, @shared |
| `index.ts` | `ts` | Core logic implementation. | None |

### 🔗 DEPENDENCIES
- `./admin-settings.service`
- `@angular/common/http`
- `@angular/core`
- `@core/constants/api-endpoints`
- `@shared/models/admin-settings.model`
- `rxjs`

### 🛠️ USAGE
```typescript
// Seamlessly integrate admin-settings into your refined workflows:
import { /* exported members */ } from '@path/to/admin-settings';
```
