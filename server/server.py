from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from RSAkeyPairs import generate_keypair
import asyncio
#from test import testing

app = Flask(__name__)
cros = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/hello")
@cross_origin()
def hello():
    return {"hello": ["test", "flask"]}

@app.route("/publickey")
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

# @app.route("/privatekey")
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

    result = loop.run_until_complete(generate_keypair())
    private_key = result.export_key().decode().splitlines()
    private_key = "\n".join(private_key[1:-1])
    return jsonify({"private_key" : private_key})


if __name__ == "__main__":
    app.run()