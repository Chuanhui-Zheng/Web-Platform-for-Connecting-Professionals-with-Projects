from flask import Flask
from flask_cors import CORS

from functions.auth import authRegisterCompany, authRegisterProfessional, login, logout
from functions.notifications import getNotifications, sendNotifications
from functions.profiles import editCompanyProfile, editProfessionalProfile, userDetails, professionalEditProfile

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.add_url_rule('/auth/register/company', 'authRegisterCompany', authRegisterCompany, methods=['POST'])
app.add_url_rule('/auth/register/professional', 'authRegisterProfessional', authRegisterProfessional, methods=['POST'])
app.add_url_rule('/auth/login', 'login', login, methods=['POST'])
app.add_url_rule('/auth/logout', 'logout', logout, methods=['POST'])
app.add_url_rule('/notifications/get', 'getNotifications', getNotifications, methods=['GET'])
app.add_url_rule('/notifications/send', 'sendNotifications', sendNotifications, methods=['POST'])
app.add_url_rule('/editcompanyprofile', 'editCompanyProfile', editCompanyProfile, methods=['PUT'])
app.add_url_rule('/editProfessionalProfile', 'editProfessionalProfile', editProfessionalProfile, methods=['PUT'])
app.add_url_rule('/user/details', 'userDetails', userDetails, methods=['GET'])
app.add_url_rule('/professional/editprofile', 'professionalEditProfile', professionalEditProfile, methods=['PUT'])

if __name__ == '__main__':
    app.run(debug=True)
