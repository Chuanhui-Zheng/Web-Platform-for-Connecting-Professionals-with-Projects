from flask import Flask, request, jsonify
from flask_cors import CORS
from database.models import Company, Professional, Projects
from extensions import db

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

'''
project/create logic
1. get json body
2. retrieve all information
3. set relevant fields
4. push to database
5. return success code and id

project/edit logic
1. get json body
2. retrieve all information
3. set relevant fields
4. push to database
5. return success code

project/list logic
1. get json body
2. retrieve project id information
3. query data base
4. return relevant object and success coe

project/professional apply
1. get json body
2. retrieve professional id and project id
3. add professional id to project list of applicants
4. return success

project/professional leave
1. get json body
2. retrieve professional id and project id
3. remove professional id from project list of applicants
4. return success

project/company approve
1. get json body
2. retrieve professional id and project id
3. move professional id from applicant to professionals list
4. return success

project/company leave
-> uses professional leave

project/company complete
1. get project id
2. set status as complete
2. return success

project/candidate list
1. get json body
2. retrieve project id
3. return list of applicants
4. return success

'''

# helper functions
def company_exists(companyId):
    return Projects.get_company_by_id(companyId)

#TO-DO error code for company with repeat projectName
@app.route('/project/create', methods=['POST']) #tested
def projectCreate():
    data = request.get_json()
    
    companyId = data.get("companyId")
    projectName = data.get("projectName")
    # add the rest of the fields
    
    new_project = Projects(pCompanyId=companyId)
    
    if company_exists(companyId) is None:
        return jsonify({"error: Company does not exist"}), 409
    
    new_project.create_project_details(projectName)
    
    new_project.save_project()
    
    return jsonify({"projectId": new_project.projectId}), 200

@app.route('/project/edit', methods=['PUT']) #tested
def projectEdit():
    data = request.get_json()
    
    projectId = data.get("projectId")
    projectName = data.get("projectName")
    
    project = Projects.get_project_by_id(projectId)
    if project is None: 
        return jsonify({"error": "Project does not exist"}), 409
    
    project.edit_project_details(projectName)
    
    return jsonify({"updated": "professional details"}), 200

@app.route('/project/list', methods=['GET']) #tested
def projectList():
    data = request.get_json()
    
    companyId = data.get("companyId")
    
    if company_exists(companyId) is None:
        return jsonify({"error: Company does not exist"}), 409
    
    company_projects = Projects.get_projects_by_company_id(companyId)
    
    if company_projects is None:
        return jsonify({"status": "no projects"}), 205
    
    project_dict = {
        project.projectId: {
            "projectId": project.projectId,
            "projectName": project.projectName,
            "projectDescription": project.projectDescription,
            "projectStatus": project.projectStatus,
            "listOfApplicants": project.listOfApplicants,
            "listOfProfessionals": project.listOfProfessionals
        }
    for project in company_projects
    }
    
    return jsonify(project_dict), 200

@app.route('/project/listall', methods=['GET']) #tested
def projectListAll():
    projects = Projects.query.all()
    
    # depends how front end wants to display
    project_dict = {
        project.projectId: {
            "projectId": project.projectId,
            "projectName": project.projectName,
            "projectDescription": project.projectDescription,
            "projectStatus": project.projectStatus,
            "listOfApplicants": project.listOfApplicants,
            "listOfProfessionals": project.listOfProfessionals
        }
    for project in projects
    }
    
    return jsonify(project_dict), 200

@app.route('/project/details', methods=['GET'])
def projectDetails():
    return

@app.route('/project/search', methods=['GET'])
def projectSearch():
    return

@app.route('/project/professional/apply', methods=['POST'])
def projectProfessionalApply():
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
