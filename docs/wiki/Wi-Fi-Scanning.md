# Wi-Fi Scanning Guide

This detailed guide will help you utilize Wi-Fi scanning and diagnostics using macOS tools.

## Overview

Wi-Fi scanning allows you to identify available networks, monitor signal strength, and troubleshoot connectivity problems. This guide covers the usage of Apple's `airport` command for quick scanning and `system_profiler` for detailed analysis.

## Prerequisites

- macOS 14.0 or later
- Administrative privileges for some commands
- Terminal access
- Wi-Fi enabled on your Mac

## Quick Scanning with Airport

### Install the Airport Utility

```bash
# Create symlink for airport utility
sudo ln -sf /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/bin/airport
```

### Basic Wi-Fi Scanning

Scan for available Wi-Fi networks:

```bash
# Basic scan
airport -s

# Scan with verbose output
airport -s -v
```

### Investigate Individual Networks

```bash
# Get detailed network information
airport -I
```

## Detailed Analysis with System Profiler

### Wi-Fi Hardware Details

```bash
# List all Wi-Fi hardware details
system_profiler SPAirPortDataType

# Find specific interface information
system_profiler SPAirPortDataType | grep -A 10 "Network"
```

### Analyze Current Connections

```bash
# View detailed connection information
system_profiler SPAirPortDataType | grep -B 5 "Current Network Information"
```

## Advanced Scanning with WDUTIL

### Modern Diagnostics

```bash
# Display Wi-Fi and system diagnostics
sudo wdutil info

# Run comprehensive diagnostics
sudo wdutil diagnose -q -f /tmp/wifi-diagnostics
```

### Analyze Diagnostic Output

Log files and analysis can be found in `/tmp/wifi-diagnostics`.

## Connecting to Wi-Fi Networks

### Using NetworkSetup

Connect to a network manually:

```bash
# Connect to a specific network
networksetup -setairportnetwork en0 "NETWORK_NAME" "PASSWORD"

# Check current network status
networksetup -getairportnetwork en0

# Disconnect from current network
networksetup -removepreferredwirelessnetwork en0 "NETWORK_NAME"
```

## Monitoring Wi-Fi Performance

### Signal Strength and Noise

Monitor signal quality over time:

```bash
# Continuously monitor signal and noise
watch -n 1 "system_profiler SPAirPortDataType | grep -A 5 'Signal / Noise'"
```

### Channel Utilization

Watch for channel congestion:

```bash
# View channel usage and interference
airport -c
```

## Troubleshooting Common Issues

### No Networks Found

- **Check if Wi-Fi is enabled**: 
  ```bash
  networksetup -getairportpower en0
  ```
- **Enable Wi-Fi if needed**:
  ```bash
  networksetup -setairportpower en0 on
  ```

### Unable to Connect to Network

- **Verify password**: Ensure the correct password is used.
- **Reduce interference**: Move closer to the access point, avoid obstacles.
- **Try different bands**: Switch between 2.4GHz and 5GHz.

### Weak Signal Strength

- **Reposition device**: Closer proximity can improve signal.
- **Check external factors**: Metal objects, microwaves, and walls disrupt signals.
- **Use external antennas**: If available on router.

## Enhancing Wi-Fi Security

### Recommended Security Practices

- **Use WPA3 Encryption**: Secure your home or office network.
- **Disable WPS**: Prevent unauthorized access.
- **Change default passwords**: Avoid using router defaults.

### Regular Maintenance

- **Regular firmware updates**: Ensure your router uses the latest security patches.
- **Weekly scans**: Monitor network behavior and unusual connections.

### Final Thoughts

Always think about security and continually monitor your Wi-Fi environment.

## Need Help?

Explore additional [Troubleshooting](Troubleshooting.md) tips or view our [FAQ](FAQ.md).

**Still have questions?** Join our [Discussions](https://github.com/tiation/tiation-macos-networking-guide/discussions).

