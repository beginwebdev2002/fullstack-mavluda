# 📁 layouts

[Root](/.) > [frontend](/frontend) > [src](/frontend/src) > [widgets](/frontend/src/widgets) > [layouts](/frontend/src/widgets/layouts)

**FSD Layer:** Widget

## 🎯 Purpose
Frontend UI components containing template structures, styling, and specific behavioral logic.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 layouts"]
  Root --> admin_layout_component_html["📄 admin-layout.component.html"]
  Root --> admin_layout_component_scss["📄 admin-layout.component.scss"]
  Root --> admin_layout_component_ts["📄 admin-layout.component.ts"]
  Root --> index_ts["📄 index.ts"]
  Root --> user_layout_component_html["📄 user-layout.component.html"]
  Root --> user_layout_component_scss["📄 user-layout.component.scss"]
  Root --> user_layout_component_ts["📄 user-layout.component.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `admin-layout.component.html` | Template | Structural template and layout for admin-layout.component.html. | N/A |
| `admin-layout.component.scss` | Stylesheet | Luxury styling and visual presentation for admin-layout.component.scss. | N/A |
| `admin-layout.component.ts` | TypeScript | UI component logic and state management for admin-layout.component.ts. | @angular, @widgets |
| `index.ts` | TypeScript | Provides core logic and orchestration for index.ts. | N/A |
| `user-layout.component.html` | Template | Structural template and layout for user-layout.component.html. | N/A |
| `user-layout.component.scss` | Stylesheet | Luxury styling and visual presentation for user-layout.component.scss. | N/A |
| `user-layout.component.ts` | TypeScript | UI component logic and state management for user-layout.component.ts. | @angular |

## 🔗 Dependencies
- `@angular/common`
- `@angular/core`
- `@angular/router`
- `@widgets/header`
- `@widgets/sidebar`

## 🛠️ Usage
```html
<!-- Example usage in a parent component template -->
<app-component-selector></app-component-selector>
```
