# 🏷️ Dto

[🏠 Home](../../../../../../README.md) ❯ [backend](../../../../../README.md) ❯ [src](../../../../README.md) ❯ [modules](../../../README.md) ❯ [admin-settings](../../README.md) ❯ [presentation](../README.md) ❯ **dto**

**FSD Layer:** `App`

## 🎯 PURPOSE
Core implementation for the dto domain within the luxury Mavluda Beauty ecosystem.

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    f_dto["📁 dto"]
    f_dto --> f_create_admin_settings_dto_ts["📄 create-admin-settings.dto.ts"]
    f_dto --> f_update_admin_settings_dto_ts["📄 update-admin-settings.dto.ts"]
```


## 📄 FILE REGISTRY
| Entry Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `📄 create-admin-settings.dto.ts` | Logic/Utility | Classes: LocationDto, OwnerInfoDto, CreateAdminSettingsDto | None |
| `📄 update-admin-settings.dto.ts` | Logic/Utility | Classes: UpdateAdminSettingsDto | @nestjs/mapped-types |


## 🔗 DEPENDENCIES
- `@nestjs/mapped-types`

## 🛠️ USAGE
Explore the files and directories within this path to understand the refined logic that powers the Mavluda Beauty experience. Refer to the specific classes and functions outlined in the registry for implementation details.
