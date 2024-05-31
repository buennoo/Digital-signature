from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from RSAkeyPairs import generate_keypair
from fileEncrypt import encrypt_file as encrypt_uploaded_file
import asyncio

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
    public_key = result.publickey().export_key().decode().splitlines()
    public_key = "\n".join(public_key[1:-1])
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
@cross_origin()
def encrypt_file():
    if 'file' not in request.files or 'public_key' not in request.form:
        return jsonify({'error': 'Missing file or public key'}), 400

    file = request.files['file']
    public_key_str = request.form['public_key']
    encrypted_file = encrypt_uploaded_file(file, public_key_str)
    return jsonify({'encrypted_file': encrypted_file})


if __name__ == "__main__":
    app.run()