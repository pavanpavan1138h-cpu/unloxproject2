#!/bin/bash

# One-Click Start for Unlox
# Starts both frontend and backend concurrently

echo "Starting Unlox Frontend and Backend..."

# Run concurrently using npx so no root install is needed
npx concurrently \
  "npm run dev --prefix backend" \
  "npm run dev --prefix frontend"
