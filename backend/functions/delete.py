from flask import Flask, jsonify, request
from database.models import Company, Professional, Admin

app = Flask(__name__)


"""
deleteProfessionals() deletes professionals by their IDs.

Takes in a JSON object:
{
    userId: string,
    professionalIds: list of strings
}
"""
@app.route('/delete/professionals', methods=['DELETE'])
def deleteProfessionals():
    data = request.get_json()
    userId = data.get("userId")
    professionalIds = data.get("professionalIds")

    if professionalIds is None:
        return jsonify({"error": "No professionalIds provided"}), 400
    
    # If empty list, return nothing
    if len(professionalIds) == 0:
        return

    # If deleting more than 1, must be an admin
    admin = Admin.get_admin_by_id(adminId=userId)
    if len(professionalIds) > 1 and admin is None:
        return jsonify({"error": "User does not have access"}), 403
    
    # If deleting 1 and is a professional, they must be deleting themself
    # or be an admin
    curr_professional_id = professionalIds[0]
    if len(professionalIds) == 1 and (curr_professional_id != userId and admin is None):
        return jsonify({"error": "User does not have access"}), 403

    # Loop through professionalIds and delete professional
    list_of_deleted = []
    for professionalId in professionalIds:
        print(f"deleting {professionalId}")
        # Check if professional exists
        professional = Professional.get_professional_by_id(professionalId=professionalId)
        print(f"at professional = {professional}")
        if professional is not None:
            # Delete professional
            professional.delete_professional()
            list_of_deleted.append(professionalId)

    return jsonify({"professionalIds": list_of_deleted}), 200


"""
deleteCompanies() deletes companies by their IDs.

Takes in a JSON object:
{
    userId: string,
    companyIds: list of strings
}

Returns:
{
    companyIds: list of deleteed Ids
}
"""
@app.route('/delete/companies', methods=['DELETE'])
def deleteCompanies():
    data = request.get_json()
    userId = data.get("userId")
    companyIds = data.get("companyIds")
    
    if companyIds is None:
        return jsonify({"error": "No companyIds provided"}), 400

    # If empty list, return nothing
    if len(companyIds) == 0:
        return

    # If deleting more than 1, must be an admin
    admin = Admin.get_admin_by_id(adminId=userId)
    if len(companyIds) > 1 and admin is None:
        return jsonify({"error": "User does not have access"}), 403
    
    # If deleting 1 and is a company, they must be deleting themself
    # or be an admin
    curr_company_id = companyIds[0]
    if len(companyIds) == 1 and (curr_company_id != userId and admin is None):
        return jsonify({"error": "User does not have access"}), 403

    # Loop through companyIds and delete company
    list_of_deleted = []
    for companyId in companyIds:
        # Check if company exists
        company = Company.get_company_by_id(companyId=companyId)
        print(f"at company = {company}")
        if company is not None:
            # Delete company
            company.delete_company()
            list_of_deleted.append(companyId)

    return jsonify({"companyIds": list_of_deleted}), 200


"""
deleteAdmins() deletes admins by their IDs.

Takes in a JSON object:
{
    adminId: string,
    deleteAdminIds: list of strings
}

Returns:
{
    deletedAdmin: list of deleted ids
}
"""
@app.route('/delete/admins', methods=['DELETE'])
def deleteAdmins():
    data = request.get_json()
    adminId = data.get("adminId")
    deleteAdminIds = data.get("deleteAdminIds")

    if deleteAdminIds is None:
        return jsonify({"error": "No deleteAdminIds provided"}), 400
    
    # If empty list, return nothing
    if len(deleteAdminIds) == 0:
        return
    
    # Must be the super admin
    if adminId != "1":
        return jsonify({"error": "User does not have access"}), 403
    
    # Super admin cannot delete themself
    if "1" in deleteAdminIds:
        return jsonify({"error": "Cannot delete super admin"}), 403
    
    # Loop through deleteAdminIds and delete company
    list_of_deleted = []
    for adminId in deleteAdminIds:
        # Check if admin exists
        admin = Admin.get_admin_by_id(adminId=adminId)
        print(f"at admin = {admin}")
        if admin is not None:
            # Delete admin
            admin.delete_admin()
            list_of_deleted.append(adminId)

    return jsonify({"deleteAdminIds": list_of_deleted}), 200
