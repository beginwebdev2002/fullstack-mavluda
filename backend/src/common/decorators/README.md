### 🧭 Breadcrumbs
[Root](/) > [backend](/backend) > [src](/backend/src) > [common](/backend/src/common) > [decorators](/backend/src/common/decorators)

# 📁 Decorators Directory
**Architecture Layer:** Domain/Infrastructure Layer

## 🎯 Purpose
Provides luxury professional architectural implementation for the decorators module within the Mavluda Beauty ecosystem. Ensure robust functionality and elegant integration with the broader architecture.

## 🏗️ ARCHITECTURE
```mermaid
graph TD
  f_Root_decorators["📁 decorators"]
  f_public_decorator_ts["📄 public.decorator.ts"]
  f_Root_decorators --> f_public_decorator_ts
  f_roles_decorator_ts["📄 roles.decorator.ts"]
  f_Root_decorators --> f_roles_decorator_ts
```

## 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `public.decorator.ts` | TypeScript | Provides core logic and orchestration for public.decorator.ts. | @nestjs/common |
| `roles.decorator.ts` | TypeScript | Provides core logic and orchestration for roles.decorator.ts. | @nestjs/common |

## 🔗 DEPENDENCIES
- `@nestjs/common`

## 🛠️ USAGE
```typescript
// Example architectural integration for decorators
// Utilize the exported members according to Mavluda Beauty's standard conventions.
```

---
*Maintained by Mavluda Beauty - Architecture & Engineering*

---
*Maintained by Mavluda Beauty - Architecture & Engineering*