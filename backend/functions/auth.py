from flask import Flask, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
# from src.error import AccessErrror
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/auth/register/company', methods=['POST'])
# def authRegisterCompany(companyName: str, companyEmail: str, companyPassword: str, 
#                         companyPhoneNumber: str, companyWebsite: str, 
#                         companyDescription: str, companyLogo: str):
def authRegisterCompany():
    data = request.get_json()

    # Error checking ###########
    

    # Get data (password, userId)
    password = generate_password_hash(data.get("password"))
    user_id = 1 ### change this #################


    # Store in database ######



    ''' javascript frontend
    import jwt_decode from "jwt-decode";

    // Assuming you have the JWT token stored in localStorage or retrieved from your API
    const token = localStorage.getItem('accessToken');

    // Decode the token to access the additional claims
    const decodedToken = jwt_decode(token);

    console.log(decodedToken);
    '''

    # Create data for token
    token_data = {
        "userId": user_id,
        "userType": "company"
    }

    # Create token
    access_token = create_access_token(identity=data.get("email"), additional_claims=token_data)

    # Return the token
    return { "token": access_token }

@app.route('/auth/register/professional', methods=['POST'])
def authRegisterProfessional():
    return

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()

    # Check if the user exists (based on email)
    email = data.get("email")

    # Get password
    password = "123"

    # Check if password is correct
    ##### might need to do the hashing thing
    # if password != data.get("password"):
    #     return AccessError

    return

@app.route('/auth/logout', methods=['POST'])
def logout():
    return
