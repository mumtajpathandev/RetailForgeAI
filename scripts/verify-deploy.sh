#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${1:?Usage: ./scripts/verify-deploy.sh https://your-app.example.com}"
for path in / /login /import /published/spring-2027-line-review; do
  code="$(curl -L -s -o /dev/null -w '%{http_code}' "${BASE_URL%/}${path}")"
  [[ "$code" == "200" ]] || { echo "FAIL $path -> $code"; exit 1; }
  echo "OK   $path -> $code"
done
