from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64

def encrypt_file(file, public_key_str):
    public_key = RSA.import_key(public_key_str)
    cipher = PKCS1_OAEP.new(public_key)

    encrypted_data = b""
    chunk_size = 190  # 214 bytes minus padding for 2048-bit key
    while chunk := file.read(chunk_size):
        encrypted_data += cipher.encrypt(chunk)
    
    encrypted_file = base64.b64encode(encrypted_data).decode('utf-8')
    return encrypted_file
