from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/projects/create', methods=['POST'])
def createProjects():
    return

@app.route('/projects/listall', methods=['GET'])
def projectsListAll():
    return

@app.route('/projects/userl/list', methods=['GET'])
def projectProfessionalList():
    return

@app.route('/project/details', methods=['GET'])
def projectDetails():
    return

@app.route('/project/search', methods=['GET'])
def projectSearch():
    return

@app.route('/project/professional/apply', methods=['POST'])
def projectDetails():
    return

@app.route('/projects/listall', methods=['GET'])
def projectListAll():
    return

@app.route('/project/professional/leave', methods=['GET'])
def projectLeaveProject():
    return

@app.route('/project/company/approve', methods=['POST'])
def projectCompanyApprove():
    return

@app.route('/project/company/complete', methods=['POST'])
def completeProjects():
    return

@app.route('/project/candidate/list', methods=['GET'])
def getCandidateList():
    return
