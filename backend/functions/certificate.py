from flask import Flask, request, jsonify
from flask_cors import CORS
from database.models import Company, Professional, Projects
from extensions import db
from sqlalchemy import or_, and_, func, text
import re
import json
import random

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})



'''
PARAMETERS {
    projectId,
    professionalCertificate,
}

RETURN {
    dictionary of all projects
}

'''
@app.route('/giveCertificate', methods=['POST'])
def giveCertificate():
    
    data = request.get_json()
    projectId = int(data.get("projectId"))
    certificate = data.get("professionalCertificate")

    currProject = Projects.get_project_by_id(projectId=projectId)
    newId = random.randint(1, 10000000)

    professionals = currProject.listOfProfessionals

    for professional in professionals:
        currProfessional = Professional.query.filter(Professional.professionalId == professional['professionalId']).first()
        if currProfessional:
            currProfessional.professionalCertificates.append({
                "professionalCertificateId": newId,
                "professionalCertificate": certificate,
                "professionalCertificateProjectId": projectId,
                "professionalCertificateProjectName": currProject.projectName,
                "professionalCertificateCompanyId": currProject.pCompanyId,
                "professionalCertificateCompanyName": Company.get_company_by_id(companyId=currProject.pCompanyId).companyName,
                "professionalCertificateCompanyLogo": Company.get_company_by_id(companyId=currProject.pCompanyId).companyLogo
            })
        db.session.commit()
    return jsonify({"message" : "worked"}), 200


'''
Parameters (query string) {id}:
/profile/viewCertificate?id=USERID


'''
@app.route('/profile/viewCertificate', methods=['GET'])
def viewCertificate():
    idStr = request.args.get('id')
    id= int(idStr)
    professional = Professional.query.filter(Professional.professionalId == id).first()

    if not professional:
        return jsonify({"error": "Professional doesn't exist"}), 400
    

    certificates = [cert for cert in professional.professionalCertificates] 
    
    return jsonify({"professionalCertificates": certificates}), 200