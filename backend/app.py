from flask import Flask
from flask_cors import CORS
from extensions import db, jwt
from functions.auth import authRegisterCompany, authRegisterProfessional, login, logout
from functions.notifications import getNotifications
from functions.filter import getCategories, getSkills
from functions.profiles import editCompanyProfile, editProfessionalProfile, userDetails, professionalEditProfile
from functions.edit import editCompany, editProfessional, editProject
from functions.user import companyDetails, professionalDetails, getUserType
from functions.admin import allCompanies, allProfessionals, allAdmins, createAdmin
from functions.projects import (
    projectCreate, 
    projectList, 
    projectListAll, 
    projectDetails, 
    projectProfessionalApply, 
    projectProfessionalLeave, 
    projectCompanyApprove, 
    projectComplete, 
    projectIncomplete, 
    projectApplicantList, 
    projectProfessionalList, 
    projectCompanyReject, 
    projectProfessionalStatus, 
    projectSearch,
    getProfessionalProjectsFromStatus
)
from functions.certificate import giveCertificate, viewCertificate

def create_app():
    app = Flask(__name__)

    app.config.from_prefixed_env()

    db.init_app(app)
    jwt.init_app(app)

    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    app.add_url_rule('/auth/register/company', 'authRegisterCompany', authRegisterCompany, methods=['POST'])
    app.add_url_rule('/auth/register/professional', 'authRegisterProfessional', authRegisterProfessional, methods=['POST'])
    app.add_url_rule('/auth/login', 'login', login, methods=['POST'])
    app.add_url_rule('/auth/logout', 'logout', logout, methods=['POST'])
    app.add_url_rule('/notifications/get', 'getNotifications', getNotifications, methods=['GET'])
    app.add_url_rule('/editcompanyprofile', 'editCompanyProfile', editCompanyProfile, methods=['PUT'])
    app.add_url_rule('/editProfessionalProfile', 'editProfessionalProfile', editProfessionalProfile, methods=['PUT'])
    app.add_url_rule('/user/details', 'userDetails', userDetails, methods=['GET'])
    app.add_url_rule('/professional/editprofile', 'professionalEditProfile', professionalEditProfile, methods=['PUT'])
    
    app.add_url_rule('/edit/company', 'editCompany', editCompany, methods=['PUT'])
    app.add_url_rule('/edit/professional', 'editProfessional', editProfessional, methods=['PUT'])
    app.add_url_rule('/edit/project', 'editProject', editProject, methods=['PUT'])

    app.add_url_rule('/user/details/company', 'companyDetails', companyDetails, methods=['GET'])
    app.add_url_rule('/user/details/professional', 'professionalDetails', professionalDetails, methods=['GET'])
    app.add_url_rule('/user/type', 'getUserType', getUserType, methods=['GET'])
    
    app.add_url_rule('/project/create', 'projectCreate', projectCreate, methods=['POST'])
    app.add_url_rule('/project/list', 'projectList', projectList, methods=['GET'])
    app.add_url_rule('/project/listall', 'projectListAll', projectListAll, methods=['GET'])
    app.add_url_rule('/project/details', "projectDetails", projectDetails, methods=['GET'])
    app.add_url_rule('/project/professional/apply', 'projectProfessionalApply', projectProfessionalApply, methods=['POST'])
    app.add_url_rule('/project/professional/leave', 'projectProfessionalLeave', projectProfessionalLeave, methods=['POST'])
    app.add_url_rule('/project/company/approve', 'projectCompanyApprove', projectCompanyApprove, methods=['POST'])
    app.add_url_rule('/project/company/reject', 'projectCompanyReject', projectCompanyReject, methods=['POST'])
    app.add_url_rule('/project/company/complete', 'projectComplete', projectComplete, methods=['PUT'])
    app.add_url_rule('/project/company/incomplete', 'projectIncomplete', projectIncomplete, methods=['PUT'])
    app.add_url_rule('/project/applicant/list', 'projectApplicantList', projectApplicantList, methods=['GET'])
    app.add_url_rule('/project/professional/list', 'projectProfessionalList', projectProfessionalList, methods=['GET'])
    app.add_url_rule('/project/professional/status', 'projectProfessionalStatus', projectProfessionalStatus, methods=['GET'])
    app.add_url_rule('/project/search', 'projectSearch', projectSearch, methods=['GET'])
    app.add_url_rule('/project/professional/get/projects/from/status', 'getProfessionalProjectsFromStatus', getProfessionalProjectsFromStatus, methods=['GET'])
    app.add_url_rule('/giveCertificate', 'giveCertificate', giveCertificate, methods=['POST'])
    app.add_url_rule('/profile/viewCertificate', 'viewCertificate', viewCertificate, methods=['GET'])

    app.add_url_rule('/get/skills', 'getSkills', getSkills, methods=['GET'])
    app.add_url_rule('/get/categories', 'getCategories', getCategories, methods=['GET'])

    # Admin API
    app.add_url_rule('/admin/allCompanies', 'allCompanies', allCompanies, methods=['GET'])
    app.add_url_rule('/admin/allProfessionals', 'allProfessionals', allProfessionals, methods=['GET'])
    app.add_url_rule('/admin/allAdmins', 'allAdmins', allAdmins, methods=['GET'])
    app.add_url_rule('/admin/createAdmin', 'createAdmin', createAdmin, methods=['POST'])



    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)