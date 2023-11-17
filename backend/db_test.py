import unittest
from app import create_app
from extensions import db
from database.models import Company, Professional, Projects, Skills, Categories, Admin
from flask import json

RED = "\033[91m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
RESET = "\033[0m"

class CustomTestResult(unittest.TextTestResult):
    """Custom test result class to capture pass/fail statuses for a summary."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_summary = []

    def addSuccess(self, test):
        super().addSuccess(test)
        self.test_summary.append((test._testMethodName, "PASSED"))

    def addFailure(self, test, err):
        super().addFailure(test, err)
        self.test_summary.append((test._testMethodName, "FAILED"))

    def addError(self, test, err):
        super().addError(test, err)
        self.test_summary.append((test._testMethodName, "ERROR"))

    def print_summary(self):
        print(f"\n{CYAN}{'=' * 20} Test Summary {'=' * 20}{RESET}")
        for i, (test, result) in enumerate(self.test_summary, 1):
            color = GREEN if result == "PASSED" else RED
            print(f"{color}Test {i}: {test} --- {result}{RESET}")
        print(f"{CYAN}{'=' * 50}{RESET}\n")

class ProjectCreateTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = create_app()
        cls.app.config["TESTING"] = True
        cls.client = cls.app.test_client()
        cls.app_context = cls.app.app_context()
        cls.app_context.push()
        db.create_all()

        DEFAULT_SKILLS = ["Coding", "Project Management", "Data Analysis", "Design", "Marketing"]
        DEFAULT_CATEGORIES = ["Software", "Finance", "Healthcare", "Education", "Construction"]
        
        # Insert default skills if not present
        skills_entry = Skills(name="skills", listOfSkills=DEFAULT_SKILLS)
        db.session.add(skills_entry)

        # Insert default categories if not present
        categories_entry = Categories(name="categories", listOfCategories=DEFAULT_CATEGORIES)
        db.session.add(categories_entry)

        # Create admin
        cls.admin = Admin(adminEmail="admin@example.com", adminPassword="testpassword")
        db.session.add(cls.admin)
        db.session.commit()

        # Create multiple companies
        cls.company_1 = Company(companyName="Test Company 1", companyEmail="testcompany1@example.com", companyPhoneNumber="123-456-7890")
        cls.company_2 = Company(companyName="Test Company 2", companyEmail="testcompany2@example.com", companyPhoneNumber="987-654-3210")
        
        db.session.add_all([cls.company_1, cls.company_2])
        db.session.commit()
        
        # Save the IDs for later use in tests
        cls.company_1_id = cls.company_1.companyId
        cls.company_2_id = cls.company_2.companyId

        # Create multiple professionals
        cls.professional_1 = Professional(professionalFullName="John Doe", professionalEmail="johndoe@example.com", professionalPhoneNumber="111-222-3333")
        cls.professional_2 = Professional(professionalFullName="Jane Smith", professionalEmail="janesmith@example.com", professionalPhoneNumber="444-555-6666")
        
        db.session.add_all([cls.professional_1, cls.professional_2])
        db.session.commit()
        
        # Save the IDs for later use in tests
        cls.professional_1_id = cls.professional_1.professionalId
        cls.professional_2_id = cls.professional_2.professionalId
 
    def tearDown(self):
        """Clear only the data created during each test without affecting initial setup."""
        # Delete all data in tables that may have been populated during tests
        db.session.query(Projects).delete()
        db.session.query(Admin).filter(Admin.adminId != self.admin.adminId).delete()
        db.session.query(Professional).filter_by(professionalId=self.professional_1_id).first().listOfProfessionalRatings = []
        db.session.query(Professional).filter_by(professionalId=self.professional_2_id).first().listOfProfessionalRatings = []
        db.session.query(Professional).filter_by(professionalId=self.professional_1_id).first().professionalCertificates = []
        db.session.query(Professional).filter_by(professionalId=self.professional_2_id).first().professionalCertificates = []
        db.session.query(Company).filter_by(companyId=self.company_1_id).first().listOfProjectRatings = []
        db.session.query(Company).filter_by(companyId=self.company_2_id).first().listOfProjectRatings = []
        db.session.commit()
        
    @classmethod
    def tearDownClass(cls):
        db.session.remove()
        cls.app_context.pop()

    def format_output(self, test_name, expected, received):
        """Helper function to format test output with color."""
        print(f"\n{CYAN}{'=' * 60}{RESET}")
        print(f"{GREEN}Test Passed: {test_name}{RESET}")
        print(f"{YELLOW}{'-' * 60}{RESET}")
        print(f"{CYAN}Expected:{RESET}\n{expected}\n")
        print(f"{CYAN}Received:{RESET}\n{received}")
        print(f"{CYAN}{'=' * 60}{RESET}\n")


# ------------------------------------------------------------------------------------------------

    '''admin'''
    
    def testsuccess_admin_allCompanies(self):
        response = self.client.get('/admin/allCompanies')
        response_data = response.get_json()

        expected_status = 200
        expected_keys = ["id", "companyName", "companyEmail", "companyPhoneNumber", "companyWebsite"]
        expected_length = 2
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertTrue(all(key in response_data[0] for key in expected_keys), f"Expected keys: {expected_keys}, Received: {list(response_data[0].keys())}")
        self.assertEqual(len(response_data), expected_length, f"Expected length: {expected_length}, Received: {len(response_data)}")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Keys: {expected_keys}, Length: {expected_length}"
        received_output = f"Status Code: {response.status_code}, Keys: {list(response_data[0].keys())}, Length: {len(response_data)}"
        self.format_output("Admin all companies success", expected_output, received_output)

    def testsuccess_admin_allProfessionals(self):
        response = self.client.get('/admin/allProfessionals')
        response_data = response.get_json()
        
        expected_status = 200
        expected_keys = ["id", "professionalFullName", "professionalEmail", "professionalPhoneNumber"]
        expected_length = 2
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertTrue(all(key in response_data[0] for key in expected_keys), f"Expected keys: {expected_keys}, Received: {list(response_data[0].keys())}")
        self.assertEqual(len(response_data), expected_length, f"Expected length: {expected_length}, Received: {len(response_data)}")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Keys: {expected_keys}, Length: {expected_length}"
        received_output = f"Status Code: {response.status_code}, Keys: {list(response_data[0].keys())}, Length: {len(response_data)}"
        self.format_output("Admin all professionals success", expected_output, received_output)

    def testsuccess_admin_createAdmin_adminAlreadyExists(self):
        create_data = {
            "adminId": self.admin.adminId,
            "adminEmail": "admin@example.com",
            "adminPassword": "password"
        }
        response = self.client.post('/admin/createAdmin', json=create_data, content_type='application/json')
        response_data = response.get_json()
        expected_status = 409
        expected_error_message = "Admin already exists"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        expected_output = f"expected status: {expected_status}, expected error: {expected_error_message}"
        received_output = f"received status: {response.status_code}, received error: {response_data['error']}"
        self.format_output("Admin create admin admin already exists", expected_output, received_output)
        
    def testsuccess_admin_createAdmin(self):
        create_data = {
            "adminId": self.admin.adminId,
            "adminEmail": "admin4@example.com",
            "adminPassword": "password4"
        }
        response = self.client.post('/admin/createAdmin', json=create_data, content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_admin_id = Admin.query.filter_by(adminEmail="admin4@example.com").first().adminId
        self.assertEqual(response_data["adminId"], expected_admin_id, f"Expected adminId: '{expected_admin_id}', Received: '{response_data['adminId']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(len(Admin.query.all()), 2, f"Expected length: 3, Received: {len(Admin.query.all())}")
        expected_output = f"expected status: {expected_status}, expected adminId: {expected_admin_id}"
        received_output = f"received status: {response.status_code}, received adminId: {response_data['adminId']}"
        self.format_output("Admin create admin success", expected_output, received_output)
        
    '''adminDelete'''

    def test_admin_deleteProfessionals_no_professionalIds(self):
        response = self.client.delete('/delete/professionals', json={})
        response_data = response.get_json()
        expected_status = 400
        expected_error_message = "No professionalIds provided"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        expected_output = f"expected status: {expected_status}, expected error: {expected_error_message}"
        received_output = f"received status: {response.status_code}, received error: {response_data['error']}"
        self.format_output("Admin delete professionals no professionalIds", expected_output, received_output)

    def test_admin_deleteProfessionals_noUserAccess(self):
        delete_data = {
            "userId": self.professional_1_id,
            "professionalIds": [self.professional_2_id]
        }
        response = self.client.delete('/delete/professionals', 
                                    json=delete_data,
                                    content_type='application/json')
        response_data = response.get_json()
        expected_status = 403
        expected_error_message = "User does not have access"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        expected_output = f"expected status: {expected_status}, expected error: {expected_error_message}"
        received_output = f"received status: {response.status_code}, received error: {response_data['error']}"
        self.format_output("Admin delete professionals no user access", expected_output, received_output)
        
    def testsuccess_admin_deleteProfessionals_oneProfessional(self):
        professional_3 = Professional(professionalFullName="Blair", professionalEmail="blair@example.com", professionalPhoneNumber="111-222-3333")
        
        db.session.add_all([professional_3])
        db.session.commit()

        professional_3_id = professional_3.professionalId
        
        delete_data = {
            "userId": self.admin.adminId,
            "professionalIds": [professional_3.professionalId]
        }
        response = self.client.delete('/delete/professionals', 
                                    json=delete_data,
                                    content_type='application/json')
        response_data = response.get_json()

        expected_status = 200
        expected_ids = [professional_3_id]
        self.assertEqual(response_data["professionalIds"], expected_ids, f"Expected ids: '{expected_ids}', Received: '{response_data['professionalIds']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(len(Professional.query.all()), 2, f"Expected length: 2, Received: {len(Professional.query.all())}")
        expected_output = f"expected status: {expected_status}, expected ids: {expected_ids}"
        received_output = f"received status: {response.status_code}, received ids: {response_data['professionalIds']}"
        self.format_output("Admin delete professionals success", expected_output, received_output)

    def testsuccess_admin_deleteProfessionals_twoProfessionals(self):
        professional_3 = Professional(professionalFullName="Blair", professionalEmail="blair@example.com", professionalPhoneNumber="111-222-3333")
        professional_4 = Professional(professionalFullName="Edison", professionalEmail="edison@example.com", professionalPhoneNumber="444-555-6666")
        
        db.session.add_all([professional_3, professional_4])
        db.session.commit()

        professional_3_id = professional_3.professionalId
        professional_4_id = professional_4.professionalId
        
        delete_data = {
            "userId": self.admin.adminId,
            "professionalIds": [professional_3.professionalId, professional_4.professionalId]  # Changed from companyIds to professionalIds
        }
        response = self.client.delete('/delete/professionals', 
                                    json=delete_data,
                                    content_type='application/json')
        response_data = response.get_json()

        expected_status = 200
        expected_ids = [professional_3_id, professional_4_id]
        self.assertEqual(response_data["professionalIds"], expected_ids, f"Expected ids: '{expected_ids}', Received: '{response_data['professionalIds']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(len(Professional.query.all()), 2, f"Expected length: 2, Received: {len(Professional.query.all())}")
        expected_output = f"expected status: {expected_status}, expected ids: {expected_ids}"
        received_output = f"received status: {response.status_code}, received ids: {response_data['professionalIds']}"
        self.format_output("Admin delete professionals success", expected_output, received_output)

    def test_admin_deleteCompanies_noCompanyIds(self):
        response = self.client.delete('/delete/companies', json={}, content_type='application/json')
        response_data = response.get_json()
        expected_status = 400
        expected_error_message = "No companyIds provided"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        expected_output = f"expected status: {expected_status}, expected error: {expected_error_message}"
        received_output = f"received status: {response.status_code}, received error: {response_data['error']}"
        self.format_output("Admin delete companies no companyIds", expected_output, received_output)

    def test_admin_deleteCompanies_noUserAccess(self):
        delete_data = {
            "userId": self.professional_1_id,
            "companyIds": [self.company_1_id]
        }
        
        response = self.client.delete('/delete/companies', json=delete_data, content_type='application/json')
        response_data = response.get_json()
        expected_status = 403
        expected_error_message = "User does not have access"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        expected_output = f"expected status: {expected_status}, expected error: {expected_error_message}"
        received_output = f"received status: {response.status_code}, received error: {response_data['error']}"
        self.format_output("Admin delete companies no userId", expected_output, received_output)

    def testsuccess_admin_deleteCompanies_oneCompany(self):
        company_3 = Company(companyName="Company 3", companyEmail="company3@example.com", companyPhoneNumber="111-222-3333")
        
        db.session.add_all([company_3])
        db.session.commit()
        
        company_3_id = company_3.companyId
        
        delete_data = {
            "userId": self.admin.adminId,
            "companyIds": [company_3.companyId]
        }
        response = self.client.delete('/delete/companies', 
                                    json=delete_data,
                                    content_type='application/json')
        response_data = response.get_json()

        expected_status = 200
        expected_ids = [company_3_id]
        self.assertEqual(response_data["companyIds"], expected_ids, f"Expected ids: '{expected_ids}', Received: '{response_data['companyIds']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(len(Company.query.all()), 2, f"Expected length: 2, Received: {len(Company.query.all())}")
        expected_output = f"expected status: {expected_status}, expected ids: {expected_ids}"
        received_output = f"received status: {response.status_code}, received ids: {response_data['companyIds']}"
        self.format_output("Admin delete companies success", expected_output, received_output)

    def testsuccess_admin_deleteCompanies_twoCompanies(self):
        company_3 = Company(companyName="Company 3", companyEmail="company3@example.com", companyPhoneNumber="111-222-3333")
        company_4 = Company(companyName="Company 4", companyEmail="company4@example.com", companyPhoneNumber="444-555-6666")
        
        db.session.add_all([company_3, company_4])
        db.session.commit()

        company_3_id = company_3.companyId
        company_4_id = company_4.companyId  
        
        delete_data = {
            "userId": self.admin.adminId,
            "companyIds": [company_3.companyId, company_4.companyId]
        }
        response = self.client.delete('/delete/companies', 
                                    json=delete_data,
                                    content_type='application/json')
        response_data = response.get_json()

        expected_status = 200
        expected_ids = [company_3_id, company_4_id]
        self.assertEqual(response_data["companyIds"], expected_ids, f"Expected ids: '{expected_ids}', Received: '{response_data['companyIds']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(len(Company.query.all()), 2, f"Expected length: 2, Received: {len(Company.query.all())}")
        self.format_output("Admin delete companies success", expected_ids, response_data["companyIds"])

    def test_admin_deleteAdmins_noDeleteAdminIds(self):
        response = self.client.delete('/delete/admins', json={}, content_type='application/json')
        response_data = response.get_json()
        expected_status = 400
        expected_error_message = "No deleteAdminIds provided"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        expected_output = f"expected status: {expected_status}, expected error: {expected_error_message}"
        received_output = f"received status: {response.status_code}, received error: {response_data['error']}"
        self.format_output("Admin delete admins no deleteAdminIds", expected_output, received_output)
    
    def test_admin_deleteAdmins_noUserAccess(self):
        delete_data = {
            "userId": self.professional_1_id,
            "deleteAdminIds": [self.admin.adminId]
        }
        response = self.client.delete('/delete/admins', 
                                    json=delete_data,
                                    content_type='application/json')
        response_data = response.get_json()
        expected_status = 403
        expected_error_message = "User does not have access"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        expected_output = f"expected status: {expected_status}, expected error: {expected_error_message}"
        received_output = f"received status: {response.status_code}, received error: {response_data['error']}"
        self.format_output("Admin delete admins no user access", expected_output, received_output)

    def testsuccess_admin_deleteAdmins_oneAdmin(self):
        admin_3 = Admin(adminId=3, adminEmail="admin3@example.com", adminPassword="password3")
        
        db.session.add(admin_3)
        db.session.commit()

        admin_3_id = admin_3.adminId
        
        delete_data = {
            "adminId": self.admin.adminId,
            "deleteAdminIds": [admin_3.adminId]
        }
        response = self.client.delete('/delete/admins', 
                                    json=delete_data,
                                    content_type='application/json')
        response_data = response.get_json()

        expected_status = 200
        expected_ids = [admin_3_id]
        self.assertEqual(response_data["deleteAdminIds"], expected_ids, f"Expected ids: '{expected_ids}', Received: '{response_data['deleteAdminIds']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(len(Admin.query.all()), 1, f"Expected length: 2, Received: {len(Admin.query.all())}")
        expected_output = f"expected status: {expected_status}, expected ids: {expected_ids}"
        received_output = f"received status: {response.status_code}, received ids: {response_data['deleteAdminIds']}"
        self.format_output("Admin delete admins success", expected_output, received_output)

    def testsuccess_admin_deleteAdmins_twoAdmins(self):
        admin_3 = Admin(adminId=3, adminEmail="admin3@example.com", adminPassword="password3")
        admin_4 = Admin(adminId=4, adminEmail="admin4@example.com", adminPassword="password4")
        
        db.session.add_all([admin_3, admin_4])
        db.session.commit()

        admin_3_id = admin_3.adminId
        admin_4_id = admin_4.adminId
        
        delete_data = {
            "adminId": self.admin.adminId,
            "deleteAdminIds": [admin_3.adminId, admin_4.adminId]
        }
        response = self.client.delete('/delete/admins', 
                                    json=delete_data,
                                    content_type='application/json')
        response_data = response.get_json()

        expected_status = 200
        expected_ids = [admin_3_id, admin_4_id]
        self.assertEqual(response_data["deleteAdminIds"], expected_ids, f"Expected ids: '{expected_ids}', Received: '{response_data['deleteAdminIds']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(len(Admin.query.all()), 1, f"Expected length: 2, Received: {len(Admin.query.all())}")
        expected_output = f"expected status: {expected_status}, expected ids: {expected_ids}"
        received_output = f"received status: {response.status_code}, received ids: {response_data['deleteAdminIds']}"
        self.format_output("Admin delete admins success", expected_output, received_output)
        
# ------------------------------------------------------------------------------------------------

    '''editProfile'''
    
    def test_editCompany_invalid_companyId(self):
        edit_data = {
            "id": 99999,
        }
        response = self.client.put('/edit/company', data=json.dumps(edit_data), content_type='application/json')
        response_data = response.get_json()

        expected_status = 404
        expected_error_message = "Company not found"

        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Error Message: '{expected_error_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Company edit profile invalid companyId", expected_output, received_output)
    
    def testsuccess_editCompany_profile(self):
        edit_data = {
            "id": self.company_1_id,
            "companyPassword": "testpassword1",
            "companyPhoneNumber": "111-222-3333",
            "companyWebsite": "www.testcompany1.com",
            "companyName": "Edited Company 1",
            "companyDescription": "Edited Company 1 Description",
            "companyLogo": "www.testcompany1.com/logo.png"
        }
        response = self.client.put('/edit/company', data=json.dumps(edit_data), content_type='application/json')
        response_data = response.get_json() 
        
        expected_status = 200
        expected_message = "Company details updated"
        
        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["success"], expected_message, f"Expected message: '{expected_message}', Received: '{response_data['success']}'")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Message: '{expected_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Company edit profile success", expected_output, received_output)

    def test_editProfessional_invalid_professionalId(self):
        edit_data = {
            "id": 99999,
        }
        response = self.client.put('/edit/professional', data=json.dumps(edit_data), content_type='application/json')
        response_data = response.get_json()

        expected_status = 404
        expected_error_message = "Professional not found"

        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Error Message: '{expected_error_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Professional edit profile invalid professionalId", expected_output, received_output)
        
    def testsuccess_editProfessional_profile(self):
        edit_data = {
            "id": self.professional_1_id,
            "password": "testpassword1",
            "professionalWebsite": "www.testprofessional1.com",
            "professionalPhoneNumber": "111-222-3333",
            "professionalDescription": "Edited Professional 1 Description",
            "professionalFullName": "Edited Professional 1",
            "professionalQualifications": "Edited Professional 1 Qualification",
            "professionalEducation": "Edited Professional 1 Education",
            "professionalSkills": ["Edited Professional 1 Skill 1", "Edited Professional 1 Skill 2"],
            "professionalPhoto": "www.testprofessional1.com/photo.png"
        }
        response = self.client.put('/edit/professional', data=json.dumps(edit_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_message = "Professional details updated"
        
        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["success"], expected_message, f"Expected message: '{expected_message}', Received: '{response_data['success']}'")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Message: '{expected_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Professional edit profile success", expected_output, received_output)

    def test_editProject_invalid_projectId(self):
        edit_data = {
            "projectId": 99999,
        }
        response = self.client.put('/edit/project', data=json.dumps(edit_data), content_type='application/json')
        response_data = response.get_json()

        expected_status = 409
        expected_error_message = "Project does not exist"

        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Error Message: '{expected_error_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Project edit profile invalid projectId", expected_output, received_output)

    def testsuccess_editProject_profile(self):
        project_data = {
            "companyId": self.company_1_id,
            "projectName": "Project 1 by Company 1",
        }
        response = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        response_data = response.get_json()
        self.project_1_id = response_data["projectId"]
        
        edit_data = {
            "projectId": self.project_1_id,
            "projectName": "Edited Project 1",
            "projectDescription": "Edited Project 1 Description",
            "projectCategory": "Edited Project 1 Category",
            "projectSkills": ["Edited Project 1 Skill 1", "Edited Project 1 Skill 2"],
            "projectBudget": 1000,
            "projectDuration": 10
        }
        response = self.client.put('/edit/project', data=json.dumps(edit_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_message = "Project details updated"
        
        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["success"], expected_message, f"Expected message: '{expected_message}', Received: '{response_data['success']}'")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Message: '{expected_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Project edit profile success", expected_output, received_output)

    def testsuccess_Company_Profile_afterEdit(self):
        company_3 = Company(companyId=3, companyEmail="company3@example.com", companyPassword="password3", companyName="Company 3", 
                            companyDescription="Company 3 Description", companyWebsite="www.company3.com", companyLogo="www.company3.com/logo.png")
        db.session.add(company_3)
        db.session.commit()
        
        edit_data = {
            "id": company_3.companyId,
            "password": "testpassword3",
            "phone": "333-444-5555",
            "website": "www.testcompany3.com",
            "name": "Edited Company 3",
            "description": "Edited Company 3 Description",
            "logo": "www.testcompany3.com/logo.png"
        }
        response = self.client.put('/edit/company', data=json.dumps(edit_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_message = "Company details updated"
        
        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["success"], expected_message, f"Expected message: '{expected_message}', Received: '{response_data['success']}'") 

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Message: '{expected_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Company profile after edit", expected_output, received_output)
        
        db.session.delete(company_3)
        db.session.commit()

    def testsuccess_Professional_Profile_afterEdit(self):
        professional_3 = Professional(professionalId=3, professionalEmail="professional3@example.com", professionalPassword="password3", 
                                      professionalFullName="Professional 3", professionalPhoneNumber="333-444-5555", professionalWebsite="www.testprofessional3.com", 
                                      professionalDescription="Professional 3 Description", professionalQualifications="Professional 3 Qualifications", 
                                      professionalEducation="Professional 3 Education", professionalSkills=["Professional 3 Skill 1", "Professional 3 Skill 2"], 
                                      professionalPhoto="www.testprofessional3.com/photo.png")
        db.session.add(professional_3)
        db.session.commit()

        edit_data = {
            "id": professional_3.professionalId,
            "password": "testpassword3",
            "professionalWebsite": "www.testprofessional3.com",
            "professionalPhoneNumber": "333-444-5555",
            "professionalDescription": "Edited Professional 3 Description",
            "professionalFullName": "Edited Professional 3",
            "professionalQualifications": "Edited Professional 3 Qualification",
            "professionalEducation": "Edited Professional 3 Education",
            "professionalSkills": ["Edited Professional 3 Skill 1", "Edited Professional 3 Skill 2"],
            "professionalPhoto": "www.testprofessional3.com/photo.png"
        }
        response = self.client.put('/edit/professional', data=json.dumps(edit_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_message = "Professional details updated"
        
        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["success"], expected_message, f"Expected message: '{expected_message}', Received: '{response_data['success']}'")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Message: '{expected_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Professional profile after edit", expected_output, received_output)
        
        db.session.delete(professional_3)
        db.session.commit()

# ------------------------------------------------------------------------------------------------

    '''projectCreate'''
    
    def test_company_projectCreate_invalid_companyId(self):
        project_data = {
            "companyId": 99999,  # Non-existent company ID
            "projectName": "Project by Invalid Company",
        }
        response = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        response_data = response.get_json()

        expected_status = 409
        expected_error_message = "Company does not exist"

        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertIn("error", response_data, f"Expected key 'error' in response data. Received: {response_data}")
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")

        # Formatted output for passing test
        expected_output = f"Status Code: {expected_status}, Error Message: '{expected_error_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Invalid company project creation", expected_output, received_output) 
    
    def testsuccess_company_1_projectCreate(self):
        project_data = {
            "companyId": self.company_1_id,
            "projectName": "Project by Company 1",
        }
        response = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        response_data = response.get_json()

        expected_status = 200
        expected_keys = ["projectId"]

        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertTrue(all(key in response_data for key in expected_keys), f"Expected keys: {expected_keys}, Received: {list(response_data.keys())}")

        # Formatted output for passing test
        expected_output = f"Status Code: {expected_status}, Keys: {expected_keys}"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Company 1 creates project", expected_output, received_output)

    def testsuccess_company_2_projectCreate(self):
        project_data = {
            "companyId": self.company_2_id,
            "projectName": "Project by Company 2",
        }
        response = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        response_data = response.get_json()

        expected_status = 200
        expected_keys = ["projectId"]

        # Assertions
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertTrue(all(key in response_data for key in expected_keys), f"Expected keys: {expected_keys}, Received: {list(response_data.keys())}")

        # Formatted output for passing test
        expected_output = f"Status Code: {expected_status}, Keys: {expected_keys}"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("Company 2 creates project", expected_output, received_output)

    '''projectList''' 
        
    def test_projectList_no_projects(self):
        # Request to list all projects for company_2 (assuming it has no projects created)     
        list_data = {
            "id": self.company_2_id,
            "status": "Active"
        }
        response = self.client.get('/project/list', query_string=list_data, content_type='application/json')
        response_data = response.get_json()
        print(response_data)

        expected_status = 200
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")

        # Formatted output
        expected_output = "Status Code: 200, Projects Count: 0"
        received_output = f"Status Code: {response.status_code}, Projects Count: {len(response_data)}"
        self.format_output("List projects for company with no projects", expected_output, received_output)
        
    def test_projectList_invalid_company(self):
        # Request to list projects for a non-existent company ID
        list_data = {
            "id": 99999,
            "status": "Active"
        }
        response = self.client.get('/project/list', query_string=list_data, content_type='application/json')
        response_data = response.get_json()

        # Expected error response for non-existent company
        expected_status = 409
        expected_error_message = "User does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertIn("error", response_data, f"Expected key 'error' in response data. Received: {response_data}")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Error Message: '{expected_error_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("List projects for non-existent company", expected_output, received_output)
    
    def testsuccess_projectList(self):
        # Create projects for company_1
        project_data_1 = {
            "companyId": self.company_1_id,
            "projectName": "Project 1 by Company 1",
        }
        project_data_2 = {
            "companyId": self.company_1_id,
            "projectName": "Project 2 by Company 1",
        }
        # Create both projects for the same company
        self.client.post('/project/create', data=json.dumps(project_data_1), content_type='application/json')
        self.client.post('/project/create', data=json.dumps(project_data_2), content_type='application/json')
        
        # Request to list all projects for company_1  
        list_data = {
            "id": self.company_1_id,
            "status": "Active"
        }
        response = self.client.get('/project/list', query_string=list_data, content_type='application/json')
        response_data = response.get_json()

        # Expected to return two projects
        expected_status = 200
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(len(response_data), 2, f"Expected 2 projects, Received: {len(response_data)}")

        # Formatted output
        expected_output = "Status Code: 200, Projects Count: 2"
        received_output = f"Status Code: {response.status_code}, Projects Count: {len(response_data)}"
        self.format_output("List projects for company with existing projects", expected_output, received_output)       

    '''projectListAll'''
    
    def test_list_all_projects_same_company(self):
        # Create multiple projects for the same company
        project_data_1 = {"companyId": self.company_1_id, "projectName": "Project 1 by Company 1"}
        project_data_2 = {"companyId": self.company_1_id, "projectName": "Project 2 by Company 1"}

        self.client.post('/project/create', data=json.dumps(project_data_1), content_type='application/json')
        self.client.post('/project/create', data=json.dumps(project_data_2), content_type='application/json')
        
        # Request to list all projects
        response = self.client.get('/project/listall')
        response_data = response.get_json()

        # Expected response
        expected_status = 200
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertIsInstance(response_data, list, f"Expected list, got {type(response_data)}")
        self.assertEqual(len(response_data), 2, f"Expected 2 projects, Received: {len(response_data)}")

        # Formatted output
        expected_output = "Status Code: 200, Projects Count: 2"
        received_output = f"Status Code: {response.status_code}, Projects Count: {len(response_data)}"
        self.format_output("List all projects for the same company", expected_output, received_output)
        
    def test_list_all_projects_different_companies(self):
        # Create projects for different companies
        project_data_1 = {"companyId": self.company_1_id, "projectName": "Project by Company 1"}
        project_data_2 = {"companyId": self.company_2_id, "projectName": "Project by Company 2"}

        self.client.post('/project/create', data=json.dumps(project_data_1), content_type='application/json')
        self.client.post('/project/create', data=json.dumps(project_data_2), content_type='application/json')
        
        # Request to list all projects
        response = self.client.get('/project/listall')
        response_data = response.get_json()

        # Expected response
        expected_status = 200
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertIsInstance(response_data, list, f"Expected list, got {type(response_data)}")
        self.assertEqual(len(response_data), 2, f"Expected 2 projects, Received: {len(response_data)}")

        # Formatted output
        expected_output = "Status Code: 200, Projects Count: 2"
        received_output = f"Status Code: {response.status_code}, Projects Count: {len(response_data)}"
        self.format_output("List all projects for different companies", expected_output, received_output)
        
    def test_list_all_projects_no_projects(self):
        # Ensure there are no projects created
        response = self.client.get('/project/listall')
        response_data = response.get_json()

        # Expected response
        expected_status = 200
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")

        # Formatted output
        expected_output = "Status Code: 200, No Projects Message"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("List all projects with no projects available", expected_output, received_output)   
        
    '''projectDetails'''

    def test_projectDetails_invalid_projectId(self):
        # Request details for an invalid project ID
        details_data = {
            "projectId": 99999
        }
        response = self.client.get('/project/details', query_string=details_data, content_type='application/json')
        response_data = response.get_json()

        # Expected response
        expected_status = 409
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["error"], "Project does not exist", "Error message does not match")

        # Formatted output
        expected_output = "Status Code: 409, Error: Project does not exist"
        received_output = f"Status Code: {response.status_code}, Error: {response_data['error']}"
        self.format_output("Project details for invalid project ID", expected_output, received_output)
        
    def testsuccess_projectDetails_project1(self):
        # Create project 1 for company 1
        project_data_1 = {
            "companyId": self.company_1_id, 
            "projectName": "Project 1 by Company 1"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data_1), content_type='application/json')
        project_1_id = response_create.get_json()["projectId"]

        # Request details for project 1
        details_data = {
            "projectId": project_1_id
        }
        response = self.client.get('/project/details', query_string=details_data, content_type='application/json')
        response_data = response.get_json()

        # Expected response
        expected_status = 200
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["projectId"], project_1_id, "Project ID does not match")
        self.assertEqual(response_data["projectName"], "Project 1 by Company 1", "Project Name does not match")

        # Formatted output
        expected_output = f"Status Code: 200, Project ID: {project_1_id}"
        received_output = f"Status Code: {response.status_code}, Project ID: {response_data['projectId']}"
        self.format_output("Project details for project 1 by company 1", expected_output, received_output)
        
    def testsuccess_projectDetails_project2(self):
        # Create project 2 for company 1
        project_data_2 = {
            "companyId": self.company_1_id, 
            "projectName": "Project 2 by Company 1"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data_2), content_type='application/json')
        project_2_id = response_create.get_json()["projectId"]

        # Request details for project 2
        details_data = {
            "projectId": project_2_id
        }
        response = self.client.get('/project/details', query_string=details_data, content_type='application/json')
        response_data = response.get_json()

        # Expected response
        expected_status = 200
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["projectId"], project_2_id, "Project ID does not match")
        self.assertEqual(response_data["projectName"], "Project 2 by Company 1", "Project Name does not match")

        # Formatted output
        expected_output = f"Status Code: 200, Project ID: {project_2_id}"
        received_output = f"Status Code: {response.status_code}, Project ID: {response_data['projectId']}"
        self.format_output("Project details for project 2 by company 1", expected_output, received_output)
        
    def testsuccess_projectDetails_after_edit(self):
        # Step 1: Create a project for company_1
        project_data = {"companyId": self.company_1_id, "projectName": "Original Project Name"}
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]

        # Step 2: Edit the project
        edit_data = {"projectId": project_id, "projectName": "Updated Project Name"}
        response_edit = self.client.put('/edit/project', data=json.dumps(edit_data), content_type='application/json')
        
        # Verify that the edit was successful
        self.assertEqual(response_edit.status_code, 200, f"Expected: 200, Received: {response_edit.status_code}")

        # Step 3: Request project details with /project/details
        details_data = {
            "projectId": project_id
        }
        response_details = self.client.get('/project/details', query_string=details_data, content_type='application/json')
        response_data_details = response_details.get_json()

        # Verify that the project details reflect the edited name
        self.assertEqual(response_details.status_code, 200, f"Expected: 200, Received: {response_details.status_code}")
        self.assertEqual(response_data_details["projectName"], "Updated Project Name", "Project Name does not match the updated name.")

        # Formatted output
        expected_output = "Status Code: 200, Project Name: Updated Project Name"
        received_output = f"Status Code: {response_details.status_code}, Project Name: {response_data_details['projectName']}"
        self.format_output("Project details after editing with /project/details", expected_output, received_output)
        
    '''projectList&projectListAll after edit'''
    
    def test_projectList_after_edit(self):
        # Step 1: Create a project for company_1
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]

        # Step 2: Edit the project
        edit_data = {"projectId": project_id, "projectName": "Updated Project Name"}
        response_edit = self.client.put('/edit/project', data=json.dumps(edit_data), content_type='application/json')
        
        # Verify that the edit was successful
        self.assertEqual(response_edit.status_code, 200, f"Expected: 200, Received: {response_edit.status_code}")

        # Step 3: List the project with /project/list (using companyId)
        list_data = {
            "id": self.company_1_id,
            "status": "Active"
        }
        response_list = self.client.get('/project/list', query_string=list_data, content_type='application/json')
        response_data_list = response_list.get_json()

        # Verify that the updated project is listed with the new name
        self.assertEqual(response_list.status_code, 200, f"Expected: 200, Received: {response_list.status_code}")
        self.assertTrue(any(project["projectId"] == project_id and project["projectName"] == "Updated Project Name" for project in response_data_list),
                        "Updated project not found in list.")

        # Formatted output
        expected_output = "Status Code: 200, Project Name: Updated Project Name"
        received_output = f"Status Code: {response_list.status_code}, Project Name: {response_data_list[0]['projectName']}"
        self.format_output("List project after editing with /project/list", expected_output, received_output)
        
    def test_projectList_all_after_edit(self):
        # Step 1: Create a project for company_1
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]

        # Step 2: Edit the project
        edit_data = {"projectId": project_id, "projectName": "Updated Project Name"}
        response_edit = self.client.put('/edit/project', data=json.dumps(edit_data), content_type='application/json')
        
        # Verify that the edit was successful
        self.assertEqual(response_edit.status_code, 200, f"Expected: 200, Received: {response_edit.status_code}")

        # Step 3: List all projects with /project/listall
        response_listall = self.client.get('/project/listall')
        response_data_listall = response_listall.get_json()

        # Verify that the updated project is listed with the new name
        self.assertEqual(response_listall.status_code, 200, f"Expected: 200, Received: {response_listall.status_code}")
        self.assertTrue(any(project["projectId"] == project_id and project["projectName"] == "Updated Project Name" for project in response_data_listall),
                        "Updated project not found in listall.")

        # Formatted output
        expected_output = "Status Code: 200, Project Name: Updated Project Name"
        received_output = f"Status Code: {response_listall.status_code}, Project Name: {response_data_listall[0]['projectName']}"
        self.format_output("List all projects after editing with /project/listall", expected_output, received_output)
       
    '''projectApply'''
    
    def test_projectApply_invalid_professionalId(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        request_data = {
            "professionalId": 99999,
            "projectId": project_id
        }
        response = self.client.post('/project/professional/apply', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Professional does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project apply with invalid professionalId", expected_error_message, response_data["error"])
        
    def test_projectApply_invalid_projectId(self):
        request_data = {
            "professionalId": self.professional_1_id,
            "projectId": 123
        }
        response = self.client.post('/project/professional/apply', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Project does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project apply with invalid projectId", expected_error_message, response_data["error"])
        
    def test_projectApply_AlreadyApplicant(self):
        # Step 1: Create a project for company_1
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        } 
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        apply_data = {
            "professionalId": self.professional_1_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data), content_type='application/json')
        
        response = self.client.post('/project/professional/apply', data=json.dumps(apply_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Already an applicant"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project apply with professional already in project", expected_error_message, response_data["error"])
        
    def test_projectReject_invalid_professionalId(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        apply_data = {
            "professionalId": self.professional_1_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data), content_type='application/json')
        
        reject_data = {
            "professionalIds": [99999],
            "projectId": project_id
        }
        response = self.client.post('/project/company/reject', data=json.dumps(reject_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Professional does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project reject with invalid professionalId", expected_error_message, response_data["error"])

    '''projectApprove'''
    
    def test_projectApprove_invalid_professionalId(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        approve_data = {
            "professionalIds": [99999],
            "projectId": project_id
        }
        response = self.client.post('/project/company/approve', data=json.dumps(approve_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Professional does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project approve with invalid professionalId", expected_error_message, response_data["error"])

    def test_projectApprove_invalid_projectId(self):
        approve_data = {
            "professionalIds": [self.professional_1_id],
            "projectId": 123
        }
        response = self.client.post('/project/company/approve', data=json.dumps(approve_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Project does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project approve with invalid projectId", expected_error_message, response_data["error"])
    
    def test_projectApprove_professionalAlreadyApproved(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        apply_data = {
            "professionalId": self.professional_1_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data), content_type='application/json')
        
        approve_data = {
            "professionalIds": [self.professional_1_id],
            "projectId": project_id
        }
        self.client.post('/project/company/approve', data=json.dumps(approve_data), content_type='application/json')
        
        response = self.client.post('/project/professional/apply', data=json.dumps(apply_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Professional is already a part of this project"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project apply with professional already approved", expected_error_message, response_data["error"])

    def test_projectApprove_professionalNotApplicant(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        approve_data = {
            "professionalIds": [self.professional_2_id],
            "projectId": project_id
        }
        response = self.client.post('/project/company/approve', data=json.dumps(approve_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 405
        expected_error_message = "Professional not an applicant"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project approve with professional not an applicant", expected_error_message, response_data["error"])

    def testsuccess_projectApply_approve_1user(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        apply_data = {
            "professionalId": self.professional_1_id,
            "projectId": project_id
        }
        response = self.client.post('/project/professional/apply', data=json.dumps(apply_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_success_message = "Professional added to applicants list"
        self.assertEqual(response_data["success"], expected_success_message, f"Expected success message: '{expected_success_message}', Received: '{response_data['success']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project apply success", expected_success_message, response_data["success"])

    def testsuccess_projectApply_approve_2users(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        apply_data_1 = {
            "professionalId": self.professional_1_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_1), content_type='application/json')
        
        apply_data_2 = {
            "professionalId": self.professional_2_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_2), content_type='application/json')
        
        approve_data = {
            "professionalIds": [self.professional_1_id, self.professional_2_id],
            "projectId": project_id
        }
        response = self.client.post('/project/company/approve', data=json.dumps(approve_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_success_message = "Professional approved"
        self.assertEqual(response_data["success"], expected_success_message, f"Expected success message: '{expected_success_message}', Received: '{response_data['success']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project approve with professional", expected_success_message, response_data["success"])
        
    '''projectReject'''
    
    def test_projectReject_invalid_professionalId(self):
        reject_data = {
            "professionalIds": [99999],
            "projectId": 123
        }
        response = self.client.post('/project/company/reject', data=json.dumps(reject_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Professional does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project reject with invalid professionalId", expected_error_message, response_data["error"])
    
    def test_projectReject_invalid_projectId(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        reject_data = {
            "professionalIds": [self.professional_1_id],
            "projectId": 123
        }
        response = self.client.post('/project/company/reject', data=json.dumps(reject_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Project does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project reject with invalid projectId", expected_error_message, response_data["error"])
        
    def test_projectReject_professionalNotApplicant(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        reject_data = {
            "professionalIds": [self.professional_2_id],
            "projectId": project_id
        }
        response = self.client.post('/project/company/reject', data=json.dumps(reject_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 405
        expected_error_message = "Professional not an applicant"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project reject with professional not an applicant", expected_error_message, response_data["error"])

    def testsuccess_projectReject_1user(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        apply_data = {
            "professionalId": self.professional_1_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data), content_type='application/json')
        
        reject_data = {
            "professionalIds": [self.professional_1_id],
            "projectId": project_id
        }
        response = self.client.post('/project/company/reject', data=json.dumps(reject_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_success_message = "Status updated to Rejected"
        self.assertEqual(response_data["success"], expected_success_message, f"Expected success message: '{expected_success_message}', Received: '{response_data['success']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project reject with professional", expected_success_message, response_data["success"])

    def testsuccess_projectReject_2users(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        apply_data_1 = {
            "professionalId": self.professional_1_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_1), content_type='application/json')
        
        apply_data_2 = {
            "professionalId": self.professional_2_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_2), content_type='application/json')
        
        reject_data = {
            "professionalIds": [self.professional_1_id, self.professional_2_id],
            "projectId": project_id
        }
        response = self.client.post('/project/company/reject', data=json.dumps(reject_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_success_message = "Status updated to Rejected"
        self.assertEqual(response_data["success"], expected_success_message, f"Expected success message: '{expected_success_message}', Received: '{response_data['success']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project reject with professional", expected_success_message, response_data["success"])

    '''projectComplete'''
    
    def test_projectComplete_invalid_projectId(self):
        complete_data = {
            "projectId": 123
        }
        response = self.client.put('/project/company/complete', data=json.dumps(complete_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Project does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project complete with invalid projectId", expected_error_message, response_data["error"])
        
    def testsuccess_projectComplete(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        complete_data = {
            "projectId": project_id
        }
        response = self.client.put('/project/company/complete', data=json.dumps(complete_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_success_message = "Project status set to Complete"
        self.assertEqual(response_data["success"], expected_success_message, f"Expected success message: '{expected_success_message}', Received: '{response_data['success']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project complete success", expected_success_message, response_data["success"])

    def test_projectComplete_projectAlreadyComplete(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        complete_data = {
            "projectId": project_id
        }
        self.client.put('/project/company/complete', data=json.dumps(complete_data), content_type='application/json')
        response = self.client.put('/project/company/complete', data=json.dumps(complete_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_error_message = "Project is already Complete"
        self.assertEqual(response_data["message"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['message']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project complete with project already complete", expected_error_message, response_data["message"])

    '''projectIncomplete'''
    
    def test_projectIncomplete_invalid_projectId(self):
        incomplete_data = {
            "projectId": 123
        }
        response = self.client.put('/project/company/incomplete', data=json.dumps(incomplete_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Project does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project incomplete with invalid projectId", expected_error_message, response_data["error"])

    def testsuccess_projectIncomplete(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        complete_data = {
            "projectId": project_id
        }
        self.client.put('/project/company/complete', data=json.dumps(complete_data), content_type='application/json')
        
        incomplete_data = {
            "projectId": project_id
        }
        response = self.client.put('/project/company/incomplete', data=json.dumps(incomplete_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_success_message = "Project status set to incomplete"
        self.assertEqual(response_data["success"], expected_success_message, f"Expected success message: '{expected_success_message}', Received: '{response_data['success']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project incomplete success", expected_success_message, response_data["success"])

    def test_projectIncomplete_projectAlreadyIncomplete(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        incomplete_data = {
            "projectId": project_id
        }
        response = self.client.put('/project/company/incomplete', data=json.dumps(incomplete_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_error_message = "Project is already set as incomplete"
        self.assertEqual(response_data["message"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['message']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project incomplete with project already incomplete", expected_error_message, response_data["message"])

    '''projectSearch'''
    
    def test_projectSearch_categories_noResults(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name",
            "categories": ["Category 1", "Category 2"]
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        search_data = {
            "categories": ["Category 3"]
        }
        response = self.client.get('/project/search', query_string=search_data)
        response_data = response.get_json()
        
        expected_status = 404
        expected_error_message = "No projects found."
        self.assertEqual(response_data["message"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['message']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        expected_output = f"expected status: {expected_status}, expected message: {expected_error_message}"
        received_output = f"received status: {response.status_code}, received message: {response_data['message']}"
        self.format_output("Project search with categories no results", expected_output, received_output)
    
    def test_projectSearch_location_noResults(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name",
            "location": "Location 1"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        search_data = {
            "location": "Location 2"
        }
        response = self.client.get('/project/search', query_string=search_data)
        response_data = response.get_json()
        
        expected_status = 404
        expected_error_message = "No projects found."
        self.assertEqual(response_data["message"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['message']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        expected_output = f"expected status: {expected_status}, expected message: {expected_error_message}"
        received_output = f"received status: {response.status_code}, received message: {response_data['message']}"
        self.format_output("Project search with location no results", expected_output, received_output)
    
    def test_projectSearch_skills_noResults(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name",
            "skills": ["Skill 1", "Skill 2"]
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        search_data = {
            "skills": ["Skill 3"]
        }
        response = self.client.get('/project/search', query_string=search_data)
        response_data = response.get_json()
        
        expected_status = 404
        expected_error_message = "No projects found."
        self.assertEqual(response_data["message"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['message']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        expected_output = f"expected status: {expected_status}, expected message: {expected_error_message}"
        received_output = f"received status: {response.status_code}, received message: {response_data['message']}"
        self.format_output("Project search with skills no results", expected_output, received_output)
    
    # ------------------------------------------------------------------------------------------------

    '''professionalRateProject''' 
    
    def test_professionalRateProject_invalid_professionalId(self):
        # Step 1: Create a project for company_1
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        request_data = {
            "userId": 99999,
            "projectId": project_id,
            "projectRating": 5,
            "projectReview": "Great project!"
        }
        response = self.client.post('/project/professional/rateProject', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json() 
        
        expected_status = 409
        expected_error_message = "Professional User does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project professional rate with invalid professionalId", expected_error_message, response_data["error"])
        
    def test_professionalRateProject_invalid_projectId(self):
        request_data = {
            "userId": self.professional_1_id,
            "projectId": 123,
            "projectRating": 5,
            "projectReview": "Great project!"
        }
        response = self.client.post('/project/professional/rateProject', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json() 
        
        expected_status = 409
        expected_error_message = "Project does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project professional rate with invalid projectId", expected_error_message, response_data["error"])
        
    def test_professionalRateProject_professionalNotInProject(self):
        # Step 1: Create a project for company_1
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        request_data = {
            "userId": self.professional_2_id,
            "projectId": project_id,
            "projectRating": 5,
            "projectReview": "Great project!"
        }
        response = self.client.post('/project/professional/rateProject', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json() 
        
        expected_status = 409
        expected_error_message = "Professional User is not in this project"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project professional rate with professional not in project", expected_error_message, response_data["error"])
        
    def test_professionalRateProject_projectNotComplete(self):
        # Step 1: Create a project for company_1
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        self.assertEqual(project_id, Projects.query.filter_by(projectId=project_id).first().projectId)
        self.assertEqual("Active", Projects.query.filter_by(projectId=project_id).first().projectStatus)
        
        # Step 2: Apply and approve professional
        self.client.post('/project/professional/apply', data=json.dumps({"professionalId": self.professional_1_id, "projectId": project_id}), content_type='application/json')
        self.client.post('/project/company/approve', data=json.dumps({"professionalIds": [self.professional_1_id], "projectId": project_id}), content_type='application/json')

        request_data = {
            "userId": self.professional_1_id,
            "projectId": project_id,
            "projectRating": 5,
            "projectReview": "Great project!"
        }
        response = self.client.post('/project/professional/rateProject', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json() 
        
        expected_status = 409
        expected_error_message = "Project is not yet complete"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Project professional rate with project not complete", expected_error_message, response_data["error"])
    
    def testsuccess_professionalRateProject(self):
        # Step 1: Create a project for company_1
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        self.assertEqual(project_id, Projects.query.filter_by(projectId=project_id).first().projectId)
        self.assertEqual("Active", Projects.query.filter_by(projectId=project_id).first().projectStatus)
        
        # Step 2: Apply and approve professional
        self.client.post('/project/professional/apply', data=json.dumps({"professionalId": self.professional_1_id, "projectId": project_id}), content_type='application/json')
        self.client.post('/project/company/approve', data=json.dumps({"professionalIds": [self.professional_1_id], "projectId": project_id}), content_type='application/json')
        self.client.post('/project/professional/apply', data=json.dumps({"professionalId": self.professional_2_id, "projectId": project_id}), content_type='application/json')
        self.client.post('/project/company/approve', data=json.dumps({"professionalIds": [self.professional_2_id], "projectId": project_id}), content_type='application/json')
        self.assertEqual(self.professional_1_id, Projects.query.filter_by(projectId=project_id).first().listOfProfessionals[0]["professionalId"])
        self.assertEqual(self.professional_2_id, Projects.query.filter_by(projectId=project_id).first().listOfProfessionals[1]["professionalId"])
        
        # Step 3: Complete project
        self.client.put('/project/company/complete', data=json.dumps({"projectId": project_id}), content_type='application/json')
        self.assertEqual("Complete", Projects.query.filter_by(projectId=project_id).first().projectStatus)
        
        # Step 4: Rate project
        request_data = {
            "userId": self.professional_1_id,
            "projectId": project_id,
            "projectRating": 5,
            "projectReview": "Great project!"
        }
        
        request_data_2 = {
            "userId": self.professional_2_id,
            "projectId": project_id,
            "projectRating": 1,
            "projectReview": "Bad project!"
        }   
        response_1 = self.client.post('/project/professional/rateProject', data=json.dumps(request_data), content_type='application/json')
        response_2 = self.client.post('/project/professional/rateProject', data=json.dumps(request_data_2), content_type='application/json')
        response_data_1 = response_1.get_json() 
        response_data_2 = response_2.get_json() 
        
        expected_status = 200
        expected_rating_1 = 5
        expected_rating_2 = 1
        
        received_rating_1 = Projects.query.filter_by(projectId=project_id).first().listOfProjectRatings[0]['projectRating']
        received_rating_2 = Projects.query.filter_by(projectId=project_id).first().listOfProjectRatings[1]['projectRating']
        
        self.assertEqual(expected_rating_1, received_rating_1,
                        f"Expected rating: {expected_rating_1}, Received: {received_rating_1}")
        self.assertEqual(expected_rating_2, received_rating_2,
                        f"Expected rating: {expected_rating_2}, Received: {received_rating_2}")
        self.assertEqual(response_1.status_code, expected_status, f"Expected: {expected_status}, Received: {response_1.status_code}")
        self.assertEqual(response_2.status_code, expected_status, f"Expected: {expected_status}, Received: {response_2.status_code}")
        
        expected_output = f"expectedrating1:{str(expected_rating_1)} expectedrating2:{str(expected_rating_2)}"
        received_output = f"receivedrating1:{str(received_rating_1)} receivedrating2:{str(received_rating_2)}"
        self.format_output("Project professional rate success", expected_output, received_output)

    '''companyRateProfessional'''
        
    def test_companyRateProfessional_invalid_professionalId(self):
        request_data = {
            "userId": 99999,
            "projectId": 123,
            "professionalRating": 5,
            "professionalReview": "Great project!"
        }
        response = self.client.post('/project/company/rateProfessional', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Professional User does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Company rate professional with invalid professionalId", expected_error_message, response_data["error"])

    def test_companyRateProfessional_invalid_projectId(self):
        request_data = {
            "userId": self.professional_1_id,
            "projectId": 123,
            "professionalRating": 5,
            "professionalReview": "Great project!"
        }  
        response = self.client.post('/project/company/rateProfessional', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 409
        expected_error_message = "Project does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Company rate professional with invalid projectId", expected_error_message, response_data["error"])

    def test_companyRateProfessional_professionalNotInProject(self):
        # Step 1: Create a project for company_1
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        request_data = {
            "userId": self.professional_2_id,
            "projectId": project_id,
            "professionalRating": 5,
            "professionalReview": "Great professional!"
        }
        response = self.client.post('/project/company/rateProfessional', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json() 
        
        expected_status = 409
        expected_error_message = "Professional User is not in this project"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Company rate professional with professional not in project", expected_error_message, response_data["error"])
        
    def test_companyRateProfessional_projectNotComplete(self):
        # Step 1: Create a project for company_1
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        self.assertEqual(project_id, Projects.query.filter_by(projectId=project_id).first().projectId)
        self.assertEqual("Active", Projects.query.filter_by(projectId=project_id).first().projectStatus)
        
        # Step 2: Apply and approve professional
        self.client.post('/project/professional/apply', data=json.dumps({"professionalId": self.professional_1_id, "projectId": project_id}), content_type='application/json')
        self.client.post('/project/company/approve', data=json.dumps({"professionalIds": [self.professional_1_id], "projectId": project_id}), content_type='application/json')

        request_data = {
            "userId": self.professional_1_id,
            "projectId": project_id,
            "professionalRating": 5,
            "professionalReview": "Great professional!"
        }
        response = self.client.post('/project/company/rateProfessional', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json() 
        
        expected_status = 409
        expected_error_message = "Project is not yet complete"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Company rate professional with project not complete", expected_error_message, response_data["error"])
        
    def testsuccess_companyRateProfessional(self):
        # Step 1: Create a project for company_1
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        self.assertEqual(project_id, Projects.query.filter_by(projectId=project_id).first().projectId)
        self.assertEqual("Active", Projects.query.filter_by(projectId=project_id).first().projectStatus)
        
        # Step 2: Apply and approve professional
        self.client.post('/project/professional/apply', data=json.dumps({"professionalId": self.professional_1_id, "projectId": project_id}), content_type='application/json')
        self.client.post('/project/company/approve', data=json.dumps({"professionalIds": [self.professional_1_id], "projectId": project_id}), content_type='application/json')
        self.client.post('/project/professional/apply', data=json.dumps({"professionalId": self.professional_2_id, "projectId": project_id}), content_type='application/json')
        self.client.post('/project/company/approve', data=json.dumps({"professionalIds": [self.professional_2_id], "projectId": project_id}), content_type='application/json')
        self.assertEqual(self.professional_1_id, Projects.query.filter_by(projectId=project_id).first().listOfProfessionals[0]["professionalId"])
        self.assertEqual(self.professional_2_id, Projects.query.filter_by(projectId=project_id).first().listOfProfessionals[1]["professionalId"])
        
        # Step 3: Complete project
        self.client.put('/project/company/complete', data=json.dumps({"projectId": project_id}), content_type='application/json')
        self.assertEqual("Complete", Projects.query.filter_by(projectId=project_id).first().projectStatus)
        
        # Step 4: Rate project
        request_data = {
            "userId": self.professional_1_id,
            "projectId": project_id,
            "professionalRating": 5,
            "professionalReview": "Great professional!"
        }
        
        request_data_2 = {
            "userId": self.professional_2_id,
            "projectId": project_id,
            "professionalRating": 1,
            "professionalReview": "Bad professional!"
        }   
        response_1 = self.client.post('/project/company/rateProfessional', data=json.dumps(request_data), content_type='application/json')
        response_2 = self.client.post('/project/company/rateProfessional', data=json.dumps(request_data_2), content_type='application/json')
        response_data_1 = response_1.get_json() 
        response_data_2 = response_2.get_json() 
        
        expected_status = 200
        expected_rating_1 = 5
        expected_rating_2 = 1
        received_rating_1 = Professional.query.filter_by(professionalId=self.professional_1_id).first().listOfProfessionalRatings[0]['professionalRating']
        received_rating_2 = Professional.query.filter_by(professionalId=self.professional_2_id).first().listOfProfessionalRatings[0]['professionalRating']
        
        self.assertEqual(expected_rating_1,received_rating_1,
                        f"Expected rating: {expected_rating_1}, Received: {received_rating_1}")
        self.assertEqual(expected_rating_2,received_rating_2,
                        f"Expected rating: {expected_rating_2}, Received: {received_rating_2}")
        self.assertEqual(response_1.status_code, expected_status, f"Expected: {expected_status}, Received: {response_1.status_code}")
        self.assertEqual(response_2.status_code, expected_status, f"Expected: {expected_status}, Received: {response_2.status_code}")
        
        expected_output = f"expectedrating1:{str(expected_rating_1)} expectedrating2:{str(expected_rating_2)}"
        received_output = f"receivedrating1:{str(received_rating_1)} receivedrating2:{str(received_rating_2)}"
        self.format_output("Company rate professional success", expected_output, received_output)
        
    '''professionalAchievement'''
    
    def test_professionalAchievement_invalid_professionalId(self):
        response = self.client.get('/user/details/professional/achievement', query_string={'id': 99999})
        response_data = response.get_json()
        expected_status = 409
        expected_error_message = "Professional User does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Professional achievement with invalid professionalId", expected_error_message, response_data["error"])
        
    def test_professionalAchievement_noRatings(self):
        response = self.client.get('/user/details/professional/achievement', query_string={'id': self.professional_1_id})
        response_data = response.get_json()
        expected_status = 200
        expected_avg_rating = 'null'
        self.assertEqual(response_data["avg_rating"], expected_avg_rating, f"Expected avg_rating: {expected_avg_rating}, Received: {response_data['avg_rating']}")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Professional achievement with no ratings", expected_avg_rating, response_data["avg_rating"])
        
    def testsuccess_professionalAchievement(self):
        # Step 1: Create a project for company_1
        self.assertEqual(len(Professional.query.filter_by(professionalId=self.professional_1_id).first().listOfProfessionalRatings), 0)
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        project_data_2 = {
            "companyId": self.company_2_id, 
            "projectName": "Original Project Name 2"
        }
        project_data_3 = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name 3"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        response_create_2 = self.client.post('/project/create', data=json.dumps(project_data_2), content_type='application/json')
        response_create_3 = self.client.post('/project/create', data=json.dumps(project_data_3), content_type='application/json')
        project_id_1 = response_create.get_json()["projectId"]
        project_id_2 = response_create_2.get_json()["projectId"]
        project_id_3 = response_create_3.get_json()["projectId"]
        self.assertEqual(project_id_1, Projects.query.filter_by(projectId=project_id_1).first().projectId)
        self.assertEqual(project_id_2, Projects.query.filter_by(projectId=project_id_2).first().projectId)
        self.assertEqual(project_id_3, Projects.query.filter_by(projectId=project_id_3).first().projectId)
        self.assertEqual("Active", Projects.query.filter_by(projectId=project_id_1).first().projectStatus)
        self.assertEqual("Active", Projects.query.filter_by(projectId=project_id_2).first().projectStatus)
        self.assertEqual("Active", Projects.query.filter_by(projectId=project_id_3).first().projectStatus)
        
        apply_data_1 = {
            "professionalId": self.professional_1_id,
            "projectId": project_id_1
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_1), content_type='application/json')
        
        apply_data_2 = {
            "professionalId": self.professional_1_id,
            "projectId": project_id_2
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_2), content_type='application/json')
        
        apply_data_3 = {
            "professionalId": self.professional_1_id,
            "projectId": project_id_3
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_3), content_type='application/json')
        
        approve_data_1 = {
            "professionalIds": [self.professional_1_id],
            "projectId": project_id_1
        }
        self.client.post('/project/company/approve', data=json.dumps(approve_data_1), content_type='application/json')
                
        approve_data_2 = {
            "professionalIds": [self.professional_1_id],
            "projectId": project_id_2
        }
        self.client.post('/project/company/approve', data=json.dumps(approve_data_2), content_type='application/json')
        
        approve_data_3 = {
            "professionalIds": [self.professional_1_id],
            "projectId": project_id_3
        }
        self.client.post('/project/company/approve', data=json.dumps(approve_data_3), content_type='application/json')
        
        # Step 3: Complete project
        self.client.put('/project/company/complete', data=json.dumps({"projectId": project_id_1}), content_type='application/json')
        self.client.put('/project/company/complete', data=json.dumps({"projectId": project_id_2}), content_type='application/json')
        self.client.put('/project/company/complete', data=json.dumps({"projectId": project_id_3}), content_type='application/json')
        self.assertEqual("Complete", Projects.query.filter_by(projectId=project_id_1).first().projectStatus)
        self.assertEqual("Complete", Projects.query.filter_by(projectId=project_id_2).first().projectStatus)
        self.assertEqual("Complete", Projects.query.filter_by(projectId=project_id_3).first().projectStatus)
                
        # Step 4: Rate project
        rate_data_1 = {
            "userId": self.professional_1_id,
            "projectId": project_id_1,
            "professionalRating": 5,
            "professionalReview": "Great professional!"
        }
        self.client.post('/project/company/rateProfessional', data=json.dumps(rate_data_1), content_type='application/json')
        
        rate_data_2 = {
            "userId": self.professional_1_id,
            "projectId": project_id_2,
            "professionalRating": 1,
            "professionalReview": "Bad professional!"
        }
        self.client.post('/project/company/rateProfessional', data=json.dumps(rate_data_2), content_type='application/json')
        
        rate_data_3 = {
            "userId": self.professional_1_id,
            "projectId": project_id_3,
            "professionalRating": 3,
            "professionalReview": "Average professional!"
        }
        self.client.post('/project/company/rateProfessional', data=json.dumps(rate_data_3), content_type='application/json')
        
        # Step 5: Check average rating
        achievement_response = self.client.get('/user/details/professional/achievement', query_string={'id': self.professional_1_id})
        achievement_response_data = achievement_response.get_json()
        
        expected_status = 200
        expected_rating_1 = 5
        expected_rating_2 = 1
        expected_rating_3 = 3
        rating_1 = [project['professionalRating'] for project in Professional.query.filter_by(professionalId=self.professional_1_id).first()
                    .listOfProfessionalRatings if project['professionalRatingProjectId'] == project_id_1][0]
        rating_2 = [project['professionalRating'] for project in Professional.query.filter_by(professionalId=self.professional_1_id).first()
                    .listOfProfessionalRatings if project['professionalRatingProjectId'] == project_id_2][0]
        rating_3 = [project['professionalRating'] for project in Professional.query.filter_by(professionalId=self.professional_1_id).first()
                    .listOfProfessionalRatings if project['professionalRatingProjectId'] == project_id_3][0]
        
        self.assertEqual(expected_rating_1, rating_1)
        self.assertEqual(expected_rating_2, rating_2)
        self.assertEqual(expected_rating_3, rating_3)
        
        # Step 5: Check achievement
        expected_avg_rating = 3.0
        received_avg_rating = achievement_response_data[0]["avg_rating"]
        
        self.assertEqual(received_avg_rating, expected_avg_rating, f"Expected avg_rating: {expected_avg_rating}, Received: {received_avg_rating}")
        self.assertEqual(achievement_response.status_code, expected_status, f"Expected: {expected_status}, Received: {achievement_response.status_code}")
        
        expected_output = f"expected_avg_rating:{str(expected_avg_rating)}"
        received_output = f"received_avg_rating:{str(received_avg_rating)}"
        self.format_output("Professional achievement success", expected_output, received_output)

# ------------------------------------------------------------------------------------------------

    '''certificate'''
    
    def test_giveCertificate_invalid_projectId(self):
        certificate_data = {
            "projectId": 99999,
            "professionalCertificate": "Certificate"
        }
        response = self.client.post('/giveCertificate', data=json.dumps(certificate_data), content_type='application/json')
        response_data = response.get_json()
        expected_status = 400
        expected_error_message = "Project does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Give certificate with invalid projectId", expected_error_message, response_data["error"])
        
    def testsuccess_giveCertificate(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        apply_data_1 = {
            "professionalId": self.professional_1_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_1), content_type='application/json')
        
        apply_data_2 = {
            "professionalId": self.professional_2_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_2), content_type='application/json')
        
        approve_data = {
            "professionalIds": [self.professional_1_id, self.professional_2_id],
            "projectId": project_id
        }
        self.client.post('/project/company/approve', data=json.dumps(approve_data), content_type='application/json')
        
        self.client.put('/project/company/complete', data=json.dumps({"projectId": project_id}), content_type='application/json')
        
        self.assertEqual("Complete", Projects.query.filter_by(projectId=project_id).first().projectStatus)
        
        certificate_data = {
            "projectId": project_id,
            "professionalCertificate": "Certificate"
        }
        response = self.client.post('/giveCertificate', data=json.dumps(certificate_data), content_type='application/json')
        response_data = response.get_json()
        
        expected_status = 200
        expected_message = "Certificate given successfully"
        self.assertEqual(response_data["success"], expected_message, f"Expected message: '{expected_message}', Received: '{response_data['success']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("Give certificate success", expected_message, response_data["success"])
        
    def test_viewCertificate_invalid_professionalId(self):
        response = self.client.get('/profile/viewCertificate', query_string={'id': 99999})
        response_data = response.get_json()
        expected_status = 400
        expected_error_message = "Professional does not exist"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("View certificate with invalid professionalId", expected_error_message, response_data["error"])
    
    def test_viewCertificate_projectNotCompleted(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        apply_data_1 = {
            "professionalId": self.professional_1_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_1), content_type='application/json')
        
        apply_data_2 = {
            "professionalId": self.professional_2_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_2), content_type='application/json')
        
        approve_data = {
            "professionalIds": [self.professional_1_id, self.professional_2_id],
            "projectId": project_id
        }
        self.client.post('/project/company/approve', data=json.dumps(approve_data), content_type='application/json')
        
        certificate_data = {
            "projectId": project_id,
            "professionalCertificate": "Certificate"
        }
        response = self.client.post('/giveCertificate', data=json.dumps(certificate_data), content_type='application/json')
        response_data = response.get_json()
        expected_status = 400
        expected_error_message = "Project is not completed"
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.format_output("View certificate with project not completed", expected_error_message, response_data["error"])
    
    def testsuccess_viewCertificate(self):
        project_data = {
            "companyId": self.company_1_id, 
            "projectName": "Original Project Name"
        }
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]
        
        apply_data_1 = {
            "professionalId": self.professional_1_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_1), content_type='application/json')
        
        apply_data_2 = {
            "professionalId": self.professional_2_id,
            "projectId": project_id
        }
        self.client.post('/project/professional/apply', data=json.dumps(apply_data_2), content_type='application/json')
        
        approve_data = {
            "professionalIds": [self.professional_1_id, self.professional_2_id],
            "projectId": project_id
        }
        self.client.post('/project/company/approve', data=json.dumps(approve_data), content_type='application/json')
        
        self.client.put('/project/company/complete', data=json.dumps({"projectId": project_id}), content_type='application/json')
        
        certificate_data = {
            "projectId": project_id,
            "professionalCertificate": "Certificate"
        }
        self.client.post('/giveCertificate', data=json.dumps(certificate_data), content_type='application/json')

        response = self.client.get('/profile/viewCertificate', query_string={'id': self.professional_1_id})
        response_data = response.get_json()
        expected_status = 200
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        
        expected_output = f"expected status: {expected_status}"
        received_output = f"received status: {response.status_code}"
        self.format_output("View certificate success", expected_output, received_output)    




if __name__ == "__main__":
    # Run tests with increased verbosity and custom result class
    runner = unittest.TextTestRunner(resultclass=CustomTestResult, verbosity=2)
    result = runner.run(unittest.defaultTestLoader.loadTestsFromTestCase(ProjectCreateTests))
    # Print summary after all tests
    result.print_summary()