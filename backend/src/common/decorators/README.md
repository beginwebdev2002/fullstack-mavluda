# 📁 decorators

[Root](/.) > [backend](/backend) > [src](/backend/src) > [common](/backend/src/common) > [decorators](/backend/src/common/decorators)

## 🎯 Purpose
Delivering luxury-tier architectural components and high-performance logic for the **decorators** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 decorators"]
  Root --> publicdecoratorts["📄 public.decorator.ts"]
  Root --> rolesdecoratorts["📄 roles.decorator.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `public.decorator.ts` | File | Core logic and utilities for this domain. | @nestjs |
| `roles.decorator.ts` | File | Core logic and utilities for this domain. | @nestjs |


## 🔗 Dependencies
- `@nestjs/common`

## 🛠️ Usage
```typescript
// Example usage within the Mavluda Beauty ecosystem
import { relevantMember } from './public.decorator';

// Integrate into the application architecture
relevantMember.execute();
```
