FROM node:18-alpine

WORKDIR /app

# Install system dependencies and security tools including Chrome
RUN apk add --no-cache \
    bash \
    curl \
    wget \
    git \
    openssl \
    bind-tools \
    nmap \
    nmap-scripts \
    python3 \
    py3-pip \
    unzip \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Chrome path for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install TruffleHog
RUN curl -sSfL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh | sh -s -- -b /usr/local/bin

# Install Nuclei
RUN curl -L https://github.com/projectdiscovery/nuclei/releases/download/v3.2.9/nuclei_3.2.9_linux_amd64.zip -o nuclei.zip && \
    unzip nuclei.zip && \
    mv nuclei /usr/local/bin/ && \
    rm nuclei.zip && \
    chmod +x /usr/local/bin/nuclei

# Install Python packages with system override
RUN pip3 install --break-system-packages dnstwist

# Install testssl.sh
RUN git clone --depth 1 https://github.com/drwetter/testssl.sh.git /opt/testssl.sh && \
    ln -s /opt/testssl.sh/testssl.sh /usr/local/bin/testssl.sh

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for tsx)
RUN npm install

# Copy source code
COPY . .

# Create necessary directories
RUN mkdir -p /tmp && chmod 777 /tmp

# Update nuclei templates
RUN nuclei -update-templates

# Expose port 3000 to match Fly.io configuration
EXPOSE 3000

# Start the application directly with tsx
CMD ["npx", "tsx", "api/server.ts"]
