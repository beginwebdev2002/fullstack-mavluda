# 📂 LAYOUTS

> 💎 **Mavluda Beauty - Luxury Professional Architecture**

### 📍 Breadcrumb Navigation
`. > frontend > src > widgets > layouts`

## 🎯 PURPOSE
This directory encapsulates `Widgets` level functionality within the Mavluda Beauty ecosystem, ensuring proper separation of concerns and architectural transparency.

**FSD / Architecture Layer:** `Widgets`

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    Root[layouts]
    Root --> F0[📄 admin-layout.component.ts]
    Root --> F1[📄 index.ts]
    Root --> F2[📄 user-layout.component.ts]
    Root --> F3[📄 admin-layout.component.scss]
    Root --> F4[📄 admin-layout.component.html]
    Root --> F5[📄 user-layout.component.scss]
    Root --> F6[📄 user-layout.component.html]
```

## 📄 FILE REGISTRY

| Item Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
| `📄 admin-layout.component.ts` | `.ts` | Component logic | `@widgets/header, @angular/core, @angular/router, @widgets/sidebar` |
| `📄 index.ts` | `.ts` | General functionality | `None` |
| `📄 user-layout.component.ts` | `.ts` | Component logic | `@angular/core, @angular/router, @angular/common` |
| `📄 admin-layout.component.scss` | `.scss` | Component logic | `None` |
| `📄 admin-layout.component.html` | `.html` | Component logic | `None` |
| `📄 user-layout.component.scss` | `.scss` | Component logic | `None` |
| `📄 user-layout.component.html` | `.html` | Component logic | `None` |

## 🔗 DEPENDENCIES
- `@widgets/header`
- `@angular/core`
- `@widgets/sidebar`
- `@angular/common`
- `@angular/router`

## 🛠️ USAGE
```typescript
// Example usage context
import { ... } from './admin-layout.component';

// Integrate admin-layout.component logic into your feature.
```
