<!--
Mavluda Beauty - Luxury Professional Documentation
Generated for 100% Architectural Transparency
-->
[Home](../../../../README.md) > [frontend](../../../README.md) > [src](../../README.md) > [pages](../README.md) > [settings](./README.md)

# 📁 SETTINGS Directory

> **FSD Layer:** Pages

## 🎯 PURPOSE
Represents full application views and routes orchestrating widgets and features.

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    Root["📁 settings"]
    Root --> Sub_ui["📁 ui"]
    Root --> File_index_ts["📄 index.ts"]
    Root --> File_settings_component_html["📄 settings.component.html"]
    Root --> File_settings_component_scss["📄 settings.component.scss"]
    Root --> File_settings_component_ts["📄 settings.component.ts"]
```

## 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `index.ts` | TypeScript | Core logic implementation. | - |
| `settings.component.html` | HTML Template | UI rendering and component logic. | - |
| `settings.component.scss` | Styles | UI rendering and component logic. | - |
| `settings.component.ts` | TypeScript | UI rendering and component logic. | @angular, @entities, @shared |


## 🔗 DEPENDENCIES
- `@angular/core`
- `@angular/common`
- `@angular/forms`
- `@entities/admin-settings`
- `@shared/models/admin-settings.model`
- `./ui/business-profile.component`
- `./ui/social-matrix.component`
- `./ui/general-info.component`
- `./ui/additional-links.component`
- `./ui/selects-settings.component`

## 🛠️ USAGE
```typescript
// Example placeholder for interacting with settings
// Consult the individual files in the registry for specific APIs.
```
