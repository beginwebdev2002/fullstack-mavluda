# 📂 DTO

> 💎 **Mavluda Beauty - Luxury Professional Architecture**

### 📍 Breadcrumb Navigation
`. > backend > src > modules > booking > presentation > dto`

## 🎯 PURPOSE
This directory encapsulates `Presentation` level functionality within the Mavluda Beauty ecosystem, ensuring proper separation of concerns and architectural transparency.

**FSD / Architecture Layer:** `Presentation`

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    Root[dto]
    Root --> F0[📄 create-booking.dto.ts]
    Root --> F1[📄 update-booking.dto.ts]
```

## 📄 FILE REGISTRY

| Item Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
| `📄 create-booking.dto.ts` | `.ts` | DTO definitions | `None` |
| `📄 update-booking.dto.ts` | `.ts` | DTO definitions | `@nestjs/mapped-types` |

## 🔗 DEPENDENCIES
- `@nestjs/mapped-types`

## 🛠️ USAGE
```typescript
// Example usage context
import { ... } from './create-booking.dto';

// Integrate create-booking.dto logic into your feature.
```
