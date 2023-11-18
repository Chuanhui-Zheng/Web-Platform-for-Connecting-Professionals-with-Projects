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



"""
giveCertificate() assigns a certificate to all professionals involved in a completed project.

Takes in a JSON object:
{
    projectId: int,
    professionalCertificate: string
}

Returns: 
{
    success message
}
"""
@app.route('/giveCertificate', methods=['POST'])
def giveCertificate():
    
    data = request.get_json()
    projectId = int(data.get("projectId"))
    certificate = data.get("professionalCertificate")

    currProject = Projects.get_project_by_id(projectId=projectId)
    newId = random.randint(1, 10000000)
    
    if not currProject:
        return jsonify({"error": "Project does not exist"}), 400
    
    if currProject.projectStatus != "Complete":
        return jsonify({"error": "Project is not completed"}), 400

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
    return jsonify({"success" : "Certificate given successfully"}), 200


"""
viewCertificate() retrieves all certificates for a given professional.

Query string parameters:
?id=USERID

Returns:
{
    professionalCertifications: list of certificates
}
"""
@app.route('/profile/viewCertificate', methods=['GET'])
def viewCertificate():
    idStr = request.args.get('id')
    id= int(idStr)
    professional = Professional.query.filter(Professional.professionalId == id).first()

    if not professional:
        return jsonify({"error": "Professional does not exist"}), 400
    

    certificates = [cert for cert in professional.professionalCertificates] 
    
    return jsonify({"professionalCertificates": certificates}), 200