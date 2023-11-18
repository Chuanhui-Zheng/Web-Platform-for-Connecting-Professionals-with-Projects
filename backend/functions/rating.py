from flask import Flask, request, jsonify
from flask_cors import CORS
from database.models import Company, Professional, Projects
from extensions import db
from sqlalchemy import or_, and_, func
import re, random, uuid

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

def getProjectCompany(companyId):
    return Company.get_company_by_id(companyId=companyId).companyName

def professional_exists(professionalId):
    return Projects.get_professional_by_id(professionalId)


"""
projectRateProject() allows a professional to rate a completed project.

Takes in a JSON object:
{
    userId: string (of the reviewing professional),
    projectId: string,
    projectRating: int (1-5),
    projectReview: string
}

Returns:
{
    "projectRatingId": string
}
"""
@app.route('/project/professional/rateProject', methods=['POST'])
def projectRateProject():
    data = request.get_json()
    professionalId = data.get("userId")
    projectId = data.get("projectId")
    rating = data.get("projectRating")
    review = data.get("projectReview")
    
    # check for valid rating from 1 to 5
    if rating is None or rating < 1 or rating > 5:
        return jsonify({'message': 'Rating must be between 1 and 5'}), 409
    
    professional = Professional.get_professional_by_id(professionalId=professionalId)
    if professional is None:
        return jsonify({"error": "Professional User does not exist"}), 409
    project = Projects.get_project_by_id(projectId=projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409
    
    # check if professional is in this project
    stat = 0
    for pro in project.listOfProfessionals:
        if professionalId == pro["professionalId"]:
            stat = 1
    if stat == 0:
        return jsonify({"error": "Professional User is not in this project"}), 409
    
    if project.projectStatus == "Active":
        return jsonify({"error": "Project is not yet complete"}), 409

    # generate random unique ratingsId
    ratingId = str(uuid.uuid4())

    # create dic of ratings
    new_rating = {
        'projectRatingId': ratingId,
        'professionalId': professionalId,
        'projectId': projectId,
        'projectRating': rating,
        'projectRatingReview': review,
        'professionalName': professional.professionalFullName,
        'professionalPhoto': professional.professionalPhoto
    }
    
    # append dictionary to this project rating list
    project.listOfProjectRatings.append(new_rating)
    db.session.commit()

    return jsonify({"projectRatingId": new_rating['projectRatingId']}), 200


"""
projectRateProfessional() allows a company to rate a professional for their participation in a project.

Takes in a JSON object:
{
    userId: string (of the professional receiving the rating),
    projectId: string,
    professionalRating: int (1-5),
    professionalReview: string
}

Returns:
{
    "professionalRatingId": string
}
"""
@app.route('/project/company/rateProfessional', methods=['POST'])
def projectRateProfessional():
    data = request.get_json()
    professionalId = data.get("userId")
    projectId = data.get("projectId")
    rating = data.get("professionalRating")
    review = data.get("professionalReview")
    
    professional = Projects.get_professional_by_id(professionalId)
    
    # check for valid rating from 1 to 5
    if rating is None or rating < 1 or rating > 5:
        return jsonify({'message': 'Rating must be between 1 and 5'}), 409
    
    professional = Professional.get_professional_by_id(professionalId=professionalId)
    if professional is None:
        return jsonify({"error": "Professional User does not exist"}), 409
    
    project = Projects.get_project_by_id(projectId)
    if project is None:
        return jsonify({"error": "Project does not exist"}), 409
    companyId = project.pCompanyId
    
    # check if professional is in this project
    stat = 0
    for professional in project.listOfProfessionals:
        if professionalId == professional["professionalId"]:
            stat = 1
    if stat == 0:
        return jsonify({"error": "Professional User is not in this project"}), 409
    
    professional = Professional.get_professional_by_id(professionalId)
    
    if project.projectStatus == "Active":
        return jsonify({"error": "Project is not yet complete"}), 409
    
    # generate random unique ratingsId
    ratingId = str(uuid.uuid4())

    # create dic of ratings
    new_rating = {
        'professionalRatingId': ratingId,
        'professionalId': professionalId,
        'professionalRatingCompanyId': companyId,
        'professionalRatingProjectId': projectId,
        'professionalRating': rating,
        'professioanlRatingReview': review,
        'projectName': project.projectName,
        'projectCompany': Company.get_company_by_id(companyId=companyId).companyName,
        'projectCompanyLogo': Company.get_company_by_id(companyId=companyId).companyLogo
    }
    
    # append dictionary to list
    professional.listOfProfessionalRatings.append(new_rating)
    db.session.commit()

    return jsonify({"professionalRatingId": new_rating['professionalRatingId']}), 200


"""
professionalAchievement() retrieves a professional's average rating and list of rating IDs.

Parameters:
?professionalId=PROFESSIONALID

Returns:
{
    "avg_rating": float,
    "listOfRatingId": list of strings
}
"""
@app.route('/user/details/professional/achievement', methods=['GET'])
def professionalAchievement():
    professionalId = request.args.get('id')
    professional = Professional.get_professional_by_id(professionalId)
    
    if not professional:
        return jsonify({"error": "Professional User does not exist"}), 409
    
    if len(professional.listOfProfessionalRatings) == 0:
        return jsonify({"avg_rating": 'null', "listOfRatingId":[]}), 200
    
    sum_rating = 0
    listOfRatingId = []
    
    for dict in professional.listOfProfessionalRatings:
        rating = dict["professionalRating"]
        sum_rating += rating
        listOfRatingId.append(dict["professionalRatingId"])

    avg_rating = round(sum_rating/len(professional.listOfProfessionalRatings),1)
    return jsonify({"avg_rating": avg_rating}, {"listOfRatingId":listOfRatingId}), 200