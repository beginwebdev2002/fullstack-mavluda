# [root](/) / [frontend](/frontend) / [src](/frontend/src) / [core](/frontend/src/core) / [constants](/frontend/src/core/constants)

## 🏷️ 📁 Constants

### 🎯 PURPOSE
The `constants` directory handles frontend architecture and configuration for the Mavluda Beauty platform.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  constants[📁 constants]
  constants --> constants_api_endpoints_ts(api-endpoints.ts)
  constants --> constants_index_ts(index.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `api-endpoints.ts` | `ts` | Core logic implementation. | @shared |
| `index.ts` | `ts` | Core logic implementation. | None |

### 🔗 DEPENDENCIES
- `./api-endpoints`
- `@shared/lib`

### 🛠️ USAGE
```typescript
// Seamlessly integrate constants into your refined workflows:
import { /* exported members */ } from '@path/to/constants';
```
