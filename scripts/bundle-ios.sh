#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IOS_RESOURCES="$ROOT_DIR/ios/SGReactNativeKit/Resources"

mkdir -p "$IOS_RESOURCES"

node "$ROOT_DIR/node_modules/react-native/cli.js" bundle \
  --platform ios \
  --dev false \
  --entry-file index.js \
  --bundle-output "$IOS_RESOURCES/main.jsbundle" \
  --assets-dest "$IOS_RESOURCES"

echo "iOS bundle created at $IOS_RESOURCES/main.jsbundle"
