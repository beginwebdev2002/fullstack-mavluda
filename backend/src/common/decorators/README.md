# [backend](/backend) / [src](/backend/src) / [common](/backend/src/common) / [decorators](/backend/src/common/decorators)

## 🏷️ ✨ Decorators

### 🎯 PURPOSE
The `decorators` directory forms a critical foundation within the Mavluda Beauty ecosystem, meticulously orchestrating the decorators logic to ensure a seamless and premium experience. Rooted in the NestJS backend architecture, it delivers robust, high-performance operations tailored for high-end beauty and wedding services.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  decorators[✨ decorators]
  decorators --> public_decorator_ts(public.decorator.ts)
  decorators --> roles_decorator_ts(roles.decorator.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `public.decorator.ts` | `ts` | Encapsulates premium logic and definitions for `public.decorator.ts`. | @nestjs/common |
| `roles.decorator.ts` | `ts` | Encapsulates premium logic and definitions for `roles.decorator.ts`. | @nestjs/common |


### 🔗 DEPENDENCIES
- `@nestjs/common`

### 🛠️ USAGE
```typescript
// Seamlessly integrate decorators into your refined workflows:
import { /* exported members */ } from '@path/to/decorators';
```
