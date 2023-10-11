from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token
from flask_cors import CORS
from database.models import Company, Professional, Admin

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


"""
is_user_existing() checks if a user (company or professional) already exists based on their email.
"""
def is_user_existing(email):
    company = Company.get_company_by_email(companyEmail=email)
    professional = Professional.get_professional_by_email(professionalEmail=email)
    print(f"{professional} =====================")
    if company is not None or professional is not None:
        return True
    return False


"""
authRegisterCompany() registers a new company and returns a JWT token.

Takes in a JSON object:
{
    companyName: string,
    companyEmail: string,
    companyPhoneNumber: string,
    companyWebsite: string,
    companyLogo: string,
    companyDescription: string,
    companyPassword: string
}

Returns:
{
    token: access token
}
"""
@app.route('/auth/register/company', methods=['POST'])
def authRegisterCompany():
    data = request.get_json()
    companyEmail = data.get("companyEmail")

    # Error checking (if they are existing)
    if is_user_existing(companyEmail):
        return jsonify({"error": "Company already exists"}), 409
    
    # Create new company and store in database
    new_company = Company(
        companyName=data.get("companyName"),
        companyEmail=companyEmail,
        companyPhoneNumber=data.get("companyPhoneNumber"),
        companyWebsite=data.get("companyWebsite"),
        companyLogo=data.get("companyLogo"),
        companyDescription=data.get("companyDescription")
    )
    new_company.set_company_password(companyPassword=data.get("companyPassword"))
    new_company.save_company()

    # Create data for token
    token_data = {
        "userId": new_company.companyId,
        "userType": "company"
    }

    # Create token
    access_token = create_access_token(identity=companyEmail, additional_claims=token_data)

    # Return the token
    return { "token": access_token }


"""
authRegisterProfessional() registers a new professional and returns a JWT token.

Takes in a JSON object:
{
    professionalEmail: string,
    professionalPhoto: string,
    professionalFullName: string,
    professionalPassword: string
}

Returns:
{
    token: access token
}
"""
@app.route('/auth/register/professional', methods=['POST'])
def authRegisterProfessional():
    data = request.get_json()
    professionalEmail = data.get("professionalEmail")

    # Error checking (if they are existing)
    if is_user_existing(professionalEmail):
        return jsonify({"error": "Professional already exists"}), 409
    
    # Create new professional and store in database
    new_professional = Professional(professionalEmail=professionalEmail, 
                                    professionalPhoto=data.get("professionalPhoto"),
                                    professionalFullName=data.get("professionalFullName")
    )
    new_professional.set_professional_password(professionalPassword=data.get("professionalPassword"))
    new_professional.save_professional()

    # Create data for token
    token_data = {
        "userId": new_professional.professionalId,
        "userType": "professional"
    }

    # Create token
    access_token = create_access_token(identity=professionalEmail, additional_claims=token_data)

    # Send welcome notification
    message = f"Welcome to ProJector! Edit your profile to get recommended projects!"
    new_professional.add_notification(new_professional.professionalId, message)

    # Return the token
    return jsonify({ "token": access_token }), 201


"""
login() authenticates a user (company, professional, or admin) and returns a JWT token.

Takes in a JSON object:
{
    email: string,
    password: string
}

Returns:
{
    token: access token
}
"""
@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    company = Company.get_company_by_email(companyEmail=email)
    professional = Professional.get_professional_by_email(professionalEmail=email)
    admin = Admin.get_admin_by_email(adminEmail=email)

    if company is not None:
        if company.check_company_password(companyPassword=password):
            access_token = create_access_token(identity=email, additional_claims={
                "userId": company.companyId,
                "userType": "company"
            })
            return jsonify({ "token": access_token }), 200
    elif professional is not None:
        if professional.check_professional_password(professionalPassword=password):
            access_token = create_access_token(identity=email, additional_claims={
                "userId": professional.professionalId,
                "userType": "professional"
            })
            return jsonify({ "token": access_token }), 200
    elif admin is not None:
        if admin.check_admin_password(adminPassword=password):
            access_token = create_access_token(identity=email, additional_claims={
                "userId": admin.adminId,
                "userType": "admin"
            })
            return jsonify({ "token": access_token }), 200   

    return jsonify({"error": "Invalid username or password"}), 400


"""
logout() is a placeholder for the logout functionality.
"""
@app.route('/auth/logout', methods=['POST'])
def logout():
    return
