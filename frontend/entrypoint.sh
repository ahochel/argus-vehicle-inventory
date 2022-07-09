#!/usr/bin/env sh

if [ ! -f node_modules/package.json ] || [ "$(diff package.json node_modules/package.json)" ]; then
  echo "npm install" && npm install --quiet
  cp package.json node_modules/package.json
fi

set -e

npm start