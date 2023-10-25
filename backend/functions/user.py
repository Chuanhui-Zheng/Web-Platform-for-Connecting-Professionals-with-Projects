from flask import Flask, jsonify, request
from flask_cors import CORS
from database.models import Company, Professional
from flask_jwt_extended import decode_token

app = Flask(__name__)

@app.route('/user/details/company', methods=['GET'])
def companyDetails():
    id = request.args.get('id')

    company = Company.get_company_by_id(companyId=id)
    if not company:
        return jsonify({"error": "Company not found"}), 404
    
    # need to add functionality to get raiting once they are implemented
    data = {
                "companyName": company.companyName,
                "companyEmail": company.companyEmail,
                "companyPhoneNumber": company.companyPhoneNumber,
                "companyWebsite": company.companyWebsite,
                "companyDescription": company.companyDescription,
                "companyLogo": company.companyLogo,
                "companyRating": 1
            }

    return data, 200


@app.route('/user/details/professional', methods=['GET'])
def professionalDetails():
    id = request.args.get('id')

    professional = Professional.get_professional_by_id(professionalId=id)
    if not professional:
        return jsonify({"error": "Professional not found"}), 404

    # need to do raitings when implemented
    data =  {
                "professionalFullName": professional.professionalFullName,
                "professionalEmail": professional.professionalEmail,
                "professionalWebsite": professional.professionalWebsite,
                "professionalPhoneNumber": professional.professionalPhoneNumber,
                "professionalDescription": professional.professionalDescription,
                "professionalQualifications": professional.professionalQualifications,
                "professionalEducation": professional.professionalEducation,
                "professionalSkills": professional.professionalSkills,
                "professionalPhoto": professional.professionalPhoto,
                "professionalAvgRating": 1,
                "professionalRatings": professional.professionalRatings
            }

    return data, 200