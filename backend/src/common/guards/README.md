# 🛡️ guards

[backend](../../../README.md) > [src](../../README.md) > [common](../README.md) > [guards](README.md)

---

### 🎯 PURPOSE
Elevating the digital experience for the Mavluda Beauty ecosystem, this module manages the sophisticated Common Layer (Cross-cutting concerns) operations.

*FSD Layer:* **Common Layer (Cross-cutting concerns)**

---

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  subgraph guards
    roles_guard_ts["roles.guard.ts"]
    jwt_auth_guard_ts["jwt-auth.guard.ts"]
  end
```


---

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
| `roles.guard.ts` | Source | Handles source logic for Mavluda Beauty's luxury standards. | `@nestjs` |
| `jwt-auth.guard.ts` | Source | Handles source logic for Mavluda Beauty's luxury standards. | `@nestjs` |

---

### 🔗 DEPENDENCIES
**Key Path Aliases Detected:** `@nestjs`

Notable imports:
- `../decorators/roles.decorator`
- `@nestjs/core`
- `@nestjs/common`
- `../decorators/public.decorator`
- `@nestjs/passport`

---

### 🛠️ USAGE
To interact with this directory's luxurious logic, integrate its exported components or services directly into your feature modules. Ensure strict adherence to the Common Layer (Cross-cutting concerns) boundaries.

```typescript
// Example integration snippet
import { FeatureModule } from '@path/to/guards';
```
