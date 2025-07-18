#!/bin/bash

# Hurricane Electric IPv6 Tunnel Configuration Example
# Part of Tiation macOS Networking Guide

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🌐 Hurricane Electric IPv6 Tunnel Setup${NC}"
echo -e "${CYAN}=====================================${NC}"

# Example configuration values from tunnelbroker.net
# Replace these with your actual tunnel details

# Your IPv4 endpoint (public IP)
CLIENT_IPV4="49.196.42.216"

# HE Server IPv4 endpoint (provided by HE)
HE_SERVER_IPV4="216.66.80.26"

# HE Server IPv6 endpoint (provided by HE)
HE_SERVER_IPV6="2001:470:1f0a:1b4::1"

# Your IPv6 endpoint (provided by HE)
HE_CLIENT_IPV6="2001:470:1f0a:1b4::2"

# Routed /64 prefix (optional, provided by HE)
ROUTED_64="2001:470:1f0b:1b4::/64"

echo -e "${YELLOW}📋 Configuration Details:${NC}"
echo -e "   • Client IPv4: ${CLIENT_IPV4}"
echo -e "   • HE Server IPv4: ${HE_SERVER_IPV4}"
echo -e "   • HE Server IPv6: ${HE_SERVER_IPV6}"
echo -e "   • Client IPv6: ${HE_CLIENT_IPV6}"
echo -e "   • Routed /64: ${ROUTED_64}"

echo -e "\n${BLUE}🔧 Setting up tunnel interface...${NC}"

# Create and configure the tunnel interface
echo -e "${YELLOW}Creating gif0 interface...${NC}"
sudo ifconfig gif0 create 2>/dev/null || echo "Interface gif0 already exists"

echo -e "${YELLOW}Configuring tunnel endpoints...${NC}"
sudo ifconfig gif0 tunnel ${CLIENT_IPV4} ${HE_SERVER_IPV4}

echo -e "${YELLOW}Setting IPv6 addresses...${NC}"
sudo ifconfig gif0 inet6 ${HE_CLIENT_IPV6} ${HE_SERVER_IPV6} prefixlen 128

echo -e "${YELLOW}Bringing interface up...${NC}"
sudo ifconfig gif0 up

echo -e "${YELLOW}Adding default IPv6 route...${NC}"
sudo route -n add -inet6 default ${HE_SERVER_IPV6}

echo -e "\n${BLUE}🔍 Verifying tunnel configuration...${NC}"
ifconfig gif0

echo -e "\n${BLUE}🧪 Testing IPv6 connectivity...${NC}"

# Test IPv6 connectivity
echo -n "Testing Google DNS (2001:4860:4860::8888): "
if ping6 -c 2 2001:4860:4860::8888 &>/dev/null; then
    echo -e "${GREEN}✅ Success${NC}"
else
    echo -e "${RED}❌ Failed${NC}"
fi

echo -n "Testing Cloudflare DNS (2606:4700:4700::1111): "
if ping6 -c 2 2606:4700:4700::1111 &>/dev/null; then
    echo -e "${GREEN}✅ Success${NC}"
else
    echo -e "${RED}❌ Failed${NC}"
fi

echo -n "Testing Hurricane Electric (ipv6.he.net): "
if ping6 -c 2 ipv6.he.net &>/dev/null; then
    echo -e "${GREEN}✅ Success${NC}"
else
    echo -e "${RED}❌ Failed${NC}"
fi

echo -e "\n${GREEN}🎉 Tunnel setup complete!${NC}"
echo -e "\n${CYAN}💡 To make this persistent across reboots:${NC}"
echo -e "   1. Add commands to a startup script"
echo -e "   2. Or create a LaunchDaemon"
echo -e "   3. Or use the tunnel broker's automatic configuration"

echo -e "\n${CYAN}🛠️  To remove the tunnel:${NC}"
echo -e "   sudo route -n delete -inet6 default ${HE_SERVER_IPV6}"
echo -e "   sudo ifconfig gif0 destroy"

echo -e "\n${CYAN}📚 Documentation: https://github.com/tiation/tiation-macos-networking-guide${NC}"
