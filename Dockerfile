# ────────────────────────────────────────────────────────────────────────
# DealBrief-Scanner Runtime Image
# • Installs all security tools (SpiderFoot, nuclei, testssl.sh, TruffleHog)
# • Adds sf + spiderfoot.py entry-points so wrapper code finds the binary
# • Uses node:22-alpine (Promise.withResolvers supported)
# ────────────────────────────────────────────────────────────────────────
FROM node:22-alpine

# ----- Verify base image -------------------------------------------------
RUN node -v

# ----- Working directory -------------------------------------------------
WORKDIR /app

# ----- System packages & headless Chrome for Puppeteer + Nuclei -------------------
RUN apk add --no-cache \
    bash curl wget git openssl bind-tools \
    nmap nmap-scripts \
    python3 py3-pip unzip \
    chromium nss freetype freetype-dev harfbuzz \
    ca-certificates ttf-freefont coreutils procps \
    libx11 libxcomposite libxdamage libxext libxrandr libxfixes \
    libxkbcommon libdrm libxcb libxrender pango cairo alsa-lib udev

# Puppeteer points to system Chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Make Rod/Nuclei pick up the system browser
ENV ROD_BROWSER_BIN=/usr/bin/chromium-browser \
    HEADLESS_SKIP_BROWSER_DOWNLOAD=1 \
    NUCLEI_PREFERRED_CHROME_PATH=/usr/bin/chromium-browser \
    ROD_BROWSER=/usr/bin/chromium-browser \
    ROD_KEEP_USER_DATA_DIR=false \
    ROD_BROWSER_SKIP_DOWNLOAD=true

# Also create the expected Rod cache directory and symlink to system Chrome
RUN mkdir -p /root/.cache/rod/browser/chromium-1321438 && \
    ln -s /usr/bin/chromium-browser /root/.cache/rod/browser/chromium-1321438/chrome

RUN ln -sf /usr/bin/chromium-browser /usr/bin/chrome
RUN ln -s /usr/bin/chromium-browser /usr/bin/google-chrome  # NEW: Nuclei checks this path first

# Security scanner environment variables
ENV NODE_TLS_REJECT_UNAUTHORIZED=0 \
    TESTSSL_PATH=/opt/testssl.sh/testssl.sh \
    NUCLEI_DISABLE_SANDBOX=true

# ------------------------------------------------------------------------
# Security tooling
# ------------------------------------------------------------------------

# TruffleHog
RUN curl -sSfL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh \
    | sh -s -- -b /usr/local/bin

# nuclei v3.4.5
RUN curl -L https://github.com/projectdiscovery/nuclei/releases/download/v3.4.5/nuclei_3.4.5_linux_amd64.zip \
        -o nuclei.zip && \
    unzip nuclei.zip && \
    mv nuclei /usr/local/bin/ && \
    rm nuclei.zip && \
    chmod +x /usr/local/bin/nuclei

# nuclei templates (stored read-only under /opt)
RUN mkdir -p /opt/nuclei-templates && \
    nuclei -update-templates -ut /opt/nuclei-templates
ENV NUCLEI_TEMPLATES=/opt/nuclei-templates

# Nuclei wrapper script removed - now calling nuclei binary directly from TypeScript

# dnstwist (Python) – use --break-system-packages to avoid venv bloat
RUN pip3 install --break-system-packages dnstwist

# SpiderFoot
RUN git clone https://github.com/smicallef/spiderfoot.git /opt/spiderfoot && \
    pip3 install --break-system-packages -r /opt/spiderfoot/requirements.txt && \
    chmod +x /opt/spiderfoot/sf.py && \
    ln -s /opt/spiderfoot/sf.py /usr/local/bin/sf && \
    ln -s /opt/spiderfoot/sf.py /usr/local/bin/spiderfoot.py   # legacy name

# sslscan - reliable TLS/SSL scanner
RUN apk add --no-cache sslscan

# OpenVAS/Greenbone CE - Enterprise vulnerability scanner
RUN pip3 install --break-system-packages python-gvm gvm-tools

# OWASP ZAP - Web application security scanner (baseline script only)
RUN apk add --no-cache openjdk11-jre && \
    curl -fsSL https://raw.githubusercontent.com/zaproxy/zaproxy/main/docker/zap-baseline.py \
         -o /usr/local/bin/zap-baseline.py && \
    chmod +x /usr/local/bin/zap-baseline.py && \
    mkdir -p /root/.ZAP && \
    python3 /usr/local/bin/zap-baseline.py --version || true

# ------------------------------------------------------------------------
# Node-level tooling
# ------------------------------------------------------------------------
RUN npm install -g pnpm tsx

# Technology fingerprinting now handled by Nuclei templates - no additional tools needed

# ------------------------------------------------------------------------
# Project dependencies
# ------------------------------------------------------------------------
COPY package*.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api-main/package.json ./apps/api-main/
COPY apps/workers/package.json ./apps/workers/
COPY apps/sync-worker/package.json ./apps/sync-worker/
COPY apps/sync-worker/tsconfig.json ./apps/sync-worker/

RUN pnpm install

# ------------------------------------------------------------------------
# Copy application source
# ------------------------------------------------------------------------
COPY . .

# ------------------------------------------------------------------------
# Build TypeScript applications
# ------------------------------------------------------------------------
RUN pnpm build

# Ensure temp directories are writeable
RUN mkdir -p /tmp && chmod 777 /tmp

# ------------------------------------------------------------------------
# Network
# ------------------------------------------------------------------------
EXPOSE 3000

# ------------------------------------------------------------------------
# Entrypoint
# ------------------------------------------------------------------------
CMD ["npx", "tsx", "apps/api-main/server.ts"]
