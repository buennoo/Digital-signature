# Digital-signature


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