#!/bin/bash

# Tiation macOS Networking Guide Verification Script
# Verifies all components are working correctly

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🔍 Tiation macOS Networking Guide Verification${NC}"
echo -e "${CYAN}=============================================${NC}"

# Function to print section headers
print_section() {
    echo -e "\n${BLUE}📋 $1${NC}"
    echo -e "${BLUE}$(printf '%*s' ${#1} '' | tr ' ' '-')${NC}"
}

# Function to test command
test_command() {
    local cmd="$1"
    local desc="$2"
    
    echo -n "  • ${desc}: "
    if eval "$cmd" &>/dev/null; then
        echo -e "${GREEN}✅ PASS${NC}"
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        return 1
    fi
}

# Verify airport installation
print_section "Airport Command Verification"
test_command "airport --version" "Airport command availability"
test_command "airport -s | wc -l" "Wi-Fi network scanning"

# Verify system tools
print_section "System Tools Verification"
test_command "ifconfig en0" "Network interface access"
test_command "netstat -rn" "Routing table access"
test_command "system_profiler SPAirPortDataType" "Wi-Fi profiler access"

# Verify IPv6 capabilities
print_section "IPv6 Capabilities Verification"
test_command "ping6 -c 1 ::1" "IPv6 loopback connectivity"
test_command "ifconfig | grep inet6" "IPv6 interface detection"

# Verify internet connectivity
print_section "Internet Connectivity Verification"
test_command "curl -s --max-time 5 https://ipv4.icanhazip.com" "IPv4 internet access"
test_command "ping -c 2 8.8.8.8" "IPv4 DNS connectivity"

# Verify file permissions
print_section "File Permissions Verification"
test_command "ls -la scripts/install.sh | grep -q 'x'" "Install script executable"
test_command "ls -la scripts/ipv6-analysis.sh | grep -q 'x'" "Analysis script executable"

# Verify configuration files
print_section "Configuration Files Verification"
test_command "test -f config/tunnel.conf" "Tunnel configuration exists"
test_command "test -d logs" "Logs directory exists"
test_command "test -d tmp" "Temporary directory exists"

# Test printer detection
print_section "Printer Detection Verification"
echo -e "${YELLOW}🖨️  Scanning for Wi-Fi Direct printers...${NC}"
PRINTERS=$(system_profiler SPAirPortDataType | grep -i "direct" | wc -l)
if [[ $PRINTERS -gt 0 ]]; then
    echo -e "${GREEN}✅ Found $PRINTERS Wi-Fi Direct printer(s)${NC}"
else
    echo -e "${YELLOW}⚠️  No Wi-Fi Direct printers detected${NC}"
fi

# Test network analysis script
print_section "Network Analysis Script Test"
echo -e "${YELLOW}🔍 Running network analysis...${NC}"
if ./scripts/ipv6-analysis.sh > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Network analysis script runs successfully${NC}"
else
    echo -e "${RED}❌ Network analysis script failed${NC}"
fi

# Summary
print_section "Verification Summary"
echo -e "${CYAN}📊 System Status:${NC}"
echo -e "   • Airport Command: $(airport --version 2>/dev/null | grep -q 'deprecated' && echo -e '${GREEN}Installed${NC}' || echo -e '${RED}Not installed${NC}')"
echo -e "   • IPv6 Support: $(ifconfig | grep -q 'inet6' && echo -e '${GREEN}Available${NC}' || echo -e '${RED}Not available${NC}')"
echo -e "   • Internet Access: $(curl -s --max-time 5 https://ipv4.icanhazip.com &>/dev/null && echo -e '${GREEN}Connected${NC}' || echo -e '${RED}Not connected${NC}')"
echo -e "   • Wi-Fi Scanning: $(system_profiler SPAirPortDataType | grep -q 'Current Network' && echo -e '${GREEN}Functional${NC}' || echo -e '${RED}Not functional${NC}')"

echo -e "\n${CYAN}✅ Verification complete!${NC}"
echo -e "\n${CYAN}📚 Next Steps:${NC}"
echo -e "   1. Configure HE tunnel: ${YELLOW}https://tunnelbroker.net${NC}"
echo -e "   2. Test IPv6 connectivity: ${YELLOW}ping6 google.com${NC}"
echo -e "   3. Connect to printers: ${YELLOW}System Preferences → Printers${NC}"
echo -e "\n${CYAN}📖 Documentation: https://github.com/tiaastor/tiation-macos-networking-guide${NC}"
