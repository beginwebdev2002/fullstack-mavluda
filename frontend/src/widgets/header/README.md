# 📁 Header Directory

[frontend](/frontend) > [src](/frontend/src) > [widgets](/frontend/src/widgets) > [header](/frontend/src/widgets/header)

## 🎯 Purpose
A high-level module handling `header` logic within the Mavluda Beauty ecosystem. This directory adheres to our "Luxury Professional" architectural standards.

**FSD Layer:** Widgets


## 🏗️ Architecture
```mermaid
graph TD
    header[header] --> Files
```


## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
| `header.component.html` | Template | Angular UI standalone component logic. | None |
| `header.component.scss` | Style | Angular UI standalone component logic. | None |
| `header.component.ts` | Component | Angular UI standalone component logic. | @features/language-selection, @angular/core, @angular/router, @angular/common |
| `index.ts` | TypeScript | Provides localized typescript definitions. | None |

## 🔗 Dependencies
- `@angular/common`
- `@angular/core`
- `@angular/router`
- `@features/language-selection`

## 🛠️ Usage
```typescript
// Architectural overview snippet
import { InternalLogic } from './internal-file';
// Ensure adherence to Hexagonal / FSD principles
```
