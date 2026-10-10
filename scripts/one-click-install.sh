#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

command -v node >/dev/null || { echo "Node.js 22+ is required."; exit 1; }
corepack enable >/dev/null 2>&1 || true
command -v pnpm >/dev/null || { echo "pnpm is required."; exit 1; }

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "Created .env from .env.example. Add secrets before connecting live services."
fi

pnpm install --frozen-lockfile || pnpm install
pnpm check
pnpm test
pnpm build

echo
printf '%s\n' "RetailForge AI is installed and verified." "Start locally with: pnpm dev" "Open the password demo at: http://localhost:3000/login"
