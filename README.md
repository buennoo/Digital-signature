# Digital-signature
Demonstration of random number generator in data security with the RSA algorithm.<br>
Content:
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Functionality](#functionality)
- [How to run](#installation)

## Technologies
- Python (Flask)
- JavaScript (React.js)

## API Endpoints

`/publickey [GET]`
- Generates an RSA key pair.
- Returns the public key.

`/encrypt [POST]`

- Expects a file to be uploaded.
- Generates an RSA key pair.
- Calculates the SHA3-256 hash of the file.
- Signs the hash with the private key.
- Saves the file and the signature on the server in the 'res' folder.
- Returns the file name, signature, and public key.

`/download-folder [GET]`

- Creates a ZIP archive of the files in the 'res' folder.
- Returns the ZIP archive with the files.

`/verify [POST]`

- Expects a file to be verified, a signature file, and a public key.
- Reads the files and the public key.
- Calculates the SHA3-256 hash of the file.
- Verifies the signature using the public key.
- Returns the verification result as True/False.

## Functionality 
1. Generating a Public Key

    The /publickey endpoint is handled by the GET method.
    The publickey function generates an RSA key pair using the generate_keypair function and returns the public key as a JSON response.
    In case of an error, a response with code 500 and an error description is returned.

2. Signing a File

    The /encrypt endpoint is handled by the POST method.
    The encrypt function expects a file uploaded by the client.
    An RSA key pair is generated.
    The SHA3-256 hash of the uploaded file is calculated.
    The hash is signed using the private key.
    The signed file and signature are saved on the server.
    A JSON response containing the file name, signature (encoded in hex format), and public key is returned.

3. Downloading the Folder

    The /download-folder endpoint is handled by the GET method.
    The download_folder function creates a ZIP archive containing all files from the result directory RES_FOLDER.
    The ZIP archive is returned as a downloadable file.
    In case of an error, a response with code 500 and an error description is returned.

4. Verifying a Signature

    The /verify endpoint is handled by the POST method.
    The verify_signature function expects three elements to be uploaded: the file to be verified, the signature file, and the public key.
    The files and public key are read.
    The SHA3-256 hash of the uploaded file is calculated.
    The signature is verified using the public key.
    A JSON response with the verification result as a boolean is returned.
    In case of an error, a response with code 500 and an error description is returned.

## Installation
In terminal:

```
git clone https://github.com/buennoo/Digital-signature.git
cd digital-signature
```

1. Open a new terminal and navigate to the client directory, then install dependencies:
```
cd client
npm install
```

2. Navigate to the server directory. For Windows, create a virtual environment:
```
cd ..
cd server
python -m venv venv
.\venv\Scripts\activate
```

3. Then install Python dependencies from requirements.txt:
```
pip install -r requirements.txt
```

4. Start the Flask server:
```
python server.py
```

5. Navigate to the client directory again and start the React app:
```
cd ..
cd client
npm start
```
