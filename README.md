<p align="center">
  <strong>⚒️ Project Forge</strong><br/>
  <em>Proprietary Delivery Engine — Full-Stack Golden Path</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white" alt=".NET 8" />
  <img src="https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Nx-Workspace-143055?logo=nx&logoColor=white" alt="Nx Workspace" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

---

## Overview

**Project Forge: A custom full-stack monorepo architecture designed to accelerate end-to-end feature delivery, ensuring strict type safety from the C# backend to the Next.js UI.**

This is not just a generic template; it is a proprietary delivery engine. By unifying the backend (.NET Minimal API) and frontend (Next.js) under **Nx**, it natively manages the dependency graph, computation caching, and affected-builds far better than manual scripts or YAML path filters.

---

## Architecture

```
ProjectForge/
├── apps/
│   ├── api/                  # ASP.NET Core 8 Minimal API
│   │   ├── Controllers/      # (Optional) route grouping
│   │   ├── Models/            # Domain & DTO models
│   │   ├── Services/          # Business logic layer
│   │   ├── Program.cs         # App entry point & DI registration
│   │   ├── appsettings.json   # Runtime configuration
│   │   └── Api.csproj         # Project manifest
│   │
│   └── web/                  # Next.js / React Frontend
│       ├── public/            # Static assets
│       ├── src/
│       │   ├── app/           # App Router pages & layouts
│       │   ├── components/    # Reusable UI components
│       │   ├── lib/           # Utilities & API clients
│       │   └── styles/        # Global & module CSS
│       ├── package.json
│       ├── next.config.js
│       └── tsconfig.json
│
├── packages/
│   ├── ui/                   # Shared UI component library
│   ├── config/               # Shared ESLint, Prettier, TS configs
│   └── types/                # Shared TypeScript type definitions
│
├── docs/
│   ├── architecture.md       # ADRs & system design decisions
│   ├── runbook.md            # Operational playbook
│   └── onboarding.md         # Developer getting-started guide
│
├── .github/
│   ├── workflows/
│   │   └── ci.yml            # Nx Graph-Aware CI pipeline
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
│
├── .gitignore                # .NET + Node.js + OS artifacts
├── README.md                 # ← You are here
└── LICENSE
```

### Design Principles

| Principle                  | Implementation                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| **Atomic Commits**         | API + Web changes land in a single PR — no cross-repo sync                                        |
| **Graph-Aware CI**         | Nx calculates affected dependencies, ensuring CI only builds and tests what you actually changed. |
| **Shift-Left Quality**     | Husky & lint-staged strictly enforce dotnet format, Prettier, and ESLint at the pre-commit layer. |
| **Shared Packages**        | Types, configs, and UI components live in `/packages` — DRY                                       |
| **Convention Over Config** | Predictable directory structure reduces onboarding friction                                       |
| **Environment Parity**     | `.env.example` files document every required variable                                             |

## Nx & Day Zero OpenAPI Type Safety

The CI pipeline implements a robust mechanism powered by **Nx** and **Orval** to ensure complete alignment between the backend and frontend.

### How It Works

1. **Nx Affected Builds:** Instead of manual YAML path filters, Nx intelligently calculates the dependency graph. It only builds, tests, and lints the projects affected by your commit.
2. **Day Zero OpenAPI Generation:**
   - The .NET Minimal API generates a `swagger.json` (OpenAPI spec) at build time.
   - The Next.js frontend uses Orval to automatically generate strongly-typed API hooks (SWR/React Query) directly from this Swagger output.
3. **Strict Type-Mapping Gate:**
   - A pull request is **not allowed to merge** unless the frontend types map perfectly to the backend. The pipeline validates that the generated frontend hooks exactly match the latest C# API models.

```
Push to main/develop or PR opened
        │
        └─── Nx Affected Computations
                │
                ├─── .NET API Build ──> Generates api.json (OpenAPI)
                │
                ├─── Web App Build ──> Runs Orval to generate hooks
                │
                └─── Strict Type Gate ──> Fails if API models don't match frontend types
```

---

## Getting Started

### Prerequisites

| Tool                                              | Version | Purpose                        |
| ------------------------------------------------- | ------- | ------------------------------ |
| [.NET SDK](https://dotnet.microsoft.com/download) | 8.0+    | Backend runtime                |
| [Node.js](https://nodejs.org/)                    | 20 LTS  | Frontend runtime               |
| [pnpm](https://pnpm.io/)                          | 8.0+    | Monorepo package manager       |
| [Git](https://git-scm.com/)                       | 2.40+   | Version control                |
| [Docker](https://www.docker.com/)                 | Latest  | Local orchestration (optional) |

### Instantiate a New Project

1. **Create from Template**
   - Click **"Use this template"** on GitHub, or:

   ```bash
   gh repo create my-new-project --template <your-username>/ProjectForge --private --clone
   cd my-new-project
   ```

2. **Bootstrap the Monorepo**

   ```bash
   # Install all dependencies across apps and packages
   pnpm install
   ```

3. **Start Development Servers**

   ```bash
   # Start the .NET API and Next.js frontend concurrently
   pnpm nx run-many -t serve -p api web
   # API is live at http://localhost:5001 (and Swagger at /swagger)
   # Web is live at http://localhost:3000
   ```

   **Alternative: Docker Compose**

   ```bash
   # Spin up the entire stack (API + Web)
   docker-compose up --build
   ```

4. **Rename & Configure**
   - Update `Api.csproj` namespace and `package.json` name
   - Copy `.env.example` → `.env` and fill in secrets
   - Update this README with your project-specific details

---

## Development Workflow

```bash
# Create a feature branch
git checkout -b feat/user-auth

# Make changes across the stack
#   apps/api/Services/AuthService.cs
#   apps/web/src/components/LoginForm.tsx
#   packages/types/auth.ts

# Commit atomically
git add .
git commit -m "feat: implement user authentication flow"

# Push — CI runs only the jobs affected by your changes
git push origin feat/user-auth
```

---

## Project Roadmap

- [x] Add Docker Compose for local multi-service orchestration
- [ ] Add Terraform / Pulumi IaC in `/infra`
- [x] Add Husky + lint-staged for pre-commit hooks
- [x] Add shared API client generation (OpenAPI → TypeScript) via Orval
- [x] Migrate to Nx for smart caching and task orchestration

---

## License

This project is licensed under the [MIT License](LICENSE).
