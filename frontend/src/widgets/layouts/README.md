# 🏷️ Layouts

[🏠 Home](../../../../README.md) ❯ [frontend](../../../README.md) ❯ [src](../../README.md) ❯ [widgets](../README.md) ❯ **layouts**

**FSD Layer:** `Widgets`

## 🎯 PURPOSE
Core implementation for the layouts domain within the luxury Mavluda Beauty ecosystem.

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    f_layouts["📁 layouts"]
    f_layouts --> f_admin_layout_component_ts["📄 admin-layout.component.ts"]
    f_layouts --> f_index_ts["📄 index.ts"]
    f_layouts --> f_user_layout_component_ts["📄 user-layout.component.ts"]
    f_layouts --> f_admin_layout_component_scss["📄 admin-layout.component.scss"]
    f_layouts --> f_admin_layout_component_html["📄 admin-layout.component.html"]
    f_layouts --> f_user_layout_component_scss["📄 user-layout.component.scss"]
    f_layouts --> f_user_layout_component_html["📄 user-layout.component.html"]
```


## 📄 FILE REGISTRY
| Entry Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `📄 admin-layout.component.ts` | Component | Classes: AdminLayoutComponent | @angular/core, @widgets/header, @widgets/sidebar, @angular/router |
| `📄 index.ts` | Logic/Utility | Structural or configuration definitions. | None |
| `📄 user-layout.component.ts` | Component | Classes: UserLayoutComponent | @angular/core, @angular/router, @angular/common |
| `📄 admin-layout.component.scss` | Style | Structural or configuration definitions. | None |
| `📄 admin-layout.component.html` | Template | Structural or configuration definitions. | None |
| `📄 user-layout.component.scss` | Style | Structural or configuration definitions. | None |
| `📄 user-layout.component.html` | Template | Structural or configuration definitions. | None |


## 🔗 DEPENDENCIES
- `@angular/common`
- `@widgets/sidebar`
- `@angular/core`
- `@widgets/header`
- `@angular/router`

## 🛠️ USAGE
Explore the files and directories within this path to understand the refined logic that powers the Mavluda Beauty experience. Refer to the specific classes and functions outlined in the registry for implementation details.
