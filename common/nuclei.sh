#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# Unified Nuclei v3.4.5 Wrapper Script
# ═══════════════════════════════════════════════════════════════════════════════
# Standardizes all Nuclei invocations across DealBrief scanner modules.
# Uses correct v3 flags and proper exit code handling.
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

# ──────────────────────── Configuration ────────────────────────────────────────
NUCLEI_BIN="nuclei"
TEMPLATE_DIR="/opt/nuclei-templates/"
DEFAULT_TIMEOUT="30"
DEFAULT_RETRIES="2"
DEFAULT_CONCURRENCY="6"

# Base flags applied to every Nuclei execution for consistency
BASE_FLAGS=("-headless" "-insecure" "-silent" "-jsonl")

# ──────────────────────── Helper Functions ──────────────────────────────────────
usage() {
    cat << EOF
Usage: $0 [OPTIONS]

Unified Nuclei v3.4.5 wrapper for DealBrief scanner modules.

OPTIONS:
    -u, --url URL               Single target URL
    -l, --list FILE             File containing target URLs (one per line)
    -t, --templates TEMPLATES   Template paths/tags (comma-separated)
    -tags TAGS                  Template tags (comma-separated)
    -o, --output FILE           Output file path
    -j, --json                  Enable JSONL output format
    -s, --silent               Silent mode (no banner)
    -v, --verbose              Verbose output
    -c, --concurrency N         Number of concurrent requests (default: $DEFAULT_CONCURRENCY)
    --timeout N                 Request timeout in seconds (default: $DEFAULT_TIMEOUT)
    --retries N                 Number of retries (default: $DEFAULT_RETRIES)
    --headless                 Enable headless browser mode
    --insecure                 Accept invalid SSL certificates
    --follow-redirects         Follow HTTP redirects
    --max-redirects N          Maximum redirects to follow
    --rate-limit N             Requests per second rate limit
    --bulk-size N              Bulk request size
    --http-proxy URL           HTTP proxy URL
    --disable-clustering       Disable request clustering
    --stats                    Display execution statistics
    --debug                    Enable debug mode
    --update-templates         Update templates before scan
    -h, --help                 Show this help message

EXAMPLES:
    $0 -u https://example.com -tags tech,misconfiguration -j -s
    $0 -l targets.txt -t cves/ -o results.json -j --headless
    $0 -u https://example.com -t network/rdp-detect.yaml --insecure -v

NOTES:
    - Uses JSONL format (-jsonl) for v3.4.5 compatibility
    - Replaces deprecated -disable-ssl-verification with -insecure
    - System Chrome integration via NUCLEI_PREFERRED_CHROME_PATH env var
    - All flags validated for v3.4.5 compatibility
    - Base flags automatically applied: ${BASE_FLAGS[*]}
EOF
}

log() {
    echo "[$(date -Iseconds)] [nuclei-wrapper] $*" >&2
}

error() {
    log "ERROR: $*"
    exit 1
}

# ──────────────────────── Argument Parsing ──────────────────────────────────────
NUCLEI_ARGS=()
OUTPUT_FILE=""
JSONL_OUTPUT=false
UPDATE_TEMPLATES=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -u|--url)
            NUCLEI_ARGS+=("-u" "$2")
            shift 2
            ;;
        -l|--list)
            [[ -f "$2" ]] || error "Target list file not found: $2"
            NUCLEI_ARGS+=("-list" "$2")
            shift 2
            ;;
        -t|--templates)
            # Handle both single templates and comma-separated lists
            IFS=',' read -ra TEMPLATES <<< "$2"
            for template in "${TEMPLATES[@]}"; do
                NUCLEI_ARGS+=("-t" "$template")
            done
            shift 2
            ;;
        -tags)
            NUCLEI_ARGS+=("-tags" "$2")
            shift 2
            ;;
        -o|--output)
            OUTPUT_FILE="$2"
            NUCLEI_ARGS+=("-o" "$2")
            shift 2
            ;;
        -j|--json)
            log "WARN: Converting -j flag to -jsonl for v3.4.5"
            JSONL_OUTPUT=true
            shift
            ;;
        -s|--silent)
            # Silent is already in BASE_FLAGS, but allow explicit specification
            shift
            ;;
        -v|--verbose)
            NUCLEI_ARGS+=("-verbose")
            shift
            ;;
        -c|--concurrency)
            NUCLEI_ARGS+=("-c" "$2")
            shift 2
            ;;
        --timeout)
            NUCLEI_ARGS+=("-timeout" "$2")
            shift 2
            ;;
        --retries)
            NUCLEI_ARGS+=("-retries" "$2")
            shift 2
            ;;
        --headless)
            # Headless is already in BASE_FLAGS, but allow explicit specification
            shift
            ;;
        --insecure)
            # Insecure is already in BASE_FLAGS, but allow explicit specification
            shift
            ;;
        --follow-redirects)
            NUCLEI_ARGS+=("-follow-redirects")
            shift
            ;;
        --max-redirects)
            NUCLEI_ARGS+=("-max-redirects" "$2")
            shift 2
            ;;
        --rate-limit)
            NUCLEI_ARGS+=("-rate-limit" "$2")
            shift 2
            ;;
        --bulk-size)
            NUCLEI_ARGS+=("-bulk-size" "$2")
            shift 2
            ;;
        --http-proxy)
            NUCLEI_ARGS+=("-http-proxy" "$2")
            shift 2
            ;;
        --disable-clustering)
            NUCLEI_ARGS+=("-disable-clustering")
            shift
            ;;
        --stats)
            NUCLEI_ARGS+=("-stats")
            shift
            ;;
        --debug)
            NUCLEI_ARGS+=("-debug")
            shift
            ;;
        --update-templates)
            UPDATE_TEMPLATES=true
            shift
            ;;
        # Deprecated flags - convert to modern equivalents
        -disable-ssl-verification|-dca)
            log "WARN: Converting deprecated flag $1 to -insecure"
            # Insecure is already in BASE_FLAGS
            shift
            ;;
        -json)
            log "WARN: Converting deprecated -json flag to -jsonl"
            JSONL_OUTPUT=true
            shift
            ;;
        -td)
            log "WARN: Converting deprecated -td flag to -t"
            NUCLEI_ARGS+=("-t" "$2")
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

# ──────────────────────── Pre-flight Checks ─────────────────────────────────────
# Check if nuclei is available
if ! command -v "$NUCLEI_BIN" &> /dev/null; then
    error "Nuclei binary not found: $NUCLEI_BIN"
fi

# Verify template directory exists
if [[ ! -d "$TEMPLATE_DIR" ]]; then
    error "Nuclei templates directory not found: $TEMPLATE_DIR"
fi

# ──────────────────────── Template Updates ──────────────────────────────────────
if [[ "$UPDATE_TEMPLATES" == true ]]; then
    log "Updating Nuclei templates..."
    if ! "$NUCLEI_BIN" -update-templates -silent; then
        log "WARN: Template update failed, continuing with existing templates"
    fi
fi

# ──────────────────────── Build Final Command ────────────────────────────────────
# Start with base flags for consistency
FINAL_ARGS=("${BASE_FLAGS[@]}")

# Add JSONL output if requested
if [[ "$JSONL_OUTPUT" == true ]]; then
    FINAL_ARGS+=("-jsonl")
fi

# Add user-specified arguments
FINAL_ARGS+=("${NUCLEI_ARGS[@]}")

# Add default template directory if no specific templates provided
TEMPLATE_SPECIFIED=false
for arg in "${NUCLEI_ARGS[@]}"; do
    if [[ "$arg" == "-t" ]]; then
        TEMPLATE_SPECIFIED=true
        break
    fi
done

if [[ "$TEMPLATE_SPECIFIED" == false ]] && [[ ! " ${NUCLEI_ARGS[*]} " =~ " -tags " ]]; then
    FINAL_ARGS+=("-t" "$TEMPLATE_DIR")
fi

# Add default values for common options if not specified
if [[ ! " ${NUCLEI_ARGS[*]} " =~ " -timeout " ]]; then
    FINAL_ARGS+=("-timeout" "$DEFAULT_TIMEOUT")
fi

if [[ ! " ${NUCLEI_ARGS[*]} " =~ " -retries " ]]; then
    FINAL_ARGS+=("-retries" "$DEFAULT_RETRIES")
fi

if [[ ! " ${NUCLEI_ARGS[*]} " =~ " -c " ]]; then
    FINAL_ARGS+=("-c" "$DEFAULT_CONCURRENCY")
fi

# ──────────────────────── Environment Setup ─────────────────────────────────────
# Set environment variables for consistent behavior
export NO_COLOR=1
export NUCLEI_PREFERRED_CHROME_PATH="${NUCLEI_PREFERRED_CHROME_PATH:-/usr/bin/chromium-browser}"

# ──────────────────────── Execute Nuclei ────────────────────────────────────────
log "Executing: $NUCLEI_BIN ${FINAL_ARGS[*]}"

# Create output directory if specified
if [[ -n "$OUTPUT_FILE" ]]; then
    OUTPUT_DIR="$(dirname "$OUTPUT_FILE")"
    mkdir -p "$OUTPUT_DIR"
fi

# Execute nuclei with proper exit code handling
EXIT_CODE=0
"$NUCLEI_BIN" "${FINAL_ARGS[@]}" || EXIT_CODE=$?

# ──────────────────────── Exit Code Interpretation ──────────────────────────────
case $EXIT_CODE in
    0)
        log "Nuclei scan completed successfully"
        ;;
    *)
        log "Nuclei scan failed with exit code $EXIT_CODE"
        ;;
esac

exit $EXIT_CODE