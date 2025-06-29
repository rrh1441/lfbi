#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# Unified Nuclei v3.4.5 Wrapper Script
# ═══════════════════════════════════════════════════════════════════════════════
# Simple pass-through wrapper that sets up environment and executes nuclei
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

# ──────────────────────── Environment Setup ─────────────────────────────────────
# Set environment variables for consistent behavior
export NO_COLOR=1
export NUCLEI_PREFERRED_CHROME_PATH="${NUCLEI_PREFERRED_CHROME_PATH:-/usr/bin/chromium-browser}"

# ──────────────────────── Execute Nuclei ────────────────────────────────────────
exec /usr/local/bin/nuclei "$@"