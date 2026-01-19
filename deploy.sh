#!/bin/bash
# ============================================
# Royal Locksmith - Hostinger Deployment Script
# ============================================
# This script deploys the built site to Hostinger via FTP
#
# Usage: ./deploy.sh
# ============================================

set -e

echo "🚀 Royal Locksmith Deployment Script"
echo "====================================="

# Load FTP config
if [ -f ".ftp-config" ]; then
    source .ftp-config
else
    echo "❌ Error: .ftp-config not found"
    echo "   Please create .ftp-config with your Hostinger FTP credentials"
    exit 1
fi

# Validate config
if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
    echo "❌ Error: FTP credentials not configured in .ftp-config"
    exit 1
fi

# Build the project
echo ""
echo "📦 Building project..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Error: dist/ directory not found after build"
    exit 1
fi

echo "✅ Build complete!"

# Deploy via lftp (supports FTP/SFTP with better reliability than basic ftp)
echo ""
echo "📤 Deploying to Hostinger..."
echo "   Host: $FTP_HOST"
echo "   Directory: $FTP_REMOTE_DIR"

# Check if lftp is installed
if ! command -v lftp &> /dev/null; then
    echo ""
    echo "⚠️  lftp not installed. Installing via Homebrew..."
    brew install lftp
fi

# Deploy using lftp mirror command
lftp -c "
set ftp:ssl-allow no;
set net:timeout 30;
set net:max-retries 3;
open -u $FTP_USER,$FTP_PASS ftp://$FTP_HOST:${FTP_PORT:-21};
lcd dist;
cd $FTP_REMOTE_DIR;
mirror --reverse --delete --verbose --parallel=5;
bye
"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Site is now live at: https://royallocksmithnj.com"
echo ""
