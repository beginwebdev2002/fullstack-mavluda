# [root](/) / [frontend](/frontend) / [src](/frontend/src) / [widgets](/frontend/src/widgets) / [header](/frontend/src/widgets/header)

## 🏷️ 📁 Header (Widget Layer)

### 🎯 PURPOSE
The `header` directory handles frontend architecture and configuration for the Mavluda Beauty platform.

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
