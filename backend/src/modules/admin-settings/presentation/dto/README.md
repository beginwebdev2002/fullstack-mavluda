# 📂 DTO

> 💎 **Mavluda Beauty - Luxury Professional Architecture**

### 📍 Breadcrumb Navigation
`. > backend > src > modules > admin-settings > presentation > dto`

## 🎯 PURPOSE
This directory encapsulates `Presentation` level functionality within the Mavluda Beauty ecosystem, ensuring proper separation of concerns and architectural transparency.

**FSD / Architecture Layer:** `Presentation`

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    Root[dto]
    Root --> F0[📄 create-admin-settings.dto.ts]
    Root --> F1[📄 update-admin-settings.dto.ts]
```

## 📄 FILE REGISTRY

| Item Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
| `📄 create-admin-settings.dto.ts` | `.ts` | DTO definitions | `None` |
| `📄 update-admin-settings.dto.ts` | `.ts` | DTO definitions | `@nestjs/mapped-types` |

## 🔗 DEPENDENCIES
- `@nestjs/mapped-types`

## 🛠️ USAGE
```typescript
// Example usage context
import { ... } from './create-admin-settings.dto';

// Integrate create-admin-settings.dto logic into your feature.
```
