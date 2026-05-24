# Developer Onboarding Guide

Welcome to the team! This guide will get you up and running.

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| .NET SDK | 8.0+ | [Download](https://dotnet.microsoft.com/download) |
| Node.js | 20 LTS | [Download](https://nodejs.org/) |
| Git | 2.40+ | [Download](https://git-scm.com/) |

## First-Time Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd ProjectForge

# 2. Start the API
cd apps/api
dotnet restore
dotnet run

# 3. In a new terminal — start the frontend
cd apps/web
npm install
npm run dev
```

## Branch Naming Convention

| Prefix | Use Case |
|---|---|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `chore/` | Maintenance, dependencies |
| `docs/` | Documentation only |
| `refactor/` | Code restructuring |

## Code Review Checklist

- [ ] PR targets `develop` (not `main` directly)
- [ ] CI passes on all affected jobs
- [ ] No secrets committed
- [ ] README/docs updated if behaviour changes
