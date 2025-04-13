#!/usr/bin/python3

import socket

TARGET_IP = "137.74.187.100"
TARGET_PORT = 21

def main():
  # Create a socket object
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

  # Set a timeout for the socket
  s.settimeout(5)

  # Get the target IP address and port from the user
  # ip = input('Enter the target IP address: ')
  # port = int(input('Enter the target port: '))

  ip = TARGET_IP
  port = TARGET_PORT

  # Connect to the target IP address and port
  if s.connect_ex((ip, port)):
    print(f"Port {port} is closed.")
    return
  else:
    print(f"Connected to {ip}:{port}")
    print(f"Port {port} is open.")
  
  # Close the socket connection
  s.close()
  
  print("Connection closed.")


if __name__ == "__main__":
  try:
    main()
  except KeyboardInterrupt:
    print("\nPort scanner interrupted by user.")
  except socket.error as e:
    print(f"Socket error: {e}")
  except Exception as e:
    print(f"An unexpected error occurred: {e}")
  finally:
    print("Exiting...")