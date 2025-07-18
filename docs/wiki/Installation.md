# Installation Guide

This guide will walk you through installing the Tiation macOS Networking Guide on your macOS system.

## Prerequisites

Before installing, ensure you have:

- **macOS 14.0 or later** (macOS Sonoma or newer)
- **Terminal access** with administrative privileges
- **Internet connection** for downloading dependencies
- **Homebrew** (recommended for package management)

## Quick Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tiation/tiation-macos-networking-guide.git
cd tiation-macos-networking-guide
```

### 2. Run the Installation Script

```bash
./scripts/install.sh
```

This script will:
- Install the airport command
- Set up script permissions
- Create necessary directories
- Generate sample configuration files
- Verify system requirements

### 3. Verify Installation

```bash
./scripts/verify.sh
```

## Manual Installation

If you prefer to install manually:

### 1. Install Airport Command

```bash
sudo ln -sf /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/bin/airport
```

### 2. Set Script Permissions

```bash
chmod +x scripts/*.sh
chmod +x examples/*.sh
```

### 3. Create Directories

```bash
mkdir -p logs tmp config
```

### 4. Create Configuration

```bash
cp config/tunnel.conf.example config/tunnel.conf
```

## Configuration

### Basic Configuration

Edit `config/tunnel.conf` with your settings:

```bash
# Your public IPv4 address
CLIENT_IPV4="YOUR_PUBLIC_IP"

# Hurricane Electric settings
HE_SERVER_IPV4="216.66.80.26"
HE_SERVER_IPV6="2001:470:1f0a:1b4::1"
HE_CLIENT_IPV6="2001:470:1f0a:1b4::2"

# Tunnel interface
TUNNEL_INTERFACE="gif0"

# DNS servers
IPV6_DNS1="2001:4860:4860::8888"
IPV6_DNS2="2606:4700:4700::1111"
```

### Advanced Configuration

For advanced users, additional settings can be configured:

```bash
# Network monitoring
MONITOR_ENABLED=true
MONITOR_INTERVAL=30

# Logging
LOG_LEVEL="INFO"
LOG_FILE="logs/networking.log"

# Security
FIREWALL_ENABLED=true
INTRUSION_DETECTION=true
```

## System Requirements

### Hardware Requirements

- **Mac with Intel or Apple Silicon processor**
- **Minimum 4GB RAM** (8GB recommended)
- **1GB free disk space**
- **Network interface** (Wi-Fi or Ethernet)

### Software Requirements

- **macOS 14.0+** (Sonoma or newer)
- **Xcode Command Line Tools** (automatically installed)
- **Network adapter drivers** (usually pre-installed)

### Network Requirements

- **Internet connection** for initial setup
- **Public IPv4 address** for tunnel setup
- **Router configuration access** (if needed)

## Troubleshooting

### Common Issues

#### Permission Denied

```bash
# Fix permissions
sudo chown -R $(whoami):staff /usr/local/bin/airport
chmod +x scripts/*.sh
```

#### Airport Command Not Found

```bash
# Reinstall airport command
sudo rm -f /usr/local/bin/airport
sudo ln -sf /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/bin/airport
```

#### Script Execution Errors

```bash
# Check script permissions
ls -la scripts/
# Fix if needed
chmod +x scripts/*.sh
```

### System Compatibility

| macOS Version | Compatibility | Notes |
|---------------|---------------|--------|
| 14.0 Sonoma   | ✅ Full       | Recommended |
| 13.0 Ventura  | ⚠️ Partial   | Some features may not work |
| 12.0 Monterey | ❌ Limited    | Not recommended |
| 11.0 Big Sur  | ❌ No        | Not supported |

## Uninstallation

To remove the Tiation macOS Networking Guide:

```bash
# Remove airport command
sudo rm -f /usr/local/bin/airport

# Remove configuration files
rm -rf config/tunnel.conf
rm -rf logs/
rm -rf tmp/

# Remove the repository
cd ..
rm -rf tiation-macos-networking-guide
```

## Next Steps

After installation:

1. **Review the configuration** in `config/tunnel.conf`
2. **Run network analysis** with `./scripts/ipv6-analysis.sh`
3. **Set up your first tunnel** following the [IPv6 Tunneling Guide](IPv6-Tunneling.md)
4. **Explore examples** in the `examples/` directory

## Getting Help

If you encounter issues:

- Check the [Troubleshooting Guide](Troubleshooting.md)
- Review the [FAQ](FAQ.md)
- Open an issue on [GitHub](https://github.com/tiation/tiation-macos-networking-guide/issues)
- Join our [Discussions](https://github.com/tiation/tiation-macos-networking-guide/discussions)

---

**Next:** [IPv6 Tunneling Guide](IPv6-Tunneling.md)
