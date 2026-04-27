# 📁 user-profile

[Root](/.) > [frontend](/frontend) > [src](/frontend/src) > [pages](/frontend/src/pages) > [user-profile](/frontend/src/pages/user-profile)

**FSD Layer:** Page

## 🎯 Purpose
Frontend UI components containing template structures, styling, and specific behavioral logic.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 user-profile"]
  Root --> index_ts["📄 index.ts"]
  Root --> user_profile_component_html["📄 user-profile.component.html"]
  Root --> user_profile_component_scss["📄 user-profile.component.scss"]
  Root --> user_profile_component_ts["📄 user-profile.component.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `index.ts` | TypeScript | Provides core logic and orchestration for index.ts. | N/A |
| `user-profile.component.html` | Template | Structural template and layout for user-profile.component.html. | N/A |
| `user-profile.component.scss` | Stylesheet | Luxury styling and visual presentation for user-profile.component.scss. | N/A |
| `user-profile.component.ts` | TypeScript | UI component logic and state management for user-profile.component.ts. | @angular, @entities |

## 🔗 Dependencies
- `@angular/common`
- `@angular/forms`
- `@entities/user`

## 🛠️ Usage
```html
<!-- Example usage in a parent component template -->
<app-component-selector></app-component-selector>
```
