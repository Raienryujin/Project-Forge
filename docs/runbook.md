# Operational Runbook

## Incident Response

### API is returning 5xx errors
1. Check application logs: `az webapp log tail --name <app> --resource-group <rg>`
2. Verify database connectivity
3. Check recent deployments in GitHub Actions

### Frontend build fails in CI
1. Check Node.js version matches `.nvmrc`
2. Run `npm ci` locally to reproduce
3. Verify environment variables are set in GitHub Secrets

## Deployment

### Manual deployment (escape hatch)
```bash
# API
cd apps/api
dotnet publish -c Release -o ./publish
# Deploy ./publish to your hosting target

# Web
cd apps/web
npm run build
# Deploy .next/ to Vercel or your hosting target
```
