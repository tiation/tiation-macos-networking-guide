# Frequently Asked Questions (FAQ)

## General Questions

### Q: What is the Tiation macOS Networking Guide?
**A:** The Tiation macOS Networking Guide is an enterprise-grade collection of tools, scripts, and documentation designed to help macOS users configure advanced networking features including IPv6 tunneling, Wi-Fi scanning, and offline printer connectivity.

### Q: What macOS versions are supported?
**A:** The guide officially supports macOS 14.0 (Sonoma) and later. Some features may work on macOS 13.0 (Ventura) but are not officially supported.

### Q: Is this guide free to use?
**A:** Yes! This project is open source and available under the MIT License. It's completely free to use for personal and commercial purposes.

### Q: Do I need programming knowledge to use this guide?
**A:** Basic terminal/command line knowledge is helpful but not required. The installation scripts are automated, and the documentation provides step-by-step instructions.

## Installation Questions

### Q: The installation script fails. What should I do?
**A:** First, ensure you have:
- macOS 14.0 or later
- Administrative privileges
- Internet connection
- Run `./scripts/verify.sh` to check system requirements

### Q: Do I need Homebrew to install this?
**A:** Homebrew is recommended but not required. The installation script handles most dependencies automatically.

### Q: Can I install this on multiple Macs?
**A:** Yes, you can install the guide on multiple Macs. Each installation is independent and can be configured separately.

### Q: How much disk space does this require?
**A:** The complete installation requires approximately 100MB of disk space, including dependencies and logs.

## IPv6 Tunneling Questions

### Q: What is IPv6 tunneling and why do I need it?
**A:** IPv6 tunneling allows you to access IPv6 services and websites when your ISP doesn't provide native IPv6 connectivity. It creates a tunnel through your existing IPv4 connection.

### Q: Is Hurricane Electric the only tunnel provider supported?
**A:** While the guide focuses on Hurricane Electric (free and reliable), the principles apply to other tunnel brokers. HE is recommended for beginners.

### Q: How do I get my public IPv4 address?
**A:** Run this command:
```bash
curl -s https://ipv4.icanhazip.com
```

### Q: Will IPv6 tunneling slow down my internet?
**A:** There may be a slight latency increase due to the tunnel overhead, but for most users, the impact is negligible.

### Q: Can I use multiple tunnels simultaneously?
**A:** Technically possible but not recommended. Multiple default routes can cause routing conflicts.

### Q: My tunnel stops working after sleep/wake. What should I do?
**A:** This is common. You can:
1. Restart the tunnel manually
2. Set up a LaunchDaemon for automatic reconnection
3. Use the tunnel broker's dynamic DNS service

## Wi-Fi and Networking Questions

### Q: The airport command shows "deprecated." Is this a problem?
**A:** The deprecation warning is normal. Apple deprecated the command but it still works. For newer alternatives, use `wdutil` or `system_profiler`.

### Q: Can I scan for hidden Wi-Fi networks?
**A:** The airport command can detect some hidden networks, but they may not show SSIDs. Use:
```bash
sudo airport -s
```

### Q: How do I connect to a Wi-Fi network from the command line?
**A:** Use:
```bash
networksetup -setairportnetwork en0 "NetworkName" "password"
```

### Q: What's the difference between airport and system_profiler?
**A:** 
- `airport`: Lightweight, fast scanning
- `system_profiler`: Comprehensive system information including detailed Wi-Fi data

## Printer Connectivity Questions

### Q: My printer doesn't show up in Wi-Fi Direct scanning. Why?
**A:** Ensure:
- Printer's Wi-Fi Direct is enabled
- Printer is in pairing mode
- You're scanning with the right interface
- Printer is compatible with Wi-Fi Direct

### Q: Can I print without any internet connection?
**A:** Yes! The guide covers several offline printing methods:
- Wi-Fi Direct
- USB connection
- Bluetooth (if supported)
- Ad-hoc Wi-Fi networks

### Q: How do I know if my printer supports Wi-Fi Direct?
**A:** Check your printer's manual or settings menu. Most modern printers (2015+) support Wi-Fi Direct. Look for "Wi-Fi Direct," "Direct Print," or "Mobile Print" options.

### Q: The printer IP address keeps changing. What should I do?
**A:** Set a static IP on your printer or use the printer's hostname instead of IP address when adding it to macOS.

## Security Questions

### Q: Is IPv6 tunneling secure?
**A:** IPv6 tunneling through Hurricane Electric uses standard protocols and is generally secure. However, traffic still passes through HE's servers, so avoid sensitive data if concerned.

### Q: Can others access my tunnel?
**A:** No, tunnels are point-to-point connections. Only you can use your specific tunnel configuration.

### Q: Should I enable the firewall with IPv6 tunneling?
**A:** Yes, it's recommended to enable macOS firewall for additional security, especially with IPv6 connectivity.

### Q: Are there any privacy concerns with Wi-Fi scanning?
**A:** Wi-Fi scanning is passive and doesn't connect to networks. It's similar to looking at available networks in System Preferences.

## Performance Questions

### Q: Why is my IPv6 connection slower than IPv4?
**A:** Several factors can affect performance:
- Tunnel server location
- Network congestion
- ISP routing
- IPv6 server locations

### Q: How can I test my IPv6 connectivity?
**A:** Use these commands:
```bash
ping6 -c 3 google.com
ping6 -c 3 2001:4860:4860::8888
curl -6 https://ipv6.google.com
```

### Q: Can I monitor my network performance?
**A:** Yes, use the included monitoring scripts:
```bash
./scripts/ipv6-analysis.sh
netstat -i
```

## Error Messages and Solutions

### Q: "Permission denied" when running scripts?
**A:** Make scripts executable:
```bash
chmod +x scripts/*.sh
```

### Q: "Command not found: airport"?
**A:** Install the airport command:
```bash
sudo ln -sf /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/bin/airport
```

### Q: "No route to host" when testing IPv6?
**A:** Check your tunnel configuration:
1. Verify tunnel endpoints
2. Check routing table
3. Ensure tunnel interface is up
4. Verify HE server connectivity

### Q: "Network is unreachable" error?
**A:** This usually indicates:
- Tunnel not properly configured
- Firewall blocking traffic
- ISP blocking tunnel protocols
- Incorrect IPv6 addresses

## Advanced Questions

### Q: Can I create custom scripts for automation?
**A:** Yes! The project includes examples and encourages custom scripts. Follow the coding standards in CONTRIBUTING.md.

### Q: How do I contribute to the project?
**A:** See our [Contributing Guide](CONTRIBUTING.md) for detailed instructions on submitting improvements.

### Q: Can I use this in a corporate environment?
**A:** Yes, the MIT license allows commercial use. However, check your company's IT policies regarding network modifications.

### Q: How do I backup my configuration?
**A:** Copy these files/directories:
- `config/tunnel.conf`
- `logs/` (if needed)
- Any custom scripts you've created

## Getting More Help

### Q: Where can I get additional support?
**A:** 
- Check the [Troubleshooting Guide](Troubleshooting.md)
- Search existing [GitHub Issues](https://github.com/tiation/tiation-macos-networking-guide/issues)
- Create a new issue with detailed information
- Join the [Discussions](https://github.com/tiation/tiation-macos-networking-guide/discussions)

### Q: How do I report bugs?
**A:** Open a GitHub issue with:
- macOS version
- Command that failed
- Complete error message
- Steps to reproduce
- Expected vs actual behavior

### Q: Can I request new features?
**A:** Yes! Feature requests are welcome. Open a GitHub issue with:
- Use case description
- Proposed solution
- Why it would be beneficial
- Implementation ideas (if any)

---

**Still have questions?** Check our [Troubleshooting Guide](Troubleshooting.md) or open an issue on [GitHub](https://github.com/tiation/tiation-macos-networking-guide/issues).

**Next:** [Troubleshooting Guide](Troubleshooting.md)
