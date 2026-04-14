<!--
Mavluda Beauty - Luxury Professional Documentation
Generated for 100% Architectural Transparency
-->
[Home](../../../../README.md) > [frontend](../../../README.md) > [src](../../README.md) > [entities](../README.md) > [user](./README.md)

# 👤 USER Directory

> **FSD Layer:** Entities

## 🎯 PURPOSE
Manages business entities, models, and core state related to specific domain objects.

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    Root["📁 user"]
    Root --> Sub_constants["📁 constants"]
    Root --> Sub_model["📁 model"]
    Root --> File_auth_service_ts["📄 auth.service.ts"]
    Root --> File_index_ts["📄 index.ts"]
    Root --> File_user_service_ts["📄 user.service.ts"]
```

## 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `auth.service.ts` | TypeScript | Business logic and service orchestration. | @angular |
| `index.ts` | TypeScript | Core logic implementation. | - |
| `user.service.ts` | TypeScript | Business logic and service orchestration. | @angular |


## 🔗 DEPENDENCIES
- `@angular/core`
- `@angular/common/http`
- `@angular/router`
- `rxjs/operators`
- `./model/user.model`
- `jwt-decode`
- `rxjs`

## 🛠️ USAGE
```typescript
// Example placeholder for interacting with user
// Consult the individual files in the registry for specific APIs.
```
