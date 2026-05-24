<p align="center">
  <strong>⚒️ Project Forge</strong><br/>
  <em>Enterprise Monorepo Template — Full-Stack Golden Path</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white" alt=".NET 8" />
  <img src="https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

---

## Overview

**Project Forge** is a production-grade monorepo template designed for **atomic full-stack commits**. It co-locates backend, frontend, shared packages, infrastructure config, and CI/CD in a single repository — enabling you to ship a cross-cutting feature (API endpoint + UI component + shared type) in one commit, one review, one merge.

Use this repository as a **GitHub Template** to instantly scaffold a new project with battle-tested defaults.

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
│   │   └── ci.yml            # Path-filtered CI pipeline
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
│
├── .gitignore                # .NET + Node.js + OS artifacts
├── README.md                 # ← You are here
└── LICENSE
```

### Design Principles

| Principle | Implementation |
|---|---|
| **Atomic Commits** | API + Web changes land in a single PR — no cross-repo sync |
| **Path-Filtered CI** | Only changed apps trigger builds — fast feedback, lower cost |
| **Shared Packages** | Types, configs, and UI components live in `/packages` — DRY |
| **Convention Over Config** | Predictable directory structure reduces onboarding friction |
| **Environment Parity** | `.env.example` files document every required variable |

---

## Path-Filtered CI/CD Strategy

The CI pipeline (`.github/workflows/ci.yml`) implements a **path-filtered** strategy to keep build times fast and resource usage minimal in a monorepo.

### How It Works

```
Push to main/develop or PR opened
        │
        ├─── Files changed in apps/api/** or .github/workflows/**
        │       └── ✅ Trigger build-api job
        │             • dotnet restore → build → test
        │
        ├─── Files changed in apps/web/** or .github/workflows/**
        │       └── ✅ Trigger build-web job
        │             • npm ci → lint → build
        │
        └─── ci-gate (aggregator)
                └── Reports overall pass/fail for branch protection
```

### Key Features

- **Concurrency control**: Duplicate runs on the same branch are automatically cancelled
- **CI Gate job**: A single status check (`ci-gate`) that branch protection rules can target, regardless of which subset of jobs ran
- **Workflow changes always trigger all jobs**: Edits to `.github/workflows/**` rebuild everything, ensuring pipeline integrity

> **💡 Upgrading to `on.push.paths`**: For larger teams, replace the `if:` conditions with native `on.push.paths` filters per workflow file (one workflow per app). The current single-file approach is optimized for solo/small-team velocity.

---

## Getting Started

### Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| [.NET SDK](https://dotnet.microsoft.com/download) | 8.0+ | Backend runtime |
| [Node.js](https://nodejs.org/) | 20 LTS | Frontend runtime |
| [Git](https://git-scm.com/) | 2.40+ | Version control |

### Instantiate a New Project

1. **Create from Template**
   - Click **"Use this template"** on GitHub, or:
   ```bash
   gh repo create my-new-project --template <your-username>/ProjectForge --private --clone
   cd my-new-project
   ```

2. **Bootstrap the Backend**
   ```bash
   cd apps/api
   dotnet restore
   dotnet run
   # API is live at https://localhost:5001
   ```

3. **Bootstrap the Frontend**
   ```bash
   cd apps/web
   npm install
   npm run dev
   # Web is live at http://localhost:3000
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

- [ ] Add Docker Compose for local multi-service orchestration
- [ ] Add Terraform / Pulumi IaC in `/infra`
- [ ] Add shared API client generation (OpenAPI → TypeScript)
- [ ] Add Turborepo or Nx for smart caching and task orchestration
- [ ] Add Husky + lint-staged for pre-commit hooks

---

## License

This project is licensed under the [MIT License](LICENSE).
