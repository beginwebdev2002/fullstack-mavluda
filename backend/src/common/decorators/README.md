# 📂 DECORATORS

> 💎 **Mavluda Beauty - Luxury Professional Architecture**

### 📍 Breadcrumb Navigation
`. > backend > src > common > decorators`

## 🎯 PURPOSE
This directory encapsulates `Backend Core/Infrastructure` level functionality within the Mavluda Beauty ecosystem, ensuring proper separation of concerns and architectural transparency.

**FSD / Architecture Layer:** `Backend Core/Infrastructure`

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    Root[decorators]
    Root --> F0[📄 public.decorator.ts]
    Root --> F1[📄 roles.decorator.ts]
```

## 📄 FILE REGISTRY

| Item Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
| `📄 public.decorator.ts` | `.ts` | General functionality | `@nestjs/common` |
| `📄 roles.decorator.ts` | `.ts` | General functionality | `@nestjs/common` |

## 🔗 DEPENDENCIES
- `@nestjs/common`

## 🛠️ USAGE
```typescript
// Example usage context
import { ... } from './public.decorator';

// Integrate public.decorator logic into your feature.
```
