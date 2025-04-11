#!/usr/bin/python3

import socket

def main():
  s = socket.socket()
  s.settimeout(5)

  ip = input('Enter the target IP address: ')
  port = int(input('Enter the target port: '))
  s.connect((ip, port))
  print(f"Connected to {ip}:{port}")
  banner = s.recv(1024)
  print(f"Banner: {banner.decode().strip()}")
  s.close()

  print("Connection closed.")
  print("Banner grabbing complete.")


if __name__ == "__main__":
  try:
    main()
  except KeyboardInterrupt:
    print("\nBanner grabbing interrupted by user.")
  except socket.error as e:
    print(f"Socket error: {e}")
  except Exception as e:
    print(f"An unexpected error occurred: {e}")
  finally:
    print("Exiting...")
    print("Thank you for using the banner grabber!")
    print("Goodbye!")
    print("Have a great day!")
    print("Stay safe online!")
    print("Keep learning and improving your skills!")
    print("Remember to always use your skills for good!")
    print("If you have any questions or feedback, feel free to reach out!")
    print("I'm here to help you!")