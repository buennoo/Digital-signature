from flask import Flask, jsonify, request, send_file
from flask_cors import CORS, cross_origin
from RSAkeyPairs import generate_keypair
import asyncio
import binascii
from Crypto.Hash import SHA3_256
from Crypto.Signature import pkcs1_15
import os
from werkzeug.utils import secure_filename
# import shutil
from Crypto.PublicKey import RSA

from io import BytesIO
import zipfile


app = Flask(__name__)
cros = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['RES_FOLDER'] = 'res'

@app.route("/publickey", methods=['GET'])
async def publickey():
    print("public key")
    try:
        result = await generate_keypair()
        private_key = result
        public_key = result.publickey().export_key().decode('ascii')
        return jsonify({"public_key": public_key})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    # public_key = result.publickey().export_key().decode() #.splitlines()
    # public_key = "\n".join(public_key[1:-1])


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

        # print('----------')
        # print(binascii.hexlify(signature).decode('ascii'))

        public_key_pem = public_key.export_key().decode('ascii')

        # save file + signature on server
        filename = secure_filename(request.files['file'].filename)
        res_folder = app.config['RES_FOLDER']
        if not os.path.exists(res_folder):
            os.makedirs(res_folder)
        encrypted_file_path = os.path.join(res_folder, 'signed_' + filename)
        signature_file_path = os.path.join(res_folder, filename + '.key')

        with open(encrypted_file_path, 'wb') as f:
            f.write(file)
            # f.write(b'\nPublic Key:\n')
            # f.write(public_key_pem.encode())

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

        if not os.path.exists(res_folder):
            raise FileNotFoundError(f"Folder {res_folder} does not exist")

        memory_file = BytesIO()

        with zipfile.ZipFile(memory_file, 'w', zipfile.ZIP_DEFLATED) as zf:
            for root, dirs, files in os.walk(res_folder):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, res_folder)
                    zf.write(file_path, arcname)

        # memory pointer to the beggining
        memory_file.seek(0)

        return send_file(memory_file, download_name='res_files.zip', as_attachment=True)

    except Exception as e:
        app.logger.error(f"Error occurred: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/verify', methods=['POST'])
def verify_signature():
    try:
        if 'file1' not in request.files or 'file2' not in request.files or 'publicKey' not in request.form:
            return jsonify({'error': 'Missing file or public key'}), 400

        file1 = request.files['file1'].read()
        file2 = request.files['file2'].read()
        public_key_pem = request.form['publicKey']
        # print('3')

        public_key = RSA.import_key(public_key_pem)
        # print('4')
        hashed = SHA3_256.new(file1)
        # print('5')

        # if(pkcs1_15.new(public_key).verify(hashed, file2)):
        #     print('asdas')
        #     return jsonify({'verified': True})
        try:
            pkcs1_15.new(public_key).verify(hashed, file2)
            return jsonify({'verified': True})
        except (ValueError, TypeError):
            return jsonify({'verified': False})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run()