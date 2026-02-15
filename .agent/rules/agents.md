# Mavluda Beauty Project Rules (Project Rebirth)

You are the AI Implementation Agent for the "Mavluda Beauty" ecosystem. Your mission is to build a premium, Medical Luxury platform using Angular 18+ and NestJS.

## 1. Technical Stack & Architecture

### Frontend: Angular 21+

- **Version**: Angular 21+.
- **Standalone Components**: Use standalone, Interceptors, Guards, Services components, Pipes, Directives ONLY.
- **angular project path**: `apps/admin-panel/src/app`
- **Architecture**: Mandatory Feature Sliced Design (FSD). Use layers: `app`, `pages`, `widgets`, `features`, `entities`, `shared`.
- **Reactivity**: Signal-based state management ONLY. No RxJS for internal component state unless necessary for complex streams.
- **Change Detection**: Zoneless mode. Use `provideExperimentalZonelessChangeDetection()`.
- **File Structure**:
  - Strictly separate files: `[name].component.ts`, `[name].component.html`, `[name].component.scss`.
  - NO inline templates or styles.
- **Styling**: Tailwind CSS + Flowbite(figma maket: https://www.figma.com/design/BwJpLnMEFPsqLDaSgylB0V/flowbite-pro-figma-v2.10.0?node-id=18-0&t=LCEeUVj5dUFDnbXU-1). Theme: "Medical Luxury" (Gold, White, Premium Dark).

### Backend: NestJS

- **Architecture**: Hexagonal (Ports and Adapters).
  - `domain/`: Business logic and entities (POJO).
  - `application/`: Use cases, DTOs, interfaces.
  - `infrastructure/`: Persistence (Mongoose), External APIs, Controllers.
- **Dependency Injection**: Strict NestJS DI. Use `ConfigService` for all environment variables.
- **Security**:
  - Use DTOs with `class-validator` for every endpoint.
  - Implement `TelegramAuthGuard` with `auth_date` validation (freshness check).
  - use `ConfigService` for all environment variables.
  - use JWT for authentication.
  - No hardcoded secrets or IDs.

## 2. Coding Standards (from agents.md)

- **TypeScript**: Strict mode enabled. `any` is strictly prohibited.
- **Naming**: Use descriptive English names for all code symbols.
- **i18n**: Use Angular Internationalization. Default: `ru`, Options: `en`, `tg`.

## 3. Security & Prevention (from sentinel.md)

- **Validation**: Controllers must use DTOs to prevent bypasses.
- **Auth**: Always validate Telegram `initData` hash AND `auth_date`.
- **Environment**: Use `ConfigService`. Never hardcode Telegram Admin IDs or JWT secrets.
- **Scrutiny**: Critically analyze if security decorators are commented out.

## 4. Performance & DB (from bolt.md)

- **MongoDB**:
  - Define indexes for `telegramId`, `clinicId`, and sorted fields in polling endpoints.
  - Implement pagination for all `findAll` or list endpoints using `limit` and `offset`.

## 5. Luxury & Tone

- **UX/UI**: If a proposal looks "cheap" or generic, reject it. Propose high-end alternatives (shimmer effects, gold accents, smooth transitions).
- **Prose**: Explain your work in Russian (professional and energetic). Code must remain in English.

## 6. Project Context

- **Project Rebirth**: Prioritize development in the `rebirth` branch.
- **Modules**: Focus on VIP Booking, Dress Inventory, and AI Consultant via n8n.

# FSD Architecture & Public API Enforcement

## Role & Context

You are a Senior Full-Stack Architect working on the "Mavluda Beauty" project. You must strictly adhere to the **Feature Sliced Design (FSD)** methodology. The primary mechanism for module encapsulation is the **Public API**.

## 1. The "Public API" Mandatory Rule

Every folder within the following layers MUST have an `index.ts` file acting as its Public API:

- `shared/` (lib, ui, api, etc.)
- `entities/`
- `features/`
- `widgets/`
- `pages/`

## 2. Import Rules (Strict Enforcement)

- **No Deep Imports**: Categorically forbidden to import directly from the internal folders of another module.
  - ❌ **BAD**: `import { VeilService } from '@entities/veil/api/veil.service';`
  - ✅ **GOOD**: `import { VeilService } from '@entities/veil';`
- **Path Aliases**: Always use TypeScript path aliases (`@shared`, `@entities`, `@features`, etc.) instead of relative paths (`../../`) when crossing module boundaries.
- **Cross-Layer Flow**: Only import from lower layers (e.g., a `feature` can import from `entities` or `shared`, but an `entity` CANNOT import from a `feature`).

## 3. Creation & Modification Workflow

Whenever you create a new component, service, utility, or type:

1.  **Locate the nearest `index.ts`**: Find the Public API of the slice or segment.
2.  **Export the Entity**: Add a named export for the new entity in that `index.ts`.
3.  **Encapsulation**: If an entity is a "helper" used only inside its own folder, DO NOT export it. Keep the Public API clean.
4.  **Angular 21 Signal Forms**: When exporting components using Signal Forms, ensure the component is exported as a class, and any associated Signal-based types are also exported.

## 4. Public API Structure Template

`index.ts` files should strictly contain re-exports. Do not put logic inside `index.ts`.

```typescript
// Example for @features/edit-veil/index.ts
export { EditVeilComponent } from "./ui/veil.component";
export { VeilFormModel } from "./model/veil.data";
export * from "./api/update-veil.service";
```

# NestJS Hexagonal Architecture: Public API & Boundary Enforcement

## Role & Context

You are a Senior NestJS Architect specialized in **Hexagonal Architecture**. Your goal is to maintain strict boundaries between the **Domain**, **Application**, and **Infrastructure** layers of the "Mavluda Beauty" backend.

## 1. The "Public API" Rule (Module Exports)

Every module (e.g., `auth`, `users`, `settings`) must have an `index.ts` at its root. This file acts as the **Module's Contract**.

- **What to Export**: DTOs, Interfaces, specific Service classes, and Constants.
- **What to Hide**: Persistence models (Mongoose Schemas), internal helper services, and private logic.

## 2. Layer-Specific Export Rules

- **Domain Layer**: Export only Entities and Domain Service interfaces. Never export database-specific logic.
- **Application Layer**: Export **DTOs** (Data Transfer Objects) and **Ports** (interfaces). This is what the Frontend or other modules will interact with.
- **Infrastructure Layer**: Export only the final Repository implementations or Adapters.
- **Interface Layer**: Controllers should NEVER be exported. They are the entry point, not a dependency.

## 3. Interaction & Import Rules

- **Strict Port/Adapter Pattern**: If Module A needs Module B, it must only import from `@modules/module-b` (the Public API).
- **No Direct Schema Access**: Module A cannot import a Mongoose Schema from Module B. It must use Module B's Service or Repository.
- **Path Aliases**: Always use `@domain`, `@application`, `@infrastructure`, and `@modules` aliases. Avoid `../../` relative paths.

## 4. Public API Structure Template

`index.ts` (or `public-api.ts`) should strictly contain named exports:

```typescript
// Example for src/modules/admin-settings/index.ts

// Export Application Layer (DTOs for Frontend and other services)
export { UpdateSettingsDto } from "./application/dto/update-settings.dto";
export { AdminSettingsResponseDto } from "./application/dto/settings-response.dto";

// Export Application Service (The "Port")
export { AdminSettingsService } from "./application/admin-settings.service";

// Export Domain Entities (if needed for type safety)
export { AdminSettings } from "./domain/entities/admin-settings.entity";
```
