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
