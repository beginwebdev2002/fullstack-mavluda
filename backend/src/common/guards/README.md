# [backend](/backend) / [src](/backend/src) / [common](/backend/src/common) / [guards](/backend/src/common/guards)

## 🏷️ 🛡️ Guards

### 🎯 PURPOSE
The `guards` directory forms a critical foundation within the Mavluda Beauty ecosystem, meticulously orchestrating the guards logic to ensure a seamless and premium experience. Rooted in the NestJS backend architecture, it delivers robust, high-performance operations tailored for high-end beauty and wedding services.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  guards[🛡️ guards]
  guards --> jwt_auth_guard_ts(jwt-auth.guard.ts)
  guards --> roles_guard_ts(roles.guard.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `jwt-auth.guard.ts` | `ts` | Encapsulates premium logic and definitions for `jwt-auth.guard.ts`. | @nestjs/passport, @nestjs/common, @nestjs/core |
| `roles.guard.ts` | `ts` | Encapsulates premium logic and definitions for `roles.guard.ts`. | @nestjs/common, @nestjs/core |


### 🔗 DEPENDENCIES
- `@nestjs/common`
- `@nestjs/core`
- `@nestjs/passport`

### 🛠️ USAGE
```typescript
// Seamlessly integrate guards into your refined workflows:
import { /* exported members */ } from '@path/to/guards';
```
