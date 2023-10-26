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

def professional_exists(professionalId):
    return Projects.get_professional_by_id(professionalId)

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

@app.route('/project/details', methods=['GET']) #tested
def projectDetails():
    data = request.get_json()
    
    projectId = data.get("projectId")
    
    project = Projects.get_project_by_id(projectId)
    if project is None: 
        return jsonify({"error": "Project does not exist"}), 409
    
    #do things with project
    project_details = {
        "projectId": project.projectId,
        "projectName": project.projectName,
        "projectStatus": project.projectStatus,
        "listOfApplicants": project.listOfApplicants,
        "listOfProfessionals": project.listOfProfessionals
    }
    
    return jsonify(project_details), 200

@app.route('/project/search', methods=['GET'])
def projectSearch():
    return

@app.route('/project/professional/apply', methods=['POST']) #tested
def projectProfessionalApply():
    data = request.get_json()
    professionalId = data.get("professionalId")
    projectId = data.get("projectId")
    
    if professional_exists(professionalId) is None:
        return jsonify({"error: Professional does not exist"}), 407
    
    project = Projects.get_project_by_id(projectId)
    if project is None: 
        return jsonify({"error": "Project does not exist"}), 409
    
    if professionalId in project.listOfProfessionals:
        return jsonify({"error": "Professional is already a part of this project"}), 409
    
    res = project.add_to_list(professionalId, "listOfApplicants")
    
    if res:
        return jsonify({
            "success": "Professional added to applicants list",
            "current_list": project.listOfApplicants
            }), 200
    else:
        return jsonify({"error": "Professional is already in the applicants list"}), 400
    
    return "there is an error if you print this"

@app.route('/project/professional/leave', methods=['POST']) #tested
def projectProfessionalLeave():
    data = request.get_json()
    professionalId = data.get("professionalId")
    projectId = data.get("projectId")
    
    # should be "listOfApplicants" or "listOfProfessionals"
    listType = data.get("listType")

    if listType not in ["listOfApplicants", "listOfProfessionals"]:
        return jsonify({"error": "Invalid list type. Must be 'listOfApplicants' or 'listOfProfessionals'."}), 400

    project = Projects.get_project_by_id(projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409

    result = project.remove_from_list(professionalId, listType)
    if result:
        return jsonify({"success": f"Professional removed from {listType}."}), 200
    else:
        return jsonify({"error": "Professional ID not found in the specified list."}), 408
    
    return "there is an error if you print this"

@app.route('/project/company/approve', methods=['POST']) #tested
def projectCompanyApprove():
    data = request.get_json()
    professionalId = data.get("professionalId")
    projectId = data.get("projectId")
    
    project = Projects.get_project_by_id(projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409
    
    if professionalId in project.listOfProfessionals:
        return jsonify({"error": "Professional already approved"}), 406
    elif professionalId not in project.listOfApplicants:
        return jsonify({"error": "Professional not an applicant"}), 405
    else:
        project.remove_from_list(professionalId, "listOfApplicants")
        project.add_to_list(professionalId, "listOfProfessionals")
        
    return jsonify({"success": "Professional approved"}), 200

@app.route('/project/company/complete', methods=['POST'])
def completeProjects():
    return

@app.route('/project/candidate/list', methods=['GET'])
def getCandidateList():
    return
