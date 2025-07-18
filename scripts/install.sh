#!/bin/bash

# Tiation macOS Networking Guide Installation Script
# Installs all necessary components for enterprise networking

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 Tiation macOS Networking Guide Installer${NC}"
echo -e "${CYAN}===========================================${NC}"

# Function to print section headers
print_section() {
    echo -e "\n${BLUE}📋 $1${NC}"
    echo -e "${BLUE}$(printf '%*s' ${#1} '' | tr ' ' '-')${NC}"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        echo -e "${RED}❌ Please do not run this script as root${NC}"
        echo -e "   Run: ./scripts/install.sh"
        exit 1
    fi
}

# Function to install airport command
install_airport() {
    print_section "Installing Airport Command"
    
    if [[ -f "/usr/local/bin/airport" ]]; then
        echo -e "${GREEN}✅ Airport command already installed${NC}"
        return 0
    fi
    
    echo -e "${YELLOW}🔧 Installing airport command...${NC}"
    
    # Check if airport binary exists
    if [[ ! -f "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport" ]]; then
        echo -e "${RED}❌ Airport binary not found in system${NC}"
        return 1
    fi
    
    # Create symlink
    sudo ln -sf /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/bin/airport
    
    # Verify installation
    if airport --version &>/dev/null; then
        echo -e "${GREEN}✅ Airport command installed successfully${NC}"
    else
        echo -e "${RED}❌ Airport command installation failed${NC}"
        return 1
    fi
}

# Function to set up scripts permissions
setup_permissions() {
    print_section "Setting Up Script Permissions"
    
    echo -e "${YELLOW}🔐 Setting executable permissions...${NC}"
    chmod +x scripts/*.sh
    
    echo -e "${GREEN}✅ Script permissions configured${NC}"
}

# Function to create necessary directories
create_directories() {
    print_section "Creating Directory Structure"
    
    # Create directories if they don't exist
    mkdir -p logs
    mkdir -p tmp
    mkdir -p config
    
    echo -e "${GREEN}✅ Directory structure created${NC}"
}

# Function to check system requirements
check_requirements() {
    print_section "Checking System Requirements"
    
    # Check macOS version
    if [[ $(sw_vers -productVersion | cut -d. -f1) -lt 14 ]]; then
        echo -e "${YELLOW}⚠️  macOS 14.0+ recommended for optimal performance${NC}"
    else
        echo -e "${GREEN}✅ macOS version compatible${NC}"
    fi
    
    # Check required commands
    local commands=("ifconfig" "netstat" "ping6" "curl" "system_profiler")
    
    for cmd in "${commands[@]}"; do
        if command -v "$cmd" &>/dev/null; then
            echo -e "${GREEN}✅ $cmd available${NC}"
        else
            echo -e "${RED}❌ $cmd not found${NC}"
        fi
    done
}

# Function to create sample configuration
create_sample_config() {
    print_section "Creating Sample Configuration"
    
    cat > config/tunnel.conf << EOF
# Tiation macOS Networking Guide Configuration
# Hurricane Electric Tunnel Configuration Template

# Your public IPv4 address (auto-detected)
CLIENT_IPV4="$(curl -s --max-time 10 https://ipv4.icanhazip.com || echo 'AUTO_DETECT')"

# HE Server settings (replace with your tunnel details)
HE_SERVER_IPV4="216.66.80.26"
HE_SERVER_IPV6="2001:470:1f0a:1b4::1"
HE_CLIENT_IPV6="2001:470:1f0a:1b4::2"

# Tunnel interface
TUNNEL_INTERFACE="gif0"

# DNS servers
IPV6_DNS1="2001:4860:4860::8888"
IPV6_DNS2="2606:4700:4700::1111"
EOF
    
    echo -e "${GREEN}✅ Sample configuration created in config/tunnel.conf${NC}"
}

# Main installation function
main() {
    echo -e "${CYAN}Starting installation...${NC}"
    
    # Check if running as root
    check_root
    
    # Check system requirements
    check_requirements
    
    # Create directories
    create_directories
    
    # Install airport command
    install_airport
    
    # Set up permissions
    setup_permissions
    
    # Create sample configuration
    create_sample_config
    
    print_section "Installation Complete"
    echo -e "${GREEN}🎉 Tiation macOS Networking Guide installed successfully!${NC}"
    echo -e "\n${CYAN}📖 Next Steps:${NC}"
    echo -e "   1. Review the configuration: ${YELLOW}config/tunnel.conf${NC}"
    echo -e "   2. Run network analysis: ${YELLOW}./scripts/ipv6-analysis.sh${NC}"
    echo -e "   3. Set up HE tunnel: ${YELLOW}https://tunnelbroker.net${NC}"
    echo -e "   4. Test connectivity: ${YELLOW}./scripts/verify.sh${NC}"
    echo -e "\n${CYAN}📚 Documentation: https://github.com/tiaastor/tiation-macos-networking-guide${NC}"
}

# Run main function
main "$@"
