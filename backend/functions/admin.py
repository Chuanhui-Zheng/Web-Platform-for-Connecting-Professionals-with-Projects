from flask import Flask, jsonify, request
from database.models import Company, Professional, Admin

app = Flask(__name__)

@app.route('/admin/allCompanies', methods=['GET'])
def allCompanies():
    companies = Company.query.all()
    companyList = [
        {
            "id": company.companyId,
            "companyName": company.companyName,
            "companyEmail": company.companyEmail,
            "companyPhoneNumber": company.companyPhoneNumber,
            "companyWebsite": company.companyWebsite
        }
    for company in companies
    ]

    return jsonify(companyList), 200

@app.route('/admin/allProfessionals', methods=['GET'])
def allProfessionals():
    professionals = Professional.query.all()
    professionalList = [
        {
            "id": professional.professionalId,
            "professionalFullName": professional.professionalFullName,
            "professionalEmail": professional.professionalEmail,
            "professionalPhoneNumber": professional.professionalPhoneNumber,
        }
    for professional in professionals
    ]

    return jsonify(professionalList), 200

@app.route('/admin/allAdmins', methods=['GET'])
def allAdmins():
    admins = Admin.query.all()
    adminList = [
        {
            "id": admin.adminId,
            "adminEmail": admin.adminEmail,
        }
    for admin in admins
    ]

    return jsonify(adminList), 200


@app.route('/admin/createAdmin', methods=['POST'])
def createAdmin():
    data = request.get_json()

    # If not the super admin
    if data.get("adminId") != "1":
        return jsonify({"error": "User does not have permission"}), 403

    new_admin = Admin(adminEmail=data.get("adminEmail"))
    new_admin.set_admin_password(adminPassword=data.get("adminPassword"))
    new_admin.save_admin()

    return jsonify({"adminId": new_admin.adminId}), 200
