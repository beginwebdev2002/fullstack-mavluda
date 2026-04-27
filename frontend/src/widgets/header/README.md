# 📁 header

[Root](/.) > [frontend](/frontend) > [src](/frontend/src) > [widgets](/frontend/src/widgets) > [header](/frontend/src/widgets/header)

**FSD Layer:** Widget

## 🎯 Purpose
Frontend UI components containing template structures, styling, and specific behavioral logic.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 header"]
  Root --> header_component_html["📄 header.component.html"]
  Root --> header_component_scss["📄 header.component.scss"]
  Root --> header_component_ts["📄 header.component.ts"]
  Root --> index_ts["📄 index.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `header.component.html` | Template | Structural template and layout for header.component.html. | N/A |
| `header.component.scss` | Stylesheet | Luxury styling and visual presentation for header.component.scss. | N/A |
| `header.component.ts` | TypeScript | UI component logic and state management for header.component.ts. | @angular, @features |
| `index.ts` | TypeScript | Provides core logic and orchestration for index.ts. | N/A |

## 🔗 Dependencies
- `@angular/common`
- `@angular/core`
- `@angular/router`
- `@features/language-selection`

## 🛠️ Usage
```html
<!-- Example usage in a parent component template -->
<app-component-selector></app-component-selector>
```
