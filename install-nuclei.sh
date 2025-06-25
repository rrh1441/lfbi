#!/bin/bash
# Install Nuclei for DealBrief Scanner

echo "📦 Installing Nuclei v3.2.9..."

# Option 1: Install via go (recommended)
if command -v go &> /dev/null; then
    echo "Installing via Go..."
    go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
    
    # Add GOPATH/bin to PATH if not already there
    export PATH="$PATH:$(go env GOPATH)/bin"
    echo 'export PATH="$PATH:$(go env GOPATH)/bin"' >> ~/.bashrc
    
elif command -v apt-get &> /dev/null; then
    # Option 2: Debian/Ubuntu
    echo "Installing via apt..."
    sudo apt update
    sudo apt install -y nuclei
    
elif command -v yum &> /dev/null; then
    # Option 3: RHEL/CentOS
    echo "Installing via yum..."
    sudo yum install -y nuclei
    
elif command -v brew &> /dev/null; then
    # Option 4: macOS
    echo "Installing via brew..."
    brew install nuclei
    
else
    # Option 5: Manual binary download
    echo "Installing manually..."
    NUCLEI_VERSION="v3.2.9"
    ARCH=$(uname -m)
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    
    if [[ "$ARCH" == "x86_64" ]]; then
        ARCH="amd64"
    elif [[ "$ARCH" == "aarch64" ]]; then
        ARCH="arm64"
    fi
    
    curl -L "https://github.com/projectdiscovery/nuclei/releases/download/${NUCLEI_VERSION}/nuclei_${NUCLEI_VERSION:1}_${OS}_${ARCH}.zip" -o nuclei.zip
    unzip nuclei.zip
    sudo mv nuclei /usr/local/bin/
    rm nuclei.zip
fi

echo "✅ Testing nuclei installation..."
if nuclei -version; then
    echo "🎉 Nuclei installed successfully!"
    echo "📁 Updating nuclei templates..."
    nuclei -update-templates
else
    echo "❌ Nuclei installation failed"
    exit 1
fi