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

# ----- System packages & headless Chrome for Puppeteer -------------------
RUN apk add --no-cache \
    bash curl wget git openssl bind-tools \
    nmap nmap-scripts \
    python3 py3-pip unzip \
    chromium nss freetype freetype-dev harfbuzz \
    ca-certificates ttf-freefont coreutils procps

# Puppeteer points to system Chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# ------------------------------------------------------------------------
# Security tooling
# ------------------------------------------------------------------------

# TruffleHog
RUN curl -sSfL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh \
    | sh -s -- -b /usr/local/bin

# nuclei
RUN curl -L https://github.com/projectdiscovery/nuclei/releases/download/v3.2.9/nuclei_3.2.9_linux_amd64.zip \
        -o nuclei.zip && \
    unzip nuclei.zip && \
    mv nuclei /usr/local/bin/ && \
    rm nuclei.zip && \
    chmod +x /usr/local/bin/nuclei

# nuclei templates (stored read-only under /opt)
RUN mkdir -p /opt/nuclei-templates && \
    nuclei -update-templates -ut /opt/nuclei-templates
ENV NUCLEI_TEMPLATES=/opt/nuclei-templates

# dnstwist (Python) – use --break-system-packages to avoid venv bloat
RUN pip3 install --break-system-packages dnstwist

# SpiderFoot
RUN git clone https://github.com/smicallef/spiderfoot.git /opt/spiderfoot && \
    pip3 install --break-system-packages -r /opt/spiderfoot/requirements.txt && \
    chmod +x /opt/spiderfoot/sf.py && \
    ln -s /opt/spiderfoot/sf.py /usr/local/bin/sf && \
    ln -s /opt/spiderfoot/sf.py /usr/local/bin/spiderfoot.py   # legacy name

# testssl.sh
RUN git clone --depth 1 https://github.com/drwetter/testssl.sh.git /opt/testssl.sh && \
    ln -s /opt/testssl.sh/testssl.sh /usr/local/bin/testssl.sh

# ------------------------------------------------------------------------
# Node-level tooling
# ------------------------------------------------------------------------
RUN npm install -g pnpm tsx

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
