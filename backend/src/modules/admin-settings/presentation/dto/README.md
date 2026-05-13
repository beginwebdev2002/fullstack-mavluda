[🏠 Home](../../../../../../README.md) > [backend](../../../../../README.md) > [src](../../../../README.md) > [modules](../../../README.md) > [admin-settings](../../README.md) > [presentation](../README.md) > [dto](./README.md)

# 📁 dto

### 🎯 PURPOSE
Welcome to the exquisite **dto** module of the Mavluda Beauty ecosystem. This directory handles specific domain assets and logic. It is designed adhering to our 'Luxury Professional' standards.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  Root_dto["📁 dto"]
  f_create_admin_settings_dto_ts["create-admin-settings.dto.ts"]
  Root_dto --> f_create_admin_settings_dto_ts
  f_update_admin_settings_dto_ts["update-admin-settings.dto.ts"]
  Root_dto --> f_update_admin_settings_dto_ts
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `create-admin-settings.dto.ts` | TypeScript File | Defines classes: LocationDto, OwnerInfoDto, CreateAdminSettingsDto. | None |
| `update-admin-settings.dto.ts` | TypeScript File | Defines classes: UpdateAdminSettingsDto. | @nestjs |

### 🔗 DEPENDENCIES
- `@nestjs/mapped-types`
- `class-transformer`

### 🛠️ USAGE
```typescript
// Example interaction or integration snippet
// Import members from dto based on module boundaries
```
