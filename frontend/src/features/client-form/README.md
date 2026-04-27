# 📁 client-form

[Root](/.) > [frontend](/frontend) > [src](/frontend/src) > [features](/frontend/src/features) > [client-form](/frontend/src/features/client-form)

**FSD Layer:** Feature

## 🎯 Purpose
Frontend UI components containing template structures, styling, and specific behavioral logic.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 client-form"]
  Root --> client_form_component_html["📄 client-form.component.html"]
  Root --> client_form_component_ts["📄 client-form.component.ts"]
  Root --> index_ts["📄 index.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `client-form.component.html` | Template | Structural template and layout for client-form.component.html. | N/A |
| `client-form.component.ts` | TypeScript | UI component logic and state management for client-form.component.ts. | @angular, @entities, @shared |
| `index.ts` | TypeScript | Provides core logic and orchestration for index.ts. | N/A |

## 🔗 Dependencies
- `@angular/common`
- `@angular/core`
- `@angular/forms`
- `@entities/user`
- `@shared/lib`

## 🛠️ Usage
```html
<!-- Example usage in a parent component template -->
<app-component-selector></app-component-selector>
```
