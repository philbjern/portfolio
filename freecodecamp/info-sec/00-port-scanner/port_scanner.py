import socket
import ipaddress
import re
import common_ports


def get_service_name(port):
    """
    Get the service name for a given port number.
    """
    try:
        service_name = common_ports.ports_and_services[port]
        return service_name
    except KeyError:
        return None
    

def is_ip_address(target):
    return re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", target) is not None


def is_valid_ip_address(target):
    """Checks if the target is a valid IPv4 or IPv6 address."""
    try:
        ipaddress.ip_address(target)
        return True
    except ValueError:
        return False


def is_valid_hostname(target):
    """
    Check if the target is a hostname or an IP address.
    """
    try:
        socket.gethostbyname(target)
        return True
    except socket.gaierror:
        return False


def get_ip_address(hostname):
    try:
        ip_address = socket.gethostbyname(hostname)
        return ip_address
    except socket.gaierror:
        return None
    

def get_hostname(ip_address):
    """
    Get the hostname for a given IP address.
    """
    try:
        hostname = socket.gethostbyaddr(ip_address)[0]
        return hostname
    except socket.herror:
        return None
    except socket.gaierror:
        return None


def get_open_ports(target, port_range, verbose = False):
    if is_ip_address(target):
        # Check if the target is a valid IP address and get the hostname
        target_ip = target
        if not is_valid_ip_address(target_ip):
            return "Error: Invalid IP address"

        target_hostname = get_hostname(target_ip)
        
    else:
        # Check if the target is a valid hostname and get the IP address
        target_hostname = target
        print(f"Target hostname: {target_hostname}, {is_valid_hostname(target_hostname)}")
        
        if not is_valid_hostname(target_hostname):
            return "Error: Invalid hostname"
        
        target_ip = get_ip_address(target)
        if not target_ip:
            return "Error: Invalid IP address"
      
    open_ports = []
    
    for port in range(port_range[0], port_range[1] + 1):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.5)
        try:
            result = s.connect_ex((target_ip, port))
            if result == 0:
                open_ports.append(port)            
        except socket.error as e:
            if verbose:
                print(f"Socket error: {e}")
        finally:
            s.close()

    if verbose:
        res = ""
        if target_hostname is None:
            res += f"Open ports for {target_ip}\n"
        else:
            res += f"Open ports for {target_hostname} ({target_ip})\n"

        res += "PORT     SERVICE\n"
        for port in open_ports:
            service_name = get_service_name(port)
            if service_name:
                res += f"{port:<8} {service_name}\n"
        return res.rstrip("\n")
    else:
        return open_ports
    

def test():
    target_ip = "104.26.10.78"  # Replace with a real target
    ports = [440, 450]

    for port in range(ports[0], ports[1] + 1):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1)
        try:
            result = s.connect_ex((target_ip, port))
            print(f"Port {port}: {'Open' if result == 0 else 'Closed'}")
        except socket.error as e:
            print(f"Socket error: {e}")
        finally:
            s.close()


if __name__ == "__main__":
    print(get_open_ports("www.freecodecamp.org", [75, 85]))
    print(get_open_ports("scanme.nmap", [22, 42], False))
    print(get_open_ports("266.255.9.10", [22, 42], False))
    print(get_open_ports("www.stackoverflow.com", [79, 82], False));
    print(get_open_ports("scanme.nmap.org", [20, 80], False))
    # test()