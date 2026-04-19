# [root](/) / [frontend](/frontend) / [src](/frontend/src) / [pages](/frontend/src/pages) / [user-profile](/frontend/src/pages/user-profile)

## 🏷️ 📁 User-profile (Page Layer)

### 🎯 PURPOSE
The `user-profile` page component orchestrates the UI layer for the user-profile feature in the Mavluda Beauty frontend application.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  user_profile[📁 user-profile]
  user_profile --> user_profile_index_ts(index.ts)
  user_profile --> user_profile_user_profile_component_html(user-profile.component.html)
  user_profile --> user_profile_user_profile_component_scss(user-profile.component.scss)
  user_profile --> user_profile_user_profile_component_ts(user-profile.component.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `index.ts` | `ts` | Core logic implementation. | None |
| `user-profile.component.html` | `html` | UI template and styling. | None |
| `user-profile.component.scss` | `scss` | UI template and styling. | None |
| `user-profile.component.ts` | `ts` | UI component logic and rendering. | @angular, @entities |

### 🔗 DEPENDENCIES
- `./user-profile.component`
- `@angular/common`
- `@angular/core`
- `@entities/user`

### 🛠️ USAGE
```typescript
// Seamlessly integrate user-profile into your refined workflows:
import { /* exported members */ } from '@path/to/user-profile';
```
