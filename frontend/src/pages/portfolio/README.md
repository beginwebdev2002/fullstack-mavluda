# 📁 portfolio

[Root](/.) > [frontend](/frontend) > [src](/frontend/src) > [pages](/frontend/src/pages) > [portfolio](/frontend/src/pages/portfolio)

**FSD Layer:** Page

## 🎯 Purpose
Frontend UI components containing template structures, styling, and specific behavioral logic.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 portfolio"]
  Root --> index_ts["📄 index.ts"]
  Root --> portfolio_component_html["📄 portfolio.component.html"]
  Root --> portfolio_component_scss["📄 portfolio.component.scss"]
  Root --> portfolio_component_ts["📄 portfolio.component.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `index.ts` | TypeScript | Provides core logic and orchestration for index.ts. | N/A |
| `portfolio.component.html` | Template | Structural template and layout for portfolio.component.html. | N/A |
| `portfolio.component.scss` | Stylesheet | Luxury styling and visual presentation for portfolio.component.scss. | N/A |
| `portfolio.component.ts` | TypeScript | UI component logic and state management for portfolio.component.ts. | @angular, @entities, @environments, @shared |

## 🔗 Dependencies
- `@angular/common`
- `@entities/admin-settings`
- `@entities/gallery`
- `@environments/environment`
- `@shared/lib`

## 🛠️ Usage
```html
<!-- Example usage in a parent component template -->
<app-component-selector></app-component-selector>
```
