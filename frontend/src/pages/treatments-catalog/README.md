# 📁 treatments-catalog

[Root](/.) > [frontend](/frontend) > [src](/frontend/src) > [pages](/frontend/src/pages) > [treatments-catalog](/frontend/src/pages/treatments-catalog)

**FSD Layer:** Page

## 🎯 Purpose
Frontend UI components containing template structures, styling, and specific behavioral logic.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 treatments-catalog"]
  Root --> index_ts["📄 index.ts"]
  Root --> treatments_catalog_component_html["📄 treatments-catalog.component.html"]
  Root --> treatments_catalog_component_scss["📄 treatments-catalog.component.scss"]
  Root --> treatments_catalog_component_ts["📄 treatments-catalog.component.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `index.ts` | TypeScript | Provides core logic and orchestration for index.ts. | N/A |
| `treatments-catalog.component.html` | Template | Structural template and layout for treatments-catalog.component.html. | N/A |
| `treatments-catalog.component.scss` | Stylesheet | Luxury styling and visual presentation for treatments-catalog.component.scss. | N/A |
| `treatments-catalog.component.ts` | TypeScript | UI component logic and state management for treatments-catalog.component.ts. | @angular, @entities, @environments, @shared |

## 🔗 Dependencies
- `@angular/common`
- `@entities/admin-settings`
- `@entities/treatments`
- `@environments/environment`
- `@shared/lib`

## 🛠️ Usage
```html
<!-- Example usage in a parent component template -->
<app-component-selector></app-component-selector>
```
