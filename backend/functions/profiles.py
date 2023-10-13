from flask import Flask

app = Flask(__name__)

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
