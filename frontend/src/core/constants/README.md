# 📂 CONSTANTS

> 💎 **Mavluda Beauty - Luxury Professional Architecture**

### 📍 Breadcrumb Navigation
`. > frontend > src > core > constants`

## 🎯 PURPOSE
This directory encapsulates `General` level functionality within the Mavluda Beauty ecosystem, ensuring proper separation of concerns and architectural transparency.

**FSD / Architecture Layer:** `General`

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    Root[constants]
    Root --> F0[📄 api-endpoints.ts]
    Root --> F1[📄 index.ts]
```

## 📄 FILE REGISTRY

| Item Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
| `📄 api-endpoints.ts` | `.ts` | General functionality | `@shared/lib` |
| `📄 index.ts` | `.ts` | General functionality | `None` |

## 🔗 DEPENDENCIES
- `@shared/lib`

## 🛠️ USAGE
```typescript
// Example usage context
import { ... } from './api-endpoints';

// Integrate api-endpoints logic into your feature.
```
