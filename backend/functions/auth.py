from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/auth/register/company', methods=['POST'])
def authRegisterCompany():
    return

@app.route('/auth/register/professional', methods=['POST'])
def authRegisterProfessional():
    return

@app.route('/auth/login', methods=['POST'])
def login():
    return

@app.route('/auth/logout', methods=['POST'])
def logout():
    return
