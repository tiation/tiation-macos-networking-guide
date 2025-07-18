# IPv6 Tunneling Guide

This comprehensive guide covers setting up IPv6 tunneling using Hurricane Electric's free tunnel broker service.

## Overview

IPv6 tunneling allows you to access IPv6 services when your ISP doesn't provide native IPv6 connectivity. It creates a tunnel through your existing IPv4 connection to Hurricane Electric's servers, giving you full IPv6 internet access.

## Prerequisites

- macOS 14.0 or later
- Active IPv4 internet connection
- Administrative privileges
- Public IPv4 address (not behind NAT)

## Step 1: Account Setup

### Register with Hurricane Electric

1. Visit [Hurricane Electric Tunnel Broker](https://tunnelbroker.net/)
2. Create a free account
3. Verify your email address
4. Log in to the control panel

### Create a New Tunnel

1. Click "Create Regular Tunnel"
2. Enter your public IPv4 address
3. Choose a tunnel server location (closest for best performance)
4. Click "Create Tunnel"

## Step 2: Get Your Public IPv4 Address

```bash
# Discover your public IPv4 address
curl -s https://ipv4.icanhazip.com

# Alternative methods
curl -s https://ipv4.icanhazip.com
dig +short myip.opendns.com @resolver1.opendns.com
```

## Step 3: Tunnel Configuration

After creating your tunnel, Hurricane Electric will provide:

- **Server IPv4 Address**: HE's tunnel server
- **Server IPv6 Address**: HE's IPv6 endpoint
- **Client IPv4 Address**: Your public IP
- **Client IPv6 Address**: Your tunnel endpoint
- **Routed /64**: Optional subnet for local networks

### Example Configuration

```bash
# Example values from HE tunnel broker
CLIENT_IPV4="203.0.113.1"           # Your public IP
HE_SERVER_IPV4="216.66.80.26"       # HE server IP
HE_SERVER_IPV6="2001:470:1f0a:1b4::1"  # HE IPv6 endpoint
HE_CLIENT_IPV6="2001:470:1f0a:1b4::2"  # Your IPv6 endpoint
ROUTED_64="2001:470:1f0b:1b4::/64"     # Optional routed subnet
```

## Step 4: Manual Tunnel Setup

### Create the Tunnel Interface

```bash
# Create gif0 interface
sudo ifconfig gif0 create

# Configure tunnel endpoints
sudo ifconfig gif0 tunnel ${CLIENT_IPV4} ${HE_SERVER_IPV4}

# Set IPv6 addresses
sudo ifconfig gif0 inet6 ${HE_CLIENT_IPV6} ${HE_SERVER_IPV6} prefixlen 128

# Bring interface up
sudo ifconfig gif0 up

# Add default IPv6 route
sudo route -n add -inet6 default ${HE_SERVER_IPV6}
```

### Verify Configuration

```bash
# Check interface status
ifconfig gif0

# Check routing table
netstat -rn -f inet6

# Test IPv6 connectivity
ping6 -c 3 2001:4860:4860::8888
ping6 -c 3 google.com
```

## Step 5: Automated Setup

### Using the Example Script

```bash
# Copy and edit the example script
cp examples/he-tunnel-setup.sh my-tunnel.sh

# Edit with your tunnel details
nano my-tunnel.sh

# Run the script
chmod +x my-tunnel.sh
./my-tunnel.sh
```

### Script Template

```bash
#!/bin/bash

# Your tunnel configuration
CLIENT_IPV4="YOUR_PUBLIC_IP"
HE_SERVER_IPV4="216.66.80.26"
HE_SERVER_IPV6="2001:470:1f0a:1b4::1"
HE_CLIENT_IPV6="2001:470:1f0a:1b4::2"

# Setup tunnel
sudo ifconfig gif0 create
sudo ifconfig gif0 tunnel ${CLIENT_IPV4} ${HE_SERVER_IPV4}
sudo ifconfig gif0 inet6 ${HE_CLIENT_IPV6} ${HE_SERVER_IPV6} prefixlen 128
sudo ifconfig gif0 up
sudo route -n add -inet6 default ${HE_SERVER_IPV6}

# Test connectivity
ping6 -c 3 2001:4860:4860::8888
```

## Step 6: Persistent Configuration

### Method 1: LaunchDaemon (Recommended)

Create a system-wide service that starts on boot:

```bash
# Create the LaunchDaemon
sudo tee /Library/LaunchDaemons/com.tiation.ipv6tunnel.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.tiation.ipv6tunnel</string>
    <key>ProgramArguments</key>
    <array>
        <string>/path/to/your/tunnel-script.sh</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/var/log/ipv6tunnel.log</string>
    <key>StandardErrorPath</key>
    <string>/var/log/ipv6tunnel.log</string>
</dict>
</plist>
EOF

# Load the LaunchDaemon
sudo launchctl load /Library/LaunchDaemons/com.tiation.ipv6tunnel.plist
```

### Method 2: Login Items

For user-specific startup:

```bash
# Create user LaunchAgent
mkdir -p ~/Library/LaunchAgents
tee ~/Library/LaunchAgents/com.tiation.ipv6tunnel.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.tiation.ipv6tunnel</string>
    <key>ProgramArguments</key>
    <array>
        <string>/path/to/your/tunnel-script.sh</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
EOF

# Load the LaunchAgent
launchctl load ~/Library/LaunchAgents/com.tiation.ipv6tunnel.plist
```

## Step 7: Testing and Validation

### Basic Connectivity Tests

```bash
# Test IPv6 loopback
ping6 -c 3 ::1

# Test tunnel endpoint
ping6 -c 3 2001:470:1f0a:1b4::1

# Test external IPv6
ping6 -c 3 2001:4860:4860::8888
ping6 -c 3 google.com

# Test IPv6 web access
curl -6 https://ipv6.google.com
```

### Advanced Testing

```bash
# Check IPv6 DNS resolution
nslookup google.com 2001:4860:4860::8888

# Test IPv6 traceroute
traceroute6 google.com

# Monitor IPv6 traffic
sudo tcpdump -i gif0 -n

# Check IPv6 connectivity score
curl -6 -s https://test-ipv6.com/json/ | jq
```

## Step 8: Performance Optimization

### DNS Configuration

```bash
# Add IPv6 DNS servers
sudo networksetup -setdnsservers "Wi-Fi" 2001:4860:4860::8888 2001:4860:4860::8844 8.8.8.8

# Verify DNS configuration
scutil --dns | grep nameserver
```

### MTU Optimization

```bash
# Check current MTU
ifconfig gif0 | grep mtu

# Test optimal MTU size
ping6 -c 3 -s 1472 google.com

# Set optimal MTU
sudo ifconfig gif0 mtu 1480
```

### Tunnel Server Selection

Choose the closest server for best performance:

- **North America**: us-ca.tunnel.tserv6.fra1.ipv6.he.net
- **Europe**: nl.tunnel.tserv6.fra1.ipv6.he.net
- **Asia**: sg.tunnel.tserv6.fra1.ipv6.he.net

## Common Issues and Solutions

### Tunnel Stops After Sleep

```bash
# Create sleep/wake handler
sudo tee /Library/LaunchDaemons/com.tiation.tunnel-watcher.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.tiation.tunnel-watcher</string>
    <key>ProgramArguments</key>
    <array>
        <string>/path/to/tunnel-watcher.sh</string>
    </array>
    <key>WatchPaths</key>
    <array>
        <string>/var/run/resolv.conf</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
EOF
```

### NAT/Firewall Issues

```bash
# Check if behind NAT
curl -s https://ipv4.icanhazip.com
ifconfig | grep "inet " | grep -v "127.0.0.1"

# Test connectivity to HE servers
ping -c 3 216.66.80.26
traceroute 216.66.80.26
```

### Multiple Tunnels

```bash
# Use different interfaces for multiple tunnels
sudo ifconfig gif1 create
sudo ifconfig gif1 tunnel ${CLIENT_IPV4} ${HE_SERVER_IPV4_2}
sudo ifconfig gif1 inet6 ${HE_CLIENT_IPV6_2} ${HE_SERVER_IPV6_2} prefixlen 128
```

## Monitoring and Maintenance

### Monitor Tunnel Status

```bash
# Check tunnel status
ifconfig gif0 | grep -E "(status|inet6)"

# Monitor tunnel traffic
netstat -i | grep gif0

# Check routing table
netstat -rn -f inet6 | grep default
```

### Automated Health Checks

```bash
#!/bin/bash
# tunnel-health-check.sh

TUNNEL_ENDPOINT="2001:470:1f0a:1b4::1"
LOG_FILE="/var/log/tunnel-health.log"

if ! ping6 -c 1 -W 5000 ${TUNNEL_ENDPOINT} > /dev/null 2>&1; then
    echo "$(date): Tunnel down, restarting..." >> ${LOG_FILE}
    sudo ifconfig gif0 destroy
    sudo ifconfig gif0 create
    # ... restart tunnel configuration
else
    echo "$(date): Tunnel healthy" >> ${LOG_FILE}
fi
```

## Security Considerations

### Firewall Configuration

```bash
# Enable macOS firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Allow IPv6 traffic
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/sbin/ping6
```

### IPv6 Privacy

```bash
# Disable IPv6 privacy extensions if needed
sudo sysctl -w net.inet6.ip6.use_tempaddr=0

# Check IPv6 privacy settings
sysctl net.inet6.ip6.use_tempaddr
```

## Troubleshooting

### Common Error Messages

1. **"No route to host"**
   - Check tunnel configuration
   - Verify public IP address
   - Test HE server connectivity

2. **"Network is unreachable"**
   - Check routing table
   - Verify tunnel interface is up
   - Check firewall settings

3. **"Permission denied"**
   - Run with sudo
   - Check script permissions
   - Verify admin privileges

### Diagnostic Commands

```bash
# Complete diagnostic
./scripts/ipv6-analysis.sh

# Manual diagnostics
ifconfig gif0
netstat -rn -f inet6
ping6 -c 3 ::1
ping6 -c 3 2001:4860:4860::8888
```

## Advanced Configuration

### Using Routed /64 Subnet

```bash
# Configure routed subnet on local interface
sudo ifconfig en0 inet6 2001:470:1f0b:1b4::1/64

# Enable IPv6 forwarding
sudo sysctl -w net.inet6.ip6.forwarding=1
```

### Dynamic IP Updates

```bash
# Update tunnel with new IP
curl -4 "https://ipv4.tunnelbroker.net/nic/update?username=YOUR_USERNAME&password=YOUR_PASSWORD&hostname=YOUR_TUNNEL_ID"
```

## Performance Benchmarking

```bash
# Test IPv6 vs IPv4 performance
time curl -4 -s https://google.com > /dev/null
time curl -6 -s https://google.com > /dev/null

# Network speed test
speedtest-cli --server 12345  # IPv4
speedtest-cli --server 12345 --ipv6  # IPv6
```

---

**Next Steps:**
- Configure [Wi-Fi Scanning](Wi-Fi-Scanning.md)
- Set up [Offline Printing](Offline-Printing.md)
- Review [Troubleshooting](Troubleshooting.md) for common issues

**Need Help?** Check the [FAQ](FAQ.md) or open an issue on [GitHub](https://github.com/tiation/tiation-macos-networking-guide/issues).
