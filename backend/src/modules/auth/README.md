# 🏷️ Auth

[🏠 Home](../../../../README.md) ❯ [backend](../../../README.md) ❯ [src](../../README.md) ❯ [modules](../README.md) ❯ **auth**

**FSD Layer:** `App`

## 🎯 PURPOSE
Core implementation for the auth domain within the luxury Mavluda Beauty ecosystem.

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    f_auth["📁 auth"]
    f_auth --> f_auth_module_ts["📄 auth.module.ts"]
    f_auth --> f_auth_service_ts["📄 auth.service.ts"]
    f_auth --> f_telegram_auth_service_ts["📄 telegram-auth.service.ts"]
    f_auth --> f_index_ts["📄 index.ts"]
    f_auth --> f_auth_controller_ts["📄 auth.controller.ts"]
    f_auth --> f_infrastructure["📁 infrastructure"]
    f_auth --> f_dto["📁 dto"]
    f_auth --> f_interfaces["📁 interfaces"]
```


## 📄 FILE REGISTRY
| Entry Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `📁 infrastructure` | Directory | Contains child logic and structural domains | None |
| `📁 dto` | Directory | Contains child logic and structural domains | None |
| `📁 interfaces` | Directory | Contains child logic and structural domains | None |
| `📄 auth.module.ts` | Module | Classes: AuthModule | @nestjs/common, @common/config/app-config.module, @modules/user, @nestjs/passport, @nestjs/jwt, @common/config/app-config.service |
| `📄 auth.service.ts` | Service | Classes: AuthService | @nestjs/common, @nestjs/jwt, @modules/user, @common/config/app-config.service |
| `📄 telegram-auth.service.ts` | Service | Classes: TelegramAuthService | @nestjs/common, @common/config/app-config.service, @modules/user |
| `📄 index.ts` | Logic/Utility | Structural or configuration definitions. | None |
| `📄 auth.controller.ts` | Controller | Classes: AuthController | @nestjs/common, @common/decorators/public.decorator |


## 🔗 DEPENDENCIES
- `@nestjs/common`
- `@common/config/app-config.module`
- `@modules/user`
- `@common/decorators/public.decorator`
- `@nestjs/passport`
- `@nestjs/jwt`
- `@common/config/app-config.service`

## 🛠️ USAGE
Explore the files and directories within this path to understand the refined logic that powers the Mavluda Beauty experience. Refer to the specific classes and functions outlined in the registry for implementation details.
