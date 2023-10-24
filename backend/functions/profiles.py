from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/editcompanyprofile', methods=['PUT'])
def editCompanyProfile():
    return

@app.route('/editProfessionalProfile', methods=['PUT'])
def editProfessionalProfile():
    return

@app.route('/user/details', methods=['GET'])
def userDetails():
    return

@app.route('/professional/editprofile', methods=['PUT'])
def professionalEditProfile():
    return
