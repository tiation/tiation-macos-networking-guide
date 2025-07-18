# 🌐 Tiation macOS Networking Guide

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![macOS](https://img.shields.io/badge/macOS-14.0%2B-blue)](https://www.apple.com/macos/)
[![IPv6](https://img.shields.io/badge/IPv6-Ready-green)](https://ipv6.com/)
[![Terminal](https://img.shields.io/badge/Terminal-Dark%20Neon-cyan)](https://github.com/tiaastor)

![Tiation Networking Banner](assets/banner.png)

## 🚀 Overview

Enterprise-grade networking utilities and guides for macOS systems. This comprehensive toolkit provides professional-grade IPv6 tunnel configuration, Wi-Fi scanning, and offline printer connectivity solutions.

## 📋 Table of Contents

- [🔧 Installation](#-installation)
- [🌐 IPv6 Tunneling](#-ipv6-tunneling)
- [📡 Wi-Fi Scanning](#-wi-fi-scanning)
- [🖨️ Offline Printer Setup](#️-offline-printer-setup)
- [🏗️ Architecture](#️-architecture)
- [📊 Monitoring](#-monitoring)
- [🔒 Security](#-security)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🔧 Installation

### Prerequisites

- macOS 14.0 or later
- Terminal access with sudo privileges
- Network interface management permissions

### Quick Start

```bash
# Clone the repository
git clone https://github.com/tiaastor/tiation-macos-networking-guide.git
cd tiation-macos-networking-guide

# Run the installation script
./scripts/install.sh

# Verify installation
./scripts/verify.sh
```

## 🌐 IPv6 Tunneling

### Hurricane Electric Tunnel Setup

Configure IPv6 connectivity through Hurricane Electric's tunnel broker service.

![IPv6 Tunnel Architecture](assets/ipv6-tunnel-architecture.png)

#### 1. Network Analysis

```bash
# Check current IPv6 configuration
./scripts/ipv6-analysis.sh

# Sample output analysis
ifconfig | grep -A 5 -B 5 inet6
netstat -rn -f inet6
```

#### 2. Public IP Discovery

```bash
# Discover your public IPv4 endpoint
curl -s https://ipv4.icanhazip.com
```

#### 3. Tunnel Configuration

```bash
# Configure Hurricane Electric tunnel
sudo ifconfig gif0 create
sudo ifconfig gif0 tunnel {{YOUR_IPV4}} {{HE_SERVER_IPV4}}
sudo ifconfig gif0 inet6 {{CLIENT_IPV6}} {{SERVER_IPV6}} prefixlen 128
sudo route -n add -inet6 default {{SERVER_IPV6}}
```

#### 4. Connectivity Testing

```bash
# Test IPv6 connectivity
ping6 -c 3 2001:4860:4860::8888
ping6 -c 3 google.com
```

### Tunnel Architecture Diagram

```
┌─────────────────┐     IPv4 Tunnel     ┌─────────────────┐
│   Your Mac      │◄──────────────────►│ HE Server       │
│ IPv4: 49.x.x.x  │                    │ IPv4: 216.x.x.x │
│ IPv6: 2001:x:x  │                    │ IPv6: 2001:x:x  │
└─────────────────┘                    └─────────────────┘
        │                                       │
        └─────────► IPv6 Internet ◄─────────────┘
```

## 📡 Wi-Fi Scanning

### Airport Command Installation

The `airport` utility provides comprehensive Wi-Fi network scanning capabilities.

#### Installation Steps

```bash
# Install airport command
sudo ln -sf /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/bin/airport

# Verify installation
airport --version
```

#### Network Scanning

```bash
# Basic network scan
airport -s

# Detailed network information
system_profiler SPAirPortDataType

# List hardware ports
networksetup -listallhardwareports
```

### Modern Wi-Fi Diagnostics

```bash
# Use modern wdutil command
sudo wdutil info
sudo wdutil diagnose -q -f /tmp/wifi-diagnostics
```

## 🖨️ Offline Printer Setup

### Wi-Fi Direct Connection

Connect to printers without internet connectivity using Wi-Fi Direct.

![Printer Connection Methods](assets/printer-connections.png)

#### 1. Printer Discovery

```bash
# Scan for available printers
system_profiler SPAirPortDataType | grep -i "direct\|printer"

# List current printers
lpstat -p
```

#### 2. Wi-Fi Direct Connection

```bash
# Connect to printer's Wi-Fi Direct network
networksetup -setairportnetwork en0 "DIRECT-CB-HP ENVY Photo 6200"

# Verify connection
ping 192.168.1.1  # Common printer IP
```

#### 3. Printer Configuration

```bash
# Add printer via command line
sudo lpadmin -p PrinterName -E -v ipp://192.168.1.1/ipp/print

# Set as default printer
sudo lpadmin -d PrinterName
```

### Connection Methods

```
┌─────────────┐
│  Your Mac   │
│             │
└─────┬───────┘
      │
┌─────┴─────┐
│ Connection │
│  Methods   │
└─────┬─────┘
      │
┌─────┴─────────────────────────────────┐
│  USB  │  Wi-Fi Direct  │  Bluetooth  │
└───────┴────────────────┴─────────────┘
      │           │            │
┌─────┴─────┐ ┌───┴───┐ ┌─────┴─────┐
│  Printer  │ │Printer│ │  Printer  │
│ (Direct)  │ │(Adhoc)│ │(Wireless) │
└───────────┘ └───────┘ └───────────┘
```

## 🏗️ Architecture

### Network Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                Application Layer                        │
├─────────────────────────────────────────────────────────┤
│                Transport Layer                          │
├─────────────────────────────────────────────────────────┤
│         Network Layer (IPv4/IPv6)                      │
├─────────────────────────────────────────────────────────┤
│              Data Link Layer                           │
├─────────────────────────────────────────────────────────┤
│               Physical Layer                           │
└─────────────────────────────────────────────────────────┘
```

### Component Integration

- **IPv6 Tunnel Management**: Automated tunnel configuration and monitoring
- **Wi-Fi Diagnostics**: Comprehensive network analysis tools
- **Printer Management**: Enterprise-grade offline printing solutions
- **Security Monitoring**: Network security and intrusion detection

## 📊 Monitoring

### Network Performance Metrics

```bash
# Network interface statistics
netstat -i

# IPv6 routing table monitoring
netstat -rn -f inet6

# Wi-Fi signal strength monitoring
while true; do
    system_profiler SPAirPortDataType | grep -A 5 "Signal / Noise"
    sleep 5
done
```

### Automated Health Checks

```bash
# Run comprehensive network health check
./scripts/health-check.sh

# Generate network report
./scripts/generate-report.sh
```

## 🔒 Security

### Network Security Best Practices

1. **Tunnel Encryption**: All IPv6 traffic is encrypted through the tunnel
2. **Wi-Fi Security**: Use WPA3 when available, avoid open networks
3. **Printer Security**: Secure direct connections with proper authentication
4. **Access Control**: Implement network-level access controls

### Security Monitoring

```bash
# Monitor network connections
sudo netstat -an | grep ESTABLISHED

# Check for suspicious activity
sudo tcpdump -i en0 -n
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/tiation-macos-networking-guide.git

# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git commit -m "Add new feature"

# Push and create pull request
git push origin feature/new-feature
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [Tiation Terminal Workflows](https://github.com/tiaastor/tiation-terminal-workflows)
- [Tiation Docker Debian](https://github.com/tiaastor/tiation-docker-debian)
- [Tiation AI Platform](https://github.com/tiaastor/tiation-ai-platform)

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/tiaastor">Tiation</a></p>
  <p>⭐ Star this repository if it helped you!</p>
</div>
