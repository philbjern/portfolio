#!/usr/bin/python3

import nmap

SCAN_TYPES = ['SYN ACK Scan', 'UDP Scan', 'Comprehensive Scan']

def main():
  scanner = nmap.PortScanner()
  print(f"Nmap version: {scanner.nmap_version()}")

  target = input("Enter the target IP address or hostname: ")
  resp = input("""\nEnter the type of scan you want to perform:
    1) SYN ACK Scan
    2) UDP Scan
    3) Comprehensive Scan\n""")
  
  if resp not in ("1", "2", "3"):
    print("Invalid option. Please try again.")
    return

  print(f"Performing scan type {SCAN_TYPES[int(resp) - 1]} on {target}...")
  if resp == "1":
    scanner.scan(target, '1-1024', arguments="-v -sS")
    print(f"Open Ports: {scanner[target]['tcp'].keys()}")

  elif resp == "2":
    scanner.scan(target, '1-1024', arguments="-sU")
    print(f"Open Ports: {scanner[target]['udp'].keys()}")

  elif resp == "3":
    scanner.scan(target, '1-1024',  arguments="-v -sS -sV -sC -A -o")
    print(f"Open Ports: {scanner[target]['udp'].keys()}")

  print(scanner.scaninfo())
  print(f"IP status: {scanner[target].state()}")
  print(f"IP hostname: {scanner[target].hostname()}")
  print(scanner[target].all_protocols())
  print("Scan complete.")

if __name__ == "__main__":
  try:
    main()
  except KeyboardInterrupt:
    print("\nScan interrupted by user.")