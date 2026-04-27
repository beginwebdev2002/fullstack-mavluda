# 📁 auth

[Root](/.) > [backend](/backend) > [src](/backend/src) > [modules](/backend/src/modules) > [auth](/backend/src/modules/auth)

## 🎯 Purpose
Backend module defining application routes, business logic, and data access for the domain.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 auth"]
  Root --> dto["📁 dto"]
  Root --> infrastructure["📁 infrastructure"]
  Root --> interfaces["📁 interfaces"]
  Root --> auth_controller_ts["📄 auth.controller.ts"]
  Root --> auth_module_ts["📄 auth.module.ts"]
  Root --> auth_service_ts["📄 auth.service.ts"]
  Root --> index_ts["📄 index.ts"]
  Root --> telegram_auth_service_ts["📄 telegram-auth.service.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `auth.controller.ts` | TypeScript | Handles incoming HTTP requests and routing for auth.controller.ts. | @common |
| `auth.module.ts` | TypeScript | Defines the architectural module boundaries for auth.module.ts. | @common, @modules, @nestjs |
| `auth.service.ts` | TypeScript | Encapsulates business logic and data access for auth.service.ts. | @modules, @nestjs |
| `index.ts` | TypeScript | Provides core logic and orchestration for index.ts. | N/A |
| `telegram-auth.service.ts` | TypeScript | Encapsulates business logic and data access for telegram-auth.service.ts. | @common, @modules, @nestjs |

## 🔗 Dependencies
- `./auth.controller`
- `./auth.service`
- `./dto/login.dto`
- `./dto/register.dto`
- `./infrastructure/jwt.strategy`
- `./interfaces/auth-response.interface`
- `./telegram-auth.service`
- `@common/config/app-config.module`
- `@common/config/app-config.service`
- `@common/decorators/public.decorator`
- `@modules/user`
- `@nestjs/common`
- `@nestjs/jwt`
- `@nestjs/passport`
- `bcrypt`
- `crypto`

## 🛠️ Usage
```typescript
import { Module } from '@nestjs/common';
// Import specific services/controllers provided by this module
```
