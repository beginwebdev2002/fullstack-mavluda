# 💎 Mavluda Beauty & Aliya Wedding Room

This project is a high-end management system for a luxury beauty salon (**Mavluda Azizova Beauty House**) and a wedding dress rental service (**Aliya Wedding Room**). Every aspect of the system must reflect the premium nature of these services.

## 🏗️ Project Architecture

The project is structured as a monorepo with a dedicated backend and frontend.

### 🛡️ Backend (NestJS)
- **Architecture**: Hexagonal Architecture (Ports and Adapters).
- **Database**: MongoDB (via Mongoose).
- **Core Principles**:
    - **Domain Layer**: Pure business logic, no external dependencies (entities, value objects).
    - **Application Layer**: Use cases and business flows (booking, rental logic).
    - **Infrastructure Layer**: Framework-specific code, database adapters, external integrations (Instagram, SMS).
- **Key Modules**: `booking`, `inventory` (wedding dresses), `partnership` (influencers), `veil`, `gallery`, `payment`, `user`, `auth`.

### 🎨 Frontend (Angular)
- **Architecture**: Modern, Zoneless, Signal-based.
- **Change Detection**: Zoneless (`provideZonelessChangeDetection()`).
- **State Management**: Reactive signals (`signal`, `computed`, `effect`).
- **Components**: 100% Standalone components.
- **Styling**: Tailwind CSS for a modern, "alive" aesthetic.
- **Internationalization**: i18n support for English (en-US), Russian (ru), and Tajik (tg).

## 📁 Directory Overview

### Root
- `/backend`: NestJS API.
- `/frontend`: Angular SPA.
- `.agent/rules`: Architectural and development mandates.

### Backend Structure (`/backend/src`)
- `/*/domain`: Business entities and logic.
- `/*/application`: Use cases and services.
- `/*/infrastructure`: Controllers, repositories, and DTOs.
- `/*/presentation`: API endpoints (sometimes combined with infrastructure).
- `common/`: Shared config, database connection, decorators, and guards.

### Frontend Structure (`/frontend/src`)
- `pages/`: Route-level components.
- `features/`: Complex UI logic (e.g., auth, language selection).
- `entities/`: Data-focused components and services.
- `widgets/`: Independent, reusable UI blocks (header, sidebar, layouts).
- `shared/`: Generic UI components, pipes, services, and models.
- `core/`: Config, guards, and interceptors.

## 🚀 Key Commands

### Backend
- `npm run start:dev`: Run backend in development mode with watch.
- `npm run build`: Build the backend for production.
- `npm run lint`: Run ESLint with auto-fix.
- `npm run test`: Run unit tests.

### Frontend
- `npm run dev`: Run frontend development server (`ng serve`).
- `npm run build`: Build the frontend for production.
- `npm run preview`: Run production build preview.

## 📏 Development Conventions

### Backend Rules
1.  **Hexagonal Purity**: Infrastructure/Controllers -> Application -> Domain. The Domain must not import anything from other layers.
2.  **Module Aliases**: Use `@modules/*`, `@common/*`, etc., as defined in `tsconfig.json`.
3.  **Entity Mapping**: Every module must strictly map to business domains (e.g., `booking-module` for VIP scheduling).

### Frontend Rules
1.  **Zoneless Only**: Never rely on Zone.js. All UI updates must be triggered via signals or explicit change detection.
2.  **Signals over Observables**: Use `signal()` for state. Use `toSignal()` when dealing with HTTP calls if needed, but prefer signal-based state management.
3.  **Modern Syntax**:
    - Use `@if`, `@for`, `@switch` control flows.
    - Use `input()` and `output()` instead of `@Input()` and `@Output()`.
    - Use `inject()` for dependency injection instead of constructors.
4.  **Standalone**: All components, directives, and pipes must be standalone.

## 🛠️ Environment Setup
- **Node.js**: Modern LTS version recommended.
- **Database**: MongoDB instance required for the backend.
- **Environment Variables**: Managed via `.env` in the root and project-specific config files.
