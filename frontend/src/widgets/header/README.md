# [root](/) / [frontend](/frontend) / [src](/frontend/src) / [widgets](/frontend/src/widgets) / [header](/frontend/src/widgets/header)

## 🏷️ 📁 Header

### 🎯 PURPOSE
The `header` directory forms a critical foundation within the Mavluda Beauty ecosystem, meticulously orchestrating the header logic to ensure a seamless and premium experience.

This directory resides within the **Widgets** layer of our Feature Sliced Design (FSD) architecture, strictly adhering to Mavluda Beauty's robust separation of concerns.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  header[📁 header]
  header --> header_header_component_html(header.component.html)
  header --> header_header_component_scss(header.component.scss)
  header --> header_header_component_ts(header.component.ts)
  header --> header_index_ts(index.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `header.component.html` | `html` | UI template and styling. | None |
| `header.component.scss` | `scss` | UI template and styling. | None |
| `header.component.ts` | `ts` | UI component logic and rendering. | @angular, @features |
| `index.ts` | `ts` | Core logic implementation. | None |

### 🔗 DEPENDENCIES
- `./header.component`
- `@angular/common`
- `@angular/core`
- `@angular/router`
- `@features/language-selection`

### 🛠️ USAGE
```typescript
// Seamlessly integrate header into your refined workflows:
import { /* exported members */ } from '@path/to/header';
```
