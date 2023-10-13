from flask import Flask
from auth import authRegisterCompany, authRegisterProfessional, login, logout
from notifications import getNotifications, sendNotifications
from profiles import editCompanyProfile, editProfessionalProfile, userDetails, professionalEditProfile

app = Flask(__name__)

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