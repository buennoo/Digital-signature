from flask import Flask
from flask_cors import CORS, cross_origin
#from test import testing

app = Flask(__name__)
cros = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/hello")
@cross_origin()
def hello():
    return {"hello": ["hello", "hi"]}

@app.route("/test")
@cross_origin()
def test():
    result = 1
    return jsonify(result)

if __name__ == "__main__":
    app.run()