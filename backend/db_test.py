import unittest
from app import create_app
from extensions import db
from database.models import Company, Professional, Projects, Skills, Categories
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
        
    def test_company_1_creates_project(self):
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

    def test_company_2_creates_project(self):
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

    def test_invalid_company_creates_project(self):
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
        
    def test_project_list_success(self):
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
        request_data = {
            "companyId": self.company_1_id
        }
        
        response = self.client.get(f'/project/list', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json()

        # Ensure response_data is a list
        self.assertIsInstance(response_data, list, f"Expected list, got {type(response_data)}")

        # Expected to return two projects
        expected_status = 200
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(len(response_data), 2, f"Expected 2 projects, Received: {len(response_data)}")

        # Formatted output
        expected_output = "Status Code: 200, Projects Count: 2"
        received_output = f"Status Code: {response.status_code}, Projects Count: {len(response_data)}"
        self.format_output("List projects for company with existing projects", expected_output, received_output)


    def test_project_list_no_projects(self):
        # Request to list all projects for company_2 (assuming it has no projects created)
        request_data = {
            "companyId": self.company_2_id
        }
        
        response = self.client.get(f'/project/list', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json()
        print(response_data)

        expected_status = 205
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")


        # Check that response_data is an empty list
        self.assertIsInstance(response_data, dict, f"Expected a dict, got {type(response_data)}")

        # Formatted output
        expected_output = "Status Code: 205, Projects Count: 0"
        received_output = f"Status Code: {response.status_code}, Projects Count: {len(response_data)}"
        self.format_output("List projects for company with no projects", expected_output, received_output)





    def test_project_list_invalid_company(self):
        # Request to list projects for a non-existent company ID
        response = self.client.get('/project/list', data=json.dumps({"companyId": 99999}), content_type='application/json')
        response_data = response.get_json()

        # Expected error response for non-existent company
        expected_status = 409
        expected_error_message = "Company does not exist"
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertIn("error", response_data, f"Expected key 'error' in response data. Received: {response_data}")
        self.assertEqual(response_data["error"], expected_error_message, f"Expected error message: '{expected_error_message}', Received: '{response_data['error']}'")

        # Formatted output
        expected_output = f"Status Code: {expected_status}, Error Message: '{expected_error_message}'"
        received_output = f"Status Code: {response.status_code}, Response Data: {response_data}"
        self.format_output("List projects for non-existent company", expected_output, received_output)


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
        

    def test_project_details_project1(self):
        # Create project 1 for company 1
        project_data_1 = {"companyId": self.company_1_id, "projectName": "Project 1 by Company 1"}
        response_create = self.client.post('/project/create', data=json.dumps(project_data_1), content_type='application/json')
        project_1_id = response_create.get_json()["projectId"]

        # Request details for project 1
        request_data = {"projectId": project_1_id}
        response = self.client.get('/project/details', data=json.dumps(request_data), content_type='application/json')
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


    def test_project_details_project2(self):
        # Create project 2 for company 1
        project_data_2 = {"companyId": self.company_1_id, "projectName": "Project 2 by Company 1"}
        response_create = self.client.post('/project/create', data=json.dumps(project_data_2), content_type='application/json')
        project_2_id = response_create.get_json()["projectId"]

        # Request details for project 2
        request_data = {"projectId": project_2_id}
        response = self.client.get('/project/details', data=json.dumps(request_data), content_type='application/json')
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


    def test_project_details_invalid_projectId(self):
        # Request details for an invalid project ID
        request_data = {"projectId": 99999}  # Assuming this ID does not exist
        response = self.client.get('/project/details', data=json.dumps(request_data), content_type='application/json')
        response_data = response.get_json()

        # Expected response
        expected_status = 409
        self.assertEqual(response.status_code, expected_status, f"Expected: {expected_status}, Received: {response.status_code}")
        self.assertEqual(response_data["error"], "Project does not exist", "Error message does not match")

        # Formatted output
        expected_output = "Status Code: 409, Error: Project does not exist"
        received_output = f"Status Code: {response.status_code}, Error: {response_data['error']}"
        self.format_output("Project details for invalid project ID", expected_output, received_output)

    def test_project_list_after_edit(self):
        # Step 1: Create a project for company_1
        project_data = {"companyId": self.company_1_id, "projectName": "Original Project Name"}
        response_create = self.client.post('/project/create', data=json.dumps(project_data), content_type='application/json')
        project_id = response_create.get_json()["projectId"]

        # Step 2: Edit the project
        edit_data = {"projectId": project_id, "projectName": "Updated Project Name"}
        response_edit = self.client.put('/edit/project', data=json.dumps(edit_data), content_type='application/json')
        
        # Verify that the edit was successful
        self.assertEqual(response_edit.status_code, 200, f"Expected: 200, Received: {response_edit.status_code}")

        # Step 3: List the project with /project/list (using companyId)
        request_data = {"companyId": self.company_1_id}
        response_list = self.client.get('/project/list', data=json.dumps(request_data), content_type='application/json')
        response_data_list = response_list.get_json()

        # Verify that the updated project is listed with the new name
        self.assertEqual(response_list.status_code, 200, f"Expected: 200, Received: {response_list.status_code}")
        self.assertTrue(any(project["projectId"] == project_id and project["projectName"] == "Updated Project Name" for project in response_data_list),
                        "Updated project not found in list.")

        # Formatted output
        expected_output = "Status Code: 200, Project Name: Updated Project Name"
        received_output = f"Status Code: {response_list.status_code}, Project Name: {response_data_list[0]['projectName']}"
        self.format_output("List project after editing with /project/list", expected_output, received_output)


    def test_project_list_all_after_edit(self):
        # Step 1: Create a project for company_1
        project_data = {"companyId": self.company_1_id, "projectName": "Original Project Name"}
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


    def test_project_details_after_edit(self):
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
        request_data = {"projectId": project_id}
        response_details = self.client.get('/project/details', data=json.dumps(request_data), content_type='application/json')
        response_data_details = response_details.get_json()

        # Verify that the project details reflect the edited name
        self.assertEqual(response_details.status_code, 200, f"Expected: 200, Received: {response_details.status_code}")
        self.assertEqual(response_data_details["projectName"], "Updated Project Name", "Project Name does not match the updated name.")

        # Formatted output
        expected_output = "Status Code: 200, Project Name: Updated Project Name"
        received_output = f"Status Code: {response_details.status_code}, Project Name: {response_data_details['projectName']}"
        self.format_output("Project details after editing with /project/details", expected_output, received_output)




if __name__ == "__main__":
    # Run tests with increased verbosity and custom result class
    runner = unittest.TextTestRunner(resultclass=CustomTestResult, verbosity=2)
    result = runner.run(unittest.defaultTestLoader.loadTestsFromTestCase(ProjectCreateTests))
    # Print summary after all tests
    result.print_summary()