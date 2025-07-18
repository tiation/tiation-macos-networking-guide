# Troubleshooting Guide

This guide helps you diagnose and solve common issues with the Tiation macOS Networking Guide.

## Quick Diagnostics

### Step 1: Run System Verification
```bash
./scripts/verify.sh
```

### Step 2: Check Network Analysis
```bash
./scripts/ipv6-analysis.sh
```

### Step 3: Review System Requirements
- macOS 14.0+ (Sonoma or newer)
- Administrative privileges
- Active internet connection
- Network interface access

## Installation Issues

### Issue: Installation Script Fails
**Symptoms:**
- Script exits with error code
- Permission denied messages
- Missing dependencies

**Solutions:**
1. **Check macOS version:**
   ```bash
   sw_vers -productVersion
   ```
   Ensure you're running macOS 14.0 or later.

2. **Verify admin privileges:**
   ```bash
   sudo -l
   ```
   You should see your permissions listed.

3. **Check internet connectivity:**
   ```bash
   ping -c 3 google.com
   ```

4. **Clear previous installations:**
   ```bash
   sudo rm -f /usr/local/bin/airport
   rm -rf config/tunnel.conf
   ```

### Issue: Airport Command Installation Fails
**Symptoms:**
- `airport: command not found`
- Symlink creation fails
- Permission errors

**Solutions:**
1. **Manual installation:**
   ```bash
   sudo ln -sf /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/bin/airport
   ```

2. **Check if binary exists:**
   ```bash
   ls -la /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport
   ```

3. **Alternative installation location:**
   ```bash
   sudo ln -sf /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/bin/airport
   ```

4. **Fix permissions:**
   ```bash
   sudo chown root:wheel /usr/local/bin/airport
   sudo chmod +x /usr/local/bin/airport
   ```

### Issue: Script Permissions
**Symptoms:**
- `Permission denied` when running scripts
- Scripts won't execute

**Solutions:**
1. **Make scripts executable:**
   ```bash
   chmod +x scripts/*.sh
   chmod +x examples/*.sh
   ```

2. **Check script permissions:**
   ```bash
   ls -la scripts/
   ```

3. **Fix ownership:**
   ```bash
   sudo chown $(whoami):staff scripts/*.sh
   ```

## IPv6 Tunneling Issues

### Issue: Tunnel Creation Fails
**Symptoms:**
- `ifconfig: gif0: bad value`
- Interface creation errors
- Permission denied

**Solutions:**
1. **Check if interface exists:**
   ```bash
   ifconfig gif0
   ```

2. **Destroy existing interface:**
   ```bash
   sudo ifconfig gif0 destroy
   ```

3. **Create interface with specific number:**
   ```bash
   sudo ifconfig gif1 create
   ```

4. **Check system limits:**
   ```bash
   sysctl -a | grep gif
   ```

### Issue: Tunnel Configuration Fails
**Symptoms:**
- `No route to host`
- `Network is unreachable`
- Invalid configuration errors

**Solutions:**
1. **Verify your public IP:**
   ```bash
   curl -s https://ipv4.icanhazip.com
   ```

2. **Check HE server connectivity:**
   ```bash
   ping -c 3 216.66.80.26
   ```

3. **Verify tunnel endpoints:**
   ```bash
   ifconfig gif0
   ```

4. **Check routing table:**
   ```bash
   netstat -rn -f inet6
   ```

5. **Test tunnel configuration:**
   ```bash
   sudo ifconfig gif0 destroy
   sudo ifconfig gif0 create
   sudo ifconfig gif0 tunnel YOUR_IP HE_SERVER_IP
   sudo ifconfig gif0 inet6 CLIENT_IPV6 SERVER_IPV6 prefixlen 128
   ```

### Issue: IPv6 Connectivity Problems
**Symptoms:**
- Can't ping IPv6 addresses
- No IPv6 internet access
- DNS resolution fails

**Solutions:**
1. **Test loopback:**
   ```bash
   ping6 -c 3 ::1
   ```

2. **Test link-local:**
   ```bash
   ping6 -c 3 fe80::1%lo0
   ```

3. **Test tunnel endpoint:**
   ```bash
   ping6 -c 3 2001:470:1f0a:1b4::1
   ```

4. **Test external IPv6:**
   ```bash
   ping6 -c 3 2001:4860:4860::8888
   ```

5. **Check DNS configuration:**
   ```bash
   scutil --dns | grep nameserver
   ```

6. **Add IPv6 DNS manually:**
   ```bash
   sudo networksetup -setdnsservers "Wi-Fi" 2001:4860:4860::8888 8.8.8.8
   ```

### Issue: Tunnel Stops Working After Sleep
**Symptoms:**
- Tunnel works initially
- Fails after Mac sleeps/wakes
- Intermittent connectivity

**Solutions:**
1. **Create restart script:**
   ```bash
   cat > restart-tunnel.sh << 'EOF'
   #!/bin/bash
   sudo ifconfig gif0 destroy
   sudo ifconfig gif0 create
   sudo ifconfig gif0 tunnel YOUR_IP HE_SERVER_IP
   sudo ifconfig gif0 inet6 CLIENT_IPV6 SERVER_IPV6 prefixlen 128
   sudo route -n add -inet6 default SERVER_IPV6
   EOF
   chmod +x restart-tunnel.sh
   ```

2. **Create LaunchDaemon for persistence:**
   ```bash
   sudo tee /Library/LaunchDaemons/com.tiation.tunnel.plist << 'EOF'
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>Label</key>
       <string>com.tiation.tunnel</string>
       <key>ProgramArguments</key>
       <array>
           <string>/path/to/restart-tunnel.sh</string>
       </array>
       <key>RunAtLoad</key>
       <true/>
       <key>KeepAlive</key>
       <true/>
   </dict>
   </plist>
   EOF
   ```

3. **Load LaunchDaemon:**
   ```bash
   sudo launchctl load /Library/LaunchDaemons/com.tiation.tunnel.plist
   ```

## Wi-Fi and Network Scanning Issues

### Issue: Airport Command Not Working
**Symptoms:**
- `airport: command not found`
- Deprecation warnings
- No network results

**Solutions:**
1. **Use alternative commands:**
   ```bash
   system_profiler SPAirPortDataType
   ```

2. **Use modern diagnostics:**
   ```bash
   sudo wdutil info
   ```

3. **Check Wi-Fi interface:**
   ```bash
   networksetup -listallhardwareports
   ```

4. **Scan with networksetup:**
   ```bash
   networksetup -listallhardwareports | grep -A 1 "Wi-Fi"
   ```

### Issue: No Networks Found
**Symptoms:**
- Empty scan results
- No Wi-Fi networks visible
- Interface not detected

**Solutions:**
1. **Check Wi-Fi is enabled:**
   ```bash
   networksetup -getairportpower en0
   ```

2. **Enable Wi-Fi:**
   ```bash
   networksetup -setairportpower en0 on
   ```

3. **Check interface status:**
   ```bash
   ifconfig en0
   ```

4. **Restart Wi-Fi:**
   ```bash
   sudo ifconfig en0 down
   sudo ifconfig en0 up
   ```

5. **Reset network settings:**
   ```bash
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```

### Issue: Permission Denied for Network Commands
**Symptoms:**
- `Operation not permitted`
- `Permission denied`
- Administrative access required

**Solutions:**
1. **Run with sudo:**
   ```bash
   sudo airport -s
   sudo wdutil info
   ```

2. **Check System Preferences:**
   - Go to System Preferences > Security & Privacy
   - Grant Terminal full disk access if needed

3. **Reset permissions:**
   ```bash
   sudo chmod +x /usr/local/bin/airport
   ```

## Printer Connectivity Issues

### Issue: Printer Not Detected
**Symptoms:**
- No printers in Wi-Fi Direct scan
- Printer not responding
- Connection timeouts

**Solutions:**
1. **Check printer Wi-Fi Direct:**
   - Enable Wi-Fi Direct on printer
   - Put printer in pairing mode
   - Check printer manual for instructions

2. **Scan for printer networks:**
   ```bash
   system_profiler SPAirPortDataType | grep -i "direct"
   ```

3. **Check printer IP range:**
   ```bash
   nmap -sn 192.168.1.0/24
   ```

4. **Test printer connectivity:**
   ```bash
   ping 192.168.1.1
   telnet 192.168.1.1 9100
   ```

### Issue: Can't Connect to Printer
**Symptoms:**
- Connection fails
- Authentication errors
- Network unreachable

**Solutions:**
1. **Connect to printer network:**
   ```bash
   networksetup -setairportnetwork en0 "DIRECT-XX-PrinterName"
   ```

2. **Check IP assignment:**
   ```bash
   ifconfig en0 | grep inet
   ```

3. **Test printer services:**
   ```bash
   lpstat -p
   lpstat -t
   ```

4. **Add printer manually:**
   ```bash
   sudo lpadmin -p TestPrinter -E -v ipp://192.168.1.1/ipp/print
   ```

### Issue: Printing Fails
**Symptoms:**
- Jobs stuck in queue
- Printer errors
- No output

**Solutions:**
1. **Check printer status:**
   ```bash
   lpstat -p
   lpq
   ```

2. **Clear print queue:**
   ```bash
   cancel -a
   ```

3. **Restart print service:**
   ```bash
   sudo launchctl stop org.cups.cupsd
   sudo launchctl start org.cups.cupsd
   ```

4. **Check CUPS web interface:**
   Open http://localhost:631 in browser

## Performance Issues

### Issue: Slow Network Performance
**Symptoms:**
- High latency
- Low throughput
- Timeouts

**Solutions:**
1. **Test network speed:**
   ```bash
   ping -c 10 google.com
   ```

2. **Check interface statistics:**
   ```bash
   netstat -i
   ```

3. **Monitor network activity:**
   ```bash
   nettop
   ```

4. **Check for interference:**
   ```bash
   system_profiler SPAirPortDataType | grep -A 5 "Current Network"
   ```

### Issue: High CPU Usage
**Symptoms:**
- System slowdown
- Fan noise
- High processor usage

**Solutions:**
1. **Check running processes:**
   ```bash
   top -o cpu
   ```

2. **Monitor network processes:**
   ```bash
   lsof -i
   ```

3. **Check system logs:**
   ```bash
   tail -f /var/log/system.log
   ```

4. **Restart network services:**
   ```bash
   sudo launchctl kickstart -k system/com.apple.networkd
   ```

## System-Level Issues

### Issue: System Integrity Protection (SIP)
**Symptoms:**
- `Operation not permitted`
- Can't modify system files
- Protection errors

**Solutions:**
1. **Check SIP status:**
   ```bash
   csrutil status
   ```

2. **Work within SIP constraints:**
   - Use `/usr/local/bin/` instead of `/usr/bin/`
   - Avoid modifying system directories
   - Use user-space alternatives

3. **Alternative approaches:**
   ```bash
   # Instead of modifying system files
   echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
   ```

### Issue: Kernel Extension Problems
**Symptoms:**
- Network interfaces not loading
- System crashes
- Kernel panics

**Solutions:**
1. **Check loaded extensions:**
   ```bash
   kextstat | grep -i network
   ```

2. **Check system logs:**
   ```bash
   dmesg | grep -i error
   ```

3. **Reset network stack:**
   ```bash
   sudo kextunload -b com.apple.iokit.IONetworkingFamily
   sudo kextload -b com.apple.iokit.IONetworkingFamily
   ```

## Getting Help

### Collecting Diagnostic Information
When reporting issues, include:

1. **System information:**
   ```bash
   sw_vers
   uname -a
   ```

2. **Network configuration:**
   ```bash
   ifconfig
   netstat -rn
   ```

3. **Error messages:**
   ```bash
   tail -50 /var/log/system.log
   ```

4. **Script output:**
   ```bash
   ./scripts/verify.sh > diagnostic.txt 2>&1
   ```

### Support Channels
- **GitHub Issues:** [Report bugs and issues](https://github.com/tiation/tiation-macos-networking-guide/issues)
- **Discussions:** [Community support](https://github.com/tiation/tiation-macos-networking-guide/discussions)
- **Documentation:** [FAQ](FAQ.md) and [Installation Guide](Installation.md)

### Before Reporting Issues
1. Check the [FAQ](FAQ.md) for common solutions
2. Run the verification script
3. Search existing GitHub issues
4. Include system information and error messages
5. Provide steps to reproduce the problem

---

**Still having issues?** Open a [GitHub issue](https://github.com/tiation/tiation-macos-networking-guide/issues) with detailed information about your problem.

**Next:** [FAQ](FAQ.md)
