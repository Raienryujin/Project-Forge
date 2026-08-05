#!/bin/sh
set -e

echo "Injecting runtime environment variables..."

# This script replaces the static build-time placeholder with the actual runtime environment variable
# Ensure you build the app with NEXT_PUBLIC_API_URL=APP_NEXT_PUBLIC_API_URL so it's baked into the static files
if [ -n "$NEXT_PUBLIC_API_URL" ]; then
  find /app/.next \( -type f -name "*.js" -o -name "*.html" \) -exec sed -i "s|APP_NEXT_PUBLIC_API_URL|${NEXT_PUBLIC_API_URL}|g" {} +
fi

echo "Starting Next.js..."
exec "$@"
