import hashlib

debug = False

def prepare_passwords():
    passwords = []
    salted_passwords = []
    hashed_passwords = []

    with open('top-10000-passwords.txt', 'r') as f:
        for line in f.readlines():
            passwords.append(line.strip())
            hashed_passwords.append({ "pass": line.strip(), "salted": line.strip(), "hash": hash_str(line.strip()) })

    salts = []
    with open('known-salts.txt', 'r') as f:
        for line in f.readlines():
            salts.append(line.strip())

    if debug:
        test_pass = "superman"
        test_hash = "53d8b3dc9d39f0184144674e310185e41a87ffd5"
        test_salted = []
        
        for salt in salts:
            test_salted.append({ "password": test_pass, "salted": salt + test_pass, "hash": hashlib.sha1((salt + test_pass).encode('utf-8')).hexdigest() })
        
        for password in test_salted:
            print("dict hash: " + password["hash"] + ", pass: " + password["password"] + ", salted: " + password["salted"])
            if password["hash"] == test_hash:
                print("Found password: ", password["password"])
                print("Found hash: ", password["hash"])
        print(len(test_salted))
        print(test_hash)

    for password in passwords:
        for salt in salts:
            salted_str_1 = salt + password
            salted_str_2 = password + salt

            salted_passwords.append({ "pass": password, "salted": salted_str_1, "hash": hash_str(salted_str_1) })
            salted_passwords.append({ "pass": password, "salted": salted_str_2, "hash": hash_str(salted_str_2) })

    return hashed_passwords, salted_passwords


def hash_str(string):
    return hashlib.sha1(string.encode('utf-8')).hexdigest()


def find_hash(password, hashes):
    return None

def crack_sha1_hash(hash, use_salts = False):
    passwords, salted_passwords = prepare_passwords()
    
    if use_salts:
        for item in salted_passwords:
            if item["hash"] == hash:
                password = item["pass"]
                if debug:
                    print("Found password: ", password)
                return password
    else:
        for item in passwords:
            if item["hash"] == hash:
                password = item["pass"]
                if debug:
                    print("Found password: ", password)
                return password

    return "PASSWORD NOT IN DATABASE"
    

if __name__ == "__main__":
    print(crack_sha1_hash("b80abc2feeb1e37c66477b0824ac046f9e2e84a0"))
    print(crack_sha1_hash("53d8b3dc9d39f0184144674e310185e41a87ffd5", True))