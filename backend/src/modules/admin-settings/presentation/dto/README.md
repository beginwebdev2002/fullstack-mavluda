# 📦 dto

[backend](../../../../../README.md) > [src](../../../../README.md) > [modules](../../../README.md) > [admin-settings](../../README.md) > [presentation](../README.md) > [dto](README.md)

---

### 🎯 PURPOSE
Elevating the digital experience for the Mavluda Beauty ecosystem, this module manages the sophisticated Presentation Layer (Controllers, Resolvers, DTOs) operations.

*FSD Layer:* **Presentation Layer (Controllers, Resolvers, DTOs)**

---

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  subgraph dto
    create_admin_settings_dto_ts["create-admin-settings.dto.ts"]
    update_admin_settings_dto_ts["update-admin-settings.dto.ts"]
  end
```


---

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
| `create-admin-settings.dto.ts` | DTO | Handles dto logic for Mavluda Beauty's luxury standards. | `None` |
| `update-admin-settings.dto.ts` | DTO | Handles dto logic for Mavluda Beauty's luxury standards. | `@nestjs` |

---

### 🔗 DEPENDENCIES
**Key Path Aliases Detected:** `@nestjs`

Notable imports:
- `class-validator`
- `../../domain/interfaces/admin-settings.interface`
- `@nestjs/mapped-types`
- `class-transformer`
- `./create-admin-settings.dto`

---

### 🛠️ USAGE
To interact with this directory's luxurious logic, integrate its exported components or services directly into your feature modules. Ensure strict adherence to the Presentation Layer (Controllers, Resolvers, DTOs) boundaries.

```typescript
// Example integration snippet
import { FeatureModule } from '@path/to/dto';
```
