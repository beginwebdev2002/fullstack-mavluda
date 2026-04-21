# 📂 DTO

> 💎 **Mavluda Beauty - Luxury Professional Architecture**

### 📍 Breadcrumb Navigation
`. > backend > src > modules > treatments > presentation > dto`

## 🎯 PURPOSE
This directory encapsulates `Presentation` level functionality within the Mavluda Beauty ecosystem, ensuring proper separation of concerns and architectural transparency.

**FSD / Architecture Layer:** `Presentation`

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    Root[dto]
    Root --> F0[📄 create-treatments.dto.ts]
    Root --> F1[📄 update-treatments.dto.ts]
```

## 📄 FILE REGISTRY

| Item Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
| `📄 create-treatments.dto.ts` | `.ts` | DTO definitions | `None` |
| `📄 update-treatments.dto.ts` | `.ts` | DTO definitions | `@nestjs/mapped-types` |

## 🔗 DEPENDENCIES
- `@nestjs/mapped-types`

## 🛠️ USAGE
```typescript
// Example usage context
import { ... } from './create-treatments.dto';

// Integrate create-treatments.dto logic into your feature.
```
