# 📁 decorators

[Root](/.) > [backend](/backend) > [src](/backend/src) > [common](/backend/src/common) > [decorators](/backend/src/common/decorators)

## 🎯 Purpose
Delivering luxury-tier architectural components and high-performance logic for the **decorators** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience.

## 🏗️ Architecture
```mermaid
graph TD
  Root["📁 decorators"]
  Root --> public_decorator_ts["📄 public.decorator.ts"]
  Root --> roles_decorator_ts["📄 roles.decorator.ts"]
```

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `public.decorator.ts` | TypeScript | Handles logic and definitions for public.decorator.ts | @nestjs/common |
| `roles.decorator.ts` | TypeScript | Handles logic and definitions for roles.decorator.ts | @nestjs/common |

## 🔗 Dependencies
- `@nestjs/common`

## 🛠️ Usage
```typescript
// Example usage within the Mavluda Beauty ecosystem
import { relevantMember } from './decorators';

// Integrate into the application architecture
relevantMember.execute();
```
