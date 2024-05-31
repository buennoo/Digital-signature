from flask import Flask, jsonify, request, send_file
from flask_cors import CORS, cross_origin
from RSAkeyPairs import generate_keypair
from fileEncrypt import encrypt_file as encrypt_uploaded_file
import asyncio
import binascii
from Crypto.Hash import SHA3_256
from Crypto.Signature import pkcs1_15
import os
from werkzeug.utils import secure_filename
import shutil


app = Flask(__name__)
cros = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['RES_FOLDER'] = 'res'

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

        # Save file + signature on server
        filename = secure_filename(request.files['file'].filename)
        res_folder = app.config['RES_FOLDER']
        if not os.path.exists(res_folder):
            os.makedirs(res_folder)
        encrypted_file_path = os.path.join(res_folder, 'signed_' + filename)
        signature_file_path = os.path.join(res_folder, filename + '.sign')

        with open(encrypted_file_path, 'wb') as f:
            f.write(file)
            f.write(b'\nPublic Key:\n')
            f.write(public_key_pem.encode())

        with open(signature_file_path, 'wb') as f:
            f.write(signature)

        return jsonify({
            'filename': filename,
            'signature': binascii.hexlify(signature).decode('ascii'),
            'public_key': public_key_pem
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/download-folder', methods=['GET'])
def download_folder():
    try:
        res_folder = app.config['RES_FOLDER']
        zip_file_path = os.path.join(res_folder, 'res_files.zip')
        shutil.make_archive(os.path.splitext(zip_file_path)[0], 'zip', res_folder)
        return send_file(zip_file_path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run()