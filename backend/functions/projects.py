from flask import Flask, request, jsonify
from flask_cors import CORS
from database.models import Company, Professional, Projects
from extensions import db
from sqlalchemy import or_, and_, func, text
import re
import json

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


# helper functions
def company_exists(companyId):
    return Projects.get_company_by_id(companyId)

def professional_exists(professionalId):
    return Projects.get_professional_by_id(professionalId)

def getProjectCompany(companyId):
    return Company.get_company_by_id(companyId=companyId).companyName

def getProjectCompany(companyId):
    return Company.get_company_by_id(companyId=companyId).companyName


#TO-DO error code for company with repeat projectName
'''
PARAMETERS {
    companyId,
    projectName,
    skills: [array of skills]
    ...the rest...
}

RETURN {
    projectId
}
'''
@app.route('/project/create', methods=['POST']) #tested
def projectCreate():
    data = request.get_json()
    
    companyId = data.get("companyId")
    projectName = data.get("projectName")
    projectObjectives = data.get("projectObjectives", "")
    projectDescription = data.get("projectDescription", "")
    projectStartDate = data.get("projectStartDate", "")
    projectEndDate = data.get("projectEndDate", "")
    projectCategories = data.get("projectCategories", "")
    projectLocation = data.get("projectLocation", "")
    projectKeyResponsibilities = data.get("projectKeyResponsibilites", "")
    projectConfidentialInformation = data.get("projectConfidentialInformation", "")
    projectSkills = data.get("projectSkills", [])
    projectCategories = data.get("projectCategories", [])
    professionalsWanted = data.get("professionalsWanted", "")
    contactEmail = data.get("contactEmail", "")
    
    new_project = Projects(projectObjectives=projectObjectives,
                        projectDescription=projectDescription, projectStartDate=projectStartDate,
                        projectLocation=projectLocation, projectKeyResponsibilities=projectKeyResponsibilities,
                        projectConfidentialInformation=projectConfidentialInformation,
                        projectSkills=projectSkills, projectCategories=projectCategories,
                        projectEndDate=projectEndDate,
                        professionalsWanted=professionalsWanted,
                        contactEmail=contactEmail,
                        )

    if not company_exists(companyId):
        return jsonify({"error": "Company does not exist"}), 409
    elif Projects.query.filter_by(projectName=projectName, pCompanyId=int(companyId)).first():
        return jsonify({"error": "Company already has project under this name"}), 404

    new_project.create_project_details(companyId, projectName)
    
    new_project.save_project()
    
    return jsonify({"projectId": new_project.projectId}), 200


'''
PARAMETERS (query string) {id, status}:
/project/list?id=USERID&status=STATUS

Status for Company:
status = {'Avtive', 'Complete'}

Status for professional:
status = {'Pending', 'Approved', 'rejected'
}

RETURN {
    dictionary of company's projects
}
'''
@app.route('/project/list', methods=['GET'])
def projectList():
    id_str = request.args.get('id')
    status = request.args.get('status')
    
    if not id_str:
        return jsonify({"error": "Missing 'id' parameter"}), 400
    
    id = int(id_str)
    projects = []

    if company_exists(id):
        # checks for status and if not returns all projects otherwise returns all with the given status
        if status:
            projects = Projects.query.filter_by(pCompanyId=id, projectStatus=status).all()
        else:
            projects = Projects.query.filter_by(pCompanyId=id).all()
    elif professional_exists(id):
        all_projects = Projects.query.all()
        filtered_projects = []

        for project in all_projects:
            # Converts professionals and applicants into lists
            professionals = json.loads(project.listOfProfessionals) if isinstance(project.listOfProfessionals, str) else project.listOfProfessionals
            applicants = json.loads(project.listOfApplicants) if isinstance(project.listOfApplicants, str) else project.listOfApplicants

            # if a status is given then we check for direct matches in either
            # the listOfProfessionals or listOfApplicants otherwise we find any matches
            if status:
                if any(pro["professionalId"] == id and pro["status"] == status for pro in professionals):
                    filtered_projects.append(project)
                    continue
                if any(app["professionalId"] == id and app["status"] == status for app in applicants):
                    filtered_projects.append(project)
                    continue
            else:
                if any(pro["professionalId"] == id for pro in professionals):
                    filtered_projects.append(project)
                    continue
                if any(app["professionalId"] == id for app in applicants):
                    filtered_projects.append(project)

        projects = filtered_projects

    if not projects:
        return jsonify([]), 200

    project_dicts = [
        {k: v for k, v in vars(project).items() if not k.startswith('_')}
        for project in projects
    ]
    
    return jsonify(project_dicts), 200



'''
PARAMETERS {
}

RETURN {
    dictionary of all projects
}
'''
@app.route('/project/listall', methods=['GET']) #tested
def projectListAll():
    projects = Projects.query.filter_by(projectStatus='Active').all()
    
    # depends how front end wants to display
    project_list = [
        {
            "projectId": project.projectId,
            "projectName": project.projectName,
            "projectCompany": getProjectCompany(project.pCompanyId),
            # "projectCompanyRating": getProjectCompany(project.pCompanyId),
            "projectCategory": project.projectCategories,
            "projectDescription": project.projectDescription,
            "projectStartDate": project.projectStartDate,
            "projectEndDate": project.projectEndDate,
            "projectStatus": project.projectStatus,
            "projectLocation": project.projectLocation,
            "professionalsWanted": project.professionalsWanted,
            "projectSkills": project.projectSkills,
            "listOfApplicants": project.listOfApplicants,
            "listOfProfessionals": project.listOfProfessionals
        }
    for project in projects
    ]
    
    return jsonify(project_list), 200


'''
PARAMETERS (query string)
/project/details?projectId=PROJECTIDHERE
PARAMETERS (query string)
/project/details?projectId=PROJECTIDHERE

RETURN {
    obj of project details
}
'''
@app.route('/project/details', methods=['GET']) #tested
def projectDetails():    
    projectIdStr = request.args.get("projectId")
    projectId = int(projectIdStr)
    
    project = Projects.get_project_by_id(projectId)
    if project is None: 
        return jsonify({"error": "Project does not exist"}), 409
    
    project_details = {
        "projectId": project.projectId,
        "projectName": project.projectName,
        "contactEmail": project.contactEmail,
        "projectCompany": getProjectCompany(project.pCompanyId),
        "pCompanyId": project.pCompanyId,
        "projectCategory": project.projectCategories,
        "projectObjectives": project.projectObjectives,
        "projectDescription": project.projectDescription,
        "projectDescription": project.projectDescription,
        "projectStartDate": project.projectStartDate,
        "projectEndDate": project.projectEndDate,
        "projectStatus": project.projectStatus,
        "projectStatus": project.projectStatus,
        "projectLocation": project.projectLocation,
        "professionalsWanted": project.professionalsWanted,
        "projectKeyResponsibilities": project.projectKeyResponsibilities,
        "projectSkills": project.projectSkills,
        "projectSkills": project.projectSkills,
        "projectConfidentialInformation": project.projectConfidentialInformation,
        "projectStatus": project.projectStatus,
        "projectStatus": project.projectStatus,
        "listOfApplicants": project.listOfApplicants,
        "listOfProfessionals": project.listOfProfessionals,
        # need to add rating systems
        "projectRatings": 0,
    }
    # return jsonify({"message": "hji"})
    # return jsonify({"message": "hji"})
    return jsonify(project_details), 200


'''
PARAMETERS (query string)
/project/search?query_string=SEARCHQUERY&catagory=CATAGORYNAME&catagory=CATAGORYNAME
?
PARAMETERS (query string)
/project/search?query_string=SEARCHQUERY&catagory=CATAGORYNAME&catagory=CATAGORYNAME
?

RETURN {
    dictionary of projects that match criteria
}
'''
# TO-DO filter by other things
@app.route('/project/search', methods=['GET']) #tested
def projectSearch():
    query_string = request.args.get("query", "")
    # categories = set(request.args.getlist("category"))
    # skills = set(request.args.getlist("skills"))
    categories = request.args.get("categories")
    skills = request.args.get("skills")
    location = request.args.get("location")
    creator = request.args.get("creatorId")

    # starts building query
    query = Projects.query

    # add filters here as if statements on top of query
    if query_string:
        query_string = re.escape(query_string)
        # adding .* to match anything before or after the query string for partial matches
        regex_pattern = f".*{query_string}.*"
        query = query.filter(func.lower(Projects.projectName).op("REGEXP")(func.lower(regex_pattern)))
    
    '''
    # this does basically the same thing as the above one
    if query_string:
        query = query.filter(Projects.projectName.like(f"%{query_string}%"))
    '''

    # filter by categories (substring matching)
    if categories:
        category_conditions = [
            Projects.projectCategories.like(f'%"{category}"%') for category in categories
        ]
        query = query.filter(and_(*category_conditions))

    # filter by skills (substring matching)
    if skills:
        skill_conditions = [
            Projects.projectSkills.like(f'%"{skill}"%') for skill in skills
        ]
        query = query.filter(and_(*skill_conditions))
    
    # Filtering by location (substring matching)
    if location:
        project_location = [
            Projects.projectLocation.like(f'%"{location}"%')
        ]
        query = query.filter(and_(*project_location))
    
    # Filtering by User
    if creator:
        creators_projects = [
            Projects.pCompanyId == creator
        ]
        query = query.filter(and_(*creators_projects))
        query = query.filter(and_(*skill_conditions))
    
    # Filtering by location (substring matching)
    if location:
        project_location = [
            Projects.projectLocation.like(f'%"{location}"%')
        ]
        query = query.filter(and_(*project_location))
    
    # Filtering by User
    if creator:
        creators_projects = [
            Projects.pCompanyId == creator
        ]
        query = query.filter(and_(*creators_projects))
        
    results = query.all()

    if not results:
        return jsonify({"message": "No projects found."}), 404

    # returns all project infomation
    if not results:
        return jsonify({"message": "No projects found."}), 404

    # returns all project infomation
    projects_list = [
        {k: v for k, v in vars(project).items() if not k.startswith('_')}
        for project in results
    ]

    return jsonify(projects_list), 200


'''
PARAMETERS {
    professionalId,
    projectId
}

RETURN {
    success message
}
'''
# get if they are pending or approved
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
    
    if professionalId in [professional['professionalId'] for professional in project.listOfProfessionals]:
        return jsonify({"error": "Professional is already a part of this project"}), 409
    elif professionalId in [applicant['professionalId'] for applicant in project.listOfApplicants]:
        return jsonify({"error": "Already an applicant"}), 409
    elif professionalId in [applicant['professionalId'] for applicant in project.listOfApplicants]:
        return jsonify({"error": "Already an applicant"}), 409
    
    res = project.add_to_list(professionalId, "listOfApplicants", "Pending approval")
    
    if res:
        return jsonify({
            "success": "Professional added to applicants list",
            "current_list": project.listOfApplicants
            }), 200
    else:
        return jsonify({"error": "Professional is already in the applicants list"}), 400
    
    return "there is an error if you print this"


'''
PARAMETERS {
    professionalId,
    projectId
}

RETURN {
    success message
}
'''
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


'''
PARAMETERS {
    professionalId,
    projectId
}

RETURN {
    success message
}
'''
@app.route('/project/company/approve', methods=['POST']) #tested
def projectCompanyApprove():
    data = request.get_json()
    professionalId = data.get("professionalId")
    projectId = data.get("projectId")
    
    project = Projects.get_project_by_id(projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409
    
    professional = Projects.get_professional_by_id(professionalId)
    if professional is None:
        return jsonify({"error": "Professional does not exist"}), 409
    
    # Checks if the professional has already been approved
    if any(applicant['professionalId'] == professionalId for applicant in project.listOfProfessionals):
        return jsonify({"error": "Professional already approved"}), 406

    # Check if the professional is not an applicant
    if not any(applicant['professionalId'] == professionalId for applicant in project.listOfApplicants):
        return jsonify({"error": "Professional not an applicant"}), 405
    
    project.remove_from_list(professionalId, "listOfApplicants")
    project.add_to_list(professionalId, "listOfProfessionals", "Approved")
    
    # message = {
    #     "success": f"Congratulations! You have been approved for the {project.projectName} project!"
    # }
    message = f"Congratulations! You have been approved for the {project.projectName} project!"

    professional.add_notification(professionalId, message)

    return jsonify({"success": "Professional approved"}), 200


'''
PARAMETERS {
    professionalId,
    projectId
}

RETURN {
    success message
}
'''
@app.route('/project/company/reject', methods=['POST']) #tested
def projectCompanyReject():
    data = request.get_json()
    professionalId = data.get("professionalId")
    projectId = data.get("projectId")
    
    project = Projects.get_project_by_id(projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409
    
    new_status = "Rejected"
    result = project.set_status(professionalId, new_status)
    
    if result:
        return jsonify({"success": f"Status updated to {new_status}"}), 200
    else:
        return jsonify({"error": "Could not set status"}), 404
        

'''
PARAMETERS {
    projectId
}

RETURN {
    success message
}
'''
@app.route('/project/company/complete', methods=['PUT']) #tested
def projectComplete():
    data = request.get_json()
    projectId = data.get("projectId")

    project = Projects.get_project_by_id(projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409

    if project.projectStatus == "Active":
        project.projectStatus = "Complete"
        db.session.commit()
        return jsonify({"success": "Project status set to Complete"}), 200
    else:
        return jsonify({"message": "Project is already Complete"}), 200
    
    return "there is an error if you print this"


'''
PARAMETERS {
    projectId
}

RETURN {
    success message
}
'''
@app.route('/project/company/incomplete', methods=['PUT']) #tested
def projectIncomplete():
    data = request.get_json()
    projectId = data.get("projectId")

    project = Projects.get_project_by_id(projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409

    if project.projectStatus == "Complete":
        project.projectStatus = "Active"
        db.session.commit()
        return jsonify({"success": "Project status set to incomplete"}), 200
    else:
        return jsonify({"message": "Project is already set as incomplete"}), 200
    
    return "there is an error if you print this"


'''
PARAMETERS (query string):
/project/applicant/list?projectId=PROJECTIDHERE

RETURN {
    success message
}
'''
@app.route('/project/applicant/list', methods=['GET']) #tested
def projectApplicantList():
    projectId = request.args.get("projectId")
    
    project = Projects.get_project_by_id(projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409
    
    applicant_ids = [applicant['professionalId'] for applicant in project.listOfApplicants if 'professionalId' in applicant]
    applicants = Professional.query.filter(Professional.professionalId.in_(applicant_ids)).all()
    applicant_list = [
        {
            "professionalFullName": applicant.professionalFullName,
            "professionalId": applicant.professionalId,
            "professionalEmail": applicant.professionalEmail,
            "professionalSkills": applicant.professionalSkills
        }
        for applicant in applicants
    ]
    
    return jsonify(applicant_list), 200


'''
PARAMETERS (query string)
/project/professional/list?projectId=PROJECTIDHERE

RETURN {
    success message
}
'''
@app.route('/project/professional/list', methods=['GET']) #tested
def projectProfessionalList():
    projectId = request.args.get("projectId")
    
    project = Projects.get_project_by_id(projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409
    
    professionals = Professional.query.filter(Professional.professionalId.in_(project.listOfProfessionals)).all()
    professional_list = {
        {
            "professionalId": professional.professionalId,
            "professionalEmail": professional.professionalEmail,
        }
        for professional in professionals
    }
    
    return jsonify(professional_list), 200


'''
PARAMETERS (query string) {professionalId, projectId}
/project/professional/status?professionalId=PROFESSIONALIDHERE&projectId=PROJECTIDHERE


RETURN {
    success message
}
'''
@app.route('/project/professional/status', methods=['GET']) #tested
def projectProfessionalStatus():
    professionalId = request.args.get("professionalId")
    projectIdstr = request.args.get("projectId")
    projectId = int(projectIdstr)
    
    project = Projects.get_project_by_id(projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409
    
    for applicant in project.listOfApplicants:
        if applicant["professionalId"] == professionalId:
            return jsonify({"status": applicant["status"]}), 200

    if any(prof["professionalId"] == professionalId for prof in project.listOfProfessionals):
        return jsonify({"status": "Approved"}), 200
    
    return jsonify({"status": "Not applied"}), 200


'''
PARAMETERS (query string) {professionalId, status}
/project/professional/get/projects/from/status?professionalId=PROFESSIONALIDHERE&status=STATUSHERE

Status can be either:
status = {'Active', 'complete'}

'''
@app.route('/project/professional/get/projects/from/status', methods=['GET'])
def getProfessionalProjectsFromStatus():
    profIdStr = request.args.get("professionalId")
    profId = int(profIdStr)
    status = request.args.get("status")
    
    projects = Projects.query.filter_by(projectStatus=status).all()
    filtered_projects = []
    for project in projects:
        # Ensure it's a string before loading JSON
        if isinstance(project.listOfProfessionals, str):
            professionals = json.loads(project.listOfProfessionals)
        else:
            professionals = project.listOfProfessionals

        for professional in professionals:
            if professional["professionalId"] == profId:
                filtered_projects.append(project)
                break

    project_dict = [
        {k: v for k, v in vars(project).items() if not k.startswith('_')}
        for project in filtered_projects
    ]
    
    return jsonify(project_dict), 200

