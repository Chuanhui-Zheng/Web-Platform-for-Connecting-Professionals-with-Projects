from flask import Flask
from flask_cors import CORS
from extensions import db, jwt
from functions.auth import authRegisterCompany, authRegisterProfessional, login, logout
from functions.notifications import getNotifications
from functions.filter import getCategories, getSkills, getLocations
from functions.edit import editCompany, editProfessional, editProject
from functions.user import companyDetails, professionalDetails, getUserType
from functions.admin import allCompanies, allProfessionals, allAdmins, createAdmin
from functions.delete import deleteProfessionals, deleteCompanies, deleteAdmins
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
    getProfessionalProjectsFromStatus,
    getRecommendedProjects
)
from functions.certificate import giveCertificate, viewCertificate
from functions.rating import projectRateProject, projectRateProfessional, professionalAchievement

def create_app():
    app = Flask(__name__)

    app.config.from_prefixed_env()

    db.init_app(app)
    jwt.init_app(app)

    CORS(app)

    app.add_url_rule('/auth/register/company', 'authRegisterCompany', authRegisterCompany, methods=['POST'])
    app.add_url_rule('/auth/register/professional', 'authRegisterProfessional', authRegisterProfessional, methods=['POST'])
    app.add_url_rule('/auth/login', 'login', login, methods=['POST'])
    app.add_url_rule('/auth/logout', 'logout', logout, methods=['POST'])
    app.add_url_rule('/notifications/get', 'getNotifications', getNotifications, methods=['GET'])
    
    app.add_url_rule('/edit/company', 'editCompany', editCompany, methods=['PUT'])
    app.add_url_rule('/edit/professional', 'editProfessional', editProfessional, methods=['PUT'])
    app.add_url_rule('/edit/project', 'editProject', editProject, methods=['PUT'])

    app.add_url_rule('/user/details/company', 'companyDetails', companyDetails, methods=['GET'])
    app.add_url_rule('/user/details/professional', 'professionalDetails', professionalDetails, methods=['GET'])
    app.add_url_rule('/user/type', 'getUserType', getUserType, methods=['GET'])
    app.add_url_rule('/user/details/professional/achievement', 'professionalAchievement', professionalAchievement, methods=['GET'])

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
    app.add_url_rule('/project/recommended', 'getRecommendedProjects', getRecommendedProjects, methods=['GET'])

    app.add_url_rule('/get/skills', 'getSkills', getSkills, methods=['GET'])
    app.add_url_rule('/get/categories', 'getCategories', getCategories, methods=['GET'])
    app.add_url_rule('/get/locations', 'getLocations', getLocations, methods=['GET'])

    # Admin API
    app.add_url_rule('/admin/allCompanies', 'allCompanies', allCompanies, methods=['GET'])
    app.add_url_rule('/admin/allProfessionals', 'allProfessionals', allProfessionals, methods=['GET'])
    app.add_url_rule('/admin/allAdmins', 'allAdmins', allAdmins, methods=['GET'])
    app.add_url_rule('/admin/createAdmin', 'createAdmin', createAdmin, methods=['POST'])

    # Delete API
    app.add_url_rule('/delete/professionals', 'deleteProfessionals', deleteProfessionals, methods=["DELETE"])
    app.add_url_rule('/delete/companies', 'deleteCompanies', deleteCompanies, methods=["DELETE"])
    app.add_url_rule('/delete/admins', 'deleteAdmins', deleteAdmins, methods=["DELETE"])

    # Rate API
    app.add_url_rule('/project/professional/rateProject', 'rateProject', projectRateProject, methods=['POST'])
    app.add_url_rule('/project/company/rateProfessional', 'rateProefssionals', projectRateProfessional, methods=['POST'])

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)