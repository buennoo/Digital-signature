from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from RSAkeyPairs import generate_keypair
from fileEncrypt import encrypt_file as encrypt_uploaded_file
import asyncio
import binascii
from Crypto.Hash import SHA3_256
from Crypto.Signature import pkcs1_15
from Crypto.PublicKey import RSA

app = Flask(__name__)
cros = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/hello", methods=['GET'])
@cross_origin()
def hello():
    return {"hello": ["test", "flask"]}

@app.route("/publickey", methods=['GET'])
@cross_origin()
def publickey():
    print("public key")
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError as e:
        if 'There is no current event loop in thread' in str(e):
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
        else:
            raise

    result = loop.run_until_complete(generate_keypair())
    public_key = result.publickey().export_key().decode() #.splitlines()
    # public_key = "\n".join(public_key[1:-1])
    return jsonify({"public_key": public_key})

# @app.route("/privatekey", methods=['GET'])
# @cross_origin()
# def privatekey():
#     print("private key")
#     try:
#         loop = asyncio.get_event_loop()
#     except RuntimeError as e:
#         if 'There is no current event loop in thread' in str(e):
#             loop = asyncio.new_event_loop()
#             asyncio.set_event_loop(loop)
#         else:
#             raise

@app.route('/encrypt', methods=['POST'])
async def encrypt():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'Missing file'}), 400

        file = request.files['file'].read()
        rsa_key = await generate_keypair()

        private_key = rsa_key
        public_key = rsa_key.publickey()

        hashed = SHA3_256.new(file)
        signer = pkcs1_15.new(private_key)
        signature = signer.sign(hashed)

        public_key_pem = public_key.export_key().decode('ascii')

        return jsonify({
            'signature': binascii.hexlify(signature).decode('ascii'),
            'public_key': public_key_pem
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run()