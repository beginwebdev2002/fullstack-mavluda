# [root](/) / [backend](/backend) / [src](/backend/src) / [common](/backend/src/common) / [guards](/backend/src/common/guards)

## 🏷️ 📁 Guards

### 🎯 PURPOSE
The `guards` directory provides core backend services and configuration.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  guards[📁 guards]
  guards --> guards_jwt_auth_guard_ts(jwt-auth.guard.ts)
  guards --> guards_roles_guard_ts(roles.guard.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `jwt-auth.guard.ts` | `ts` | Core logic implementation. | @nestjs |
| `roles.guard.ts` | `ts` | Core logic implementation. | @nestjs |

### 🔗 DEPENDENCIES
- `../decorators/public.decorator`
- `../decorators/roles.decorator`
- `@nestjs/common`
- `@nestjs/core`
- `@nestjs/passport`

### 🛠️ USAGE
```typescript
// Seamlessly integrate guards into your refined workflows:
import { /* exported members */ } from '@path/to/guards';
```
