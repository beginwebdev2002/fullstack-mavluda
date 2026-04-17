# [root](/) / [frontend](/frontend) / [src](/frontend/src) / [shared](/frontend/src/shared) / [pipes](/frontend/src/shared/pipes)

## 🏷️ 📁 Pipes

### 🎯 PURPOSE
The `pipes` directory forms a critical foundation within the Mavluda Beauty ecosystem, meticulously orchestrating the pipes logic to ensure a seamless and premium experience.

This directory resides within the **Shared** layer of our Feature Sliced Design (FSD) architecture, strictly adhering to Mavluda Beauty's robust separation of concerns.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  pipes[📁 pipes]
  pipes --> pipes_index_ts(index.ts)
  pipes --> pipes_safe_html_pipe_ts(safe-html.pipe.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `index.ts` | `ts` | Core logic implementation. | None |
| `safe-html.pipe.ts` | `ts` | Core logic implementation. | @angular |

### 🔗 DEPENDENCIES
- `./safe-html.pipe`
- `@angular/core`
- `@angular/platform-browser`

### 🛠️ USAGE
```typescript
// Seamlessly integrate pipes into your refined workflows:
import { /* exported members */ } from '@path/to/pipes';
```
