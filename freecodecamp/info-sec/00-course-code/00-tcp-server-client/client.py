#!/usr/bin/python3

import socket

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
host = socket.gethostname()
port = 444

client_socket.connect((host, port))
print(f"Connected to server at {host}:{port}")
message = client_socket.recv(1024).decode('utf-8')
print(f"Received message from server: {message}")
client_socket.close()
print("Connection closed.")