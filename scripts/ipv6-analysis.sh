#!/bin/bash

# IPv6 Network Analysis Script for macOS
# Part of Tiation macOS Networking Guide

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🌐 Tiation IPv6 Network Analysis${NC}"
echo -e "${CYAN}================================${NC}"

# Function to print section headers
print_section() {
    echo -e "\n${BLUE}📋 $1${NC}"
    echo -e "${BLUE}$(printf '%*s' ${#1} '' | tr ' ' '-')${NC}"
}

# Function to check command existence
check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo -e "${RED}❌ $1 command not found${NC}"
        return 1
    fi
    echo -e "${GREEN}✅ $1 available${NC}"
    return 0
}

# Check system requirements
print_section "System Requirements"
check_command "ifconfig"
check_command "netstat"
check_command "ping6"
check_command "curl"

# Get public IPv4 address
print_section "Public IPv4 Endpoint"
echo -n "🔍 Discovering public IPv4 address... "
PUBLIC_IPV4=$(curl -s --max-time 10 https://ipv4.icanhazip.com || echo "Unable to determine")
echo -e "${GREEN}${PUBLIC_IPV4}${NC}"

# Analyze IPv6 interfaces
print_section "IPv6 Interface Analysis"
echo -e "${YELLOW}📡 IPv6 Interfaces:${NC}"
ifconfig | grep -A 3 -B 1 "inet6" | grep -E "(^[a-z]|inet6)"

# Check IPv6 routing table
print_section "IPv6 Routing Table"
echo -e "${YELLOW}🗺️  IPv6 Routes:${NC}"
netstat -rn -f inet6 2>/dev/null || echo "No IPv6 routes found"

# Check for tunnel interfaces
print_section "Tunnel Interface Status"
echo -e "${YELLOW}🚇 Tunnel Interfaces:${NC}"
ifconfig | grep -A 5 -B 1 "gif\|stf\|utun" | grep -E "(^[a-z]|flags|inet6)"

# Test IPv6 connectivity
print_section "IPv6 Connectivity Test"
echo -e "${YELLOW}🔗 Testing IPv6 connectivity:${NC}"

# Test Google DNS
echo -n "  • Google DNS (2001:4860:4860::8888): "
if ping6 -c 2 -W 3000 2001:4860:4860::8888 &>/dev/null; then
    echo -e "${GREEN}✅ Reachable${NC}"
else
    echo -e "${RED}❌ Unreachable${NC}"
fi

# Test Cloudflare DNS
echo -n "  • Cloudflare DNS (2606:4700:4700::1111): "
if ping6 -c 2 -W 3000 2606:4700:4700::1111 &>/dev/null; then
    echo -e "${GREEN}✅ Reachable${NC}"
else
    echo -e "${RED}❌ Unreachable${NC}"
fi

# Check for Hurricane Electric tunnel
print_section "Hurricane Electric Tunnel Detection"
if ifconfig gif0 2>/dev/null | grep -q "inet6"; then
    echo -e "${GREEN}✅ HE tunnel appears to be configured${NC}"
    ifconfig gif0 | grep -E "(tunnel|inet6)"
else
    echo -e "${YELLOW}⚠️  No HE tunnel detected${NC}"
    echo -e "   Run: sudo ifconfig gif0 create"
fi

# Network performance metrics
print_section "Network Performance Metrics"
echo -e "${YELLOW}📊 Interface Statistics:${NC}"
netstat -i | head -1
netstat -i | grep -E "(en0|gif0|utun)"

# Summary and recommendations
print_section "Summary & Recommendations"
echo -e "${CYAN}💡 Configuration Summary:${NC}"
echo -e "   • Public IPv4: ${PUBLIC_IPV4}"
echo -e "   • IPv6 Status: $(ifconfig | grep -q 'inet6.*2001:' && echo -e '${GREEN}Configured${NC}' || echo -e '${RED}Not configured${NC}')"
echo -e "   • Tunnel Status: $(ifconfig gif0 2>/dev/null | grep -q 'inet6' && echo -e '${GREEN}Active${NC}' || echo -e '${RED}Inactive${NC}')"

echo -e "\n${CYAN}🚀 Next Steps:${NC}"
if ! ifconfig gif0 2>/dev/null | grep -q "inet6"; then
    echo -e "   1. Create HE tunnel account at tunnelbroker.net"
    echo -e "   2. Use your public IPv4 (${PUBLIC_IPV4}) as endpoint"
    echo -e "   3. Configure tunnel with provided settings"
    echo -e "   4. Test connectivity with ping6"
else
    echo -e "   ✅ IPv6 tunnel is configured and ready"
fi

echo -e "\n${CYAN}📚 Documentation: https://github.com/tiaastor/tiation-macos-networking-guide${NC}"
