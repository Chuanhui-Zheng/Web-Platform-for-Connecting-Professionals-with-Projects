from flask import Flask, jsonify, request
from flask_cors import CORS
from database.models import Company, Professional
from flask_jwt_extended import decode_token

app = Flask(__name__)

@app.route('/edit/company', methods=['PUT'])
def editCompany():
    data = request.get_json()
    # token = data.get('token')
    companyId = data.get('id')
    password = data.get('companyPassword')
    phone = data.get('companyPhoneNumber')
    website = data.get('companyWebsite')
    name = data.get('companyName')
    description = data.get('companyDescription')
    logo = data.get('companyLogo')

    # tokenData = decode_token(token)
    # print(tokenData)
    # companyEmail = tokenData.identity

    #set company data
    company = Company.get_company_by_id(companyId=companyId)
    company.set_company_password(password)
    company.set_company_name(name)
    company.set_company_phone(phone)
    company.set_company_webiste(website)
    company.set_company_description(description)
    company.set_company_logo(logo)

    return { "message": "hello" }, 200


# @app.route('/edit/professional', methods=['PUT'])
# def editProfessional():
#     data = request.get_json()
#     email = data.get('professionalEmail')
#     newEmail = data.get('newEmail')

#     professional = Professional.get_professional_by_email(professionalEmail=email)
#     if not professional:
#         return jsonify({"error": "Company not found"}), 404
    
#     professional.setEmail(newEmail)

#     return jsonify({"email" : professional.professionalEmail}), 200