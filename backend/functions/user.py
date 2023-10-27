from flask import Flask, jsonify, request
from flask_cors import CORS
from database.models import Company, Professional, Projects
from flask_jwt_extended import decode_token

app = Flask(__name__)


"""
companyDetails() retrieves details of a specific company.

Parameters:
?id=COMPANYID

Returns:
{
    "companyName": string,
    "companyEmail": string,
    "companyPhoneNumber": string,
    "companyWebsite": string,
    "companyDescription": string,
    "companyLogo": string,
    "companyId": string
}
"""
@app.route('/user/details/company', methods=['GET'])
def companyDetails():
    id = request.args.get('id')

    company = Company.get_company_by_id(companyId=id)
    if not company:
        return jsonify({"error": "Company not found"}), 404
    
    data = {
                "companyName": company.companyName,
                "companyEmail": company.companyEmail,
                "companyPhoneNumber": company.companyPhoneNumber,
                "companyWebsite": company.companyWebsite,
                "companyDescription": company.companyDescription,
                "companyLogo": company.companyLogo,
                "companyId": id,
            }

    return data, 200


"""
professionalDetails() retrieves details of a specific professional.

Parameters:
?id=PROFESSIONALID

Returns:
{
    "professionalFullName": string,
    "professionalEmail": string,
    "professionalWebsite": string,
    "professionalPhoneNumber": string,
    "professionalDescription": string,
    "professionalQualifications": list of strings,
    "professionalEducation": string,
    "professionalSkills": list of strings,
    "professionalPhoto": string,
    "professionalAvgRating": float,
    "professionalRatings": list of ratings,
    "professionalId": string
}
"""
@app.route('/user/details/professional', methods=['GET'])
def professionalDetails():
    id = request.args.get('id')

    professional = Professional.get_professional_by_id(professionalId=id)
    if not professional:
        return jsonify({"error": "Professional not found"}), 404

    # need to do raitings when implemented// Done
    sum_rating = 0
    avg_rating = 0
    if professional.listOfProfessionalRatings:
        for dict in professional.listOfProfessionalRatings:
            rating = dict["professionalRating"]
            sum_rating += rating
        avg_rating = round(sum_rating/len(professional.listOfProfessionalRatings),1)
    
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
                "professionalAvgRating": avg_rating,
                "professionalRatings": professional.listOfProfessionalRatings,
                "professionalId": id
            }

    return data, 200


"""
getUserType() identifies the type of user based on their ID.

Parameters:
?id=USERID

Returns:
{
    "type": "Company" | "Professional"
}
"""
@app.route('/user/type', methods=['GET'])
def getUserType():
    id = request.args.get('id')

    company = Company.query.filter_by(companyId=id).first() is not None
    if company:
        return jsonify({"type": "Company"}), 200
    
    professional = Professional.query.filter_by(professionalId=id).first() is not None
    if professional:
        return jsonify({"type": "Professional"}), 200

    return jsonify({"message": "Not a valid user"}), 404