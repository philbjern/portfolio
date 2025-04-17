#!/usr/bin/python3

import socket

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
host = socket.gethostname()
port = 444

server_socket.bind((host, port))
server_socket.listen(3)

print(f"Server started on {host}:{port}")
print("Waiting for connections...")

while True:
  try:
    client_socket, addr = server_socket.accept()
    print(f"Connection from {addr} has been established.")
    
    message = "Welcome to the server!"
    client_socket.send(message.encode('utf-8'))

    client_socket.close()
    print(f"Connection with {addr} closed.")
  except KeyboardInterrupt:
    print("\nServer shutting down...")
  except Exception as e:
    print(f"An error occurred: {e}")
  finally:
    if 'client_socket' in locals():
      client_socket.close()
    server_socket.close()
    print("Server socket closed.")
    break