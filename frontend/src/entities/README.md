# 📁 entities

[Root](/.) > [frontend](/frontend) > [src](/frontend/src) > [entities](/frontend/src/entities)

**FSD Layer:** Entity

## 🎯 Purpose
Data models, type definitions, schemas, and Data Transfer Objects (DTOs) for structural typing.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 entities"]
  Root --> admin-settings["📁 admin-settings"]
  Root --> gallery["📁 gallery"]
  Root --> treatments["📁 treatments"]
  Root --> user["📁 user"]
  Root --> veil["📁 veil"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|

## 🔗 Dependencies
- No external dependencies.

## 🛠️ Usage
```typescript
import { SpecificModel } from './models';
let data: SpecificModel;
```
