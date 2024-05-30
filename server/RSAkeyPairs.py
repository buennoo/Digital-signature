from Crypto.PublicKey import RSA

from imgTrng import TRNG

async def generate_keypair(bits=2048):
    rng = TRNG()
    rsa_key = RSA.generate(bits,  randfunc=rng.get_random_bytes_from_IMG_TRNG, e=65537)
    return rsa_key


def debug_generate_keypair(bits=2048):
    rng = TRNG()
    print(len(rng.get_random_bytes_from_IMG_TRNG(bits*2)))
    rsa_key = RSA.generate(bits,  randfunc=rng.get_random_bytes_from_IMG_TRNG, e=65537)
    return rsa_key

if __name__ == "__main__":
    debug_generate_keypair()