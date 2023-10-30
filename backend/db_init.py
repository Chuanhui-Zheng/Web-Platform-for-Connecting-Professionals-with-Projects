from app import create_app
from extensions import db
from database.models import Company, Professional, Projects, Skills, Categories

# Initialize your default data
DEFAULT_SKILLS = ["Coding", "Project Management", "Data Analysis", "Design", "Marketing"]
DEFAULT_CATEGORIES = ["Software", "Finance", "Healthcare", "Education", "Construction"]

# Sample data for other tables
DEFAULT_COMPANIES = [
    {"companyName": "Microsoft", "companyEmail": "contact@techcorp.com", "companyPhoneNumber": "123-456-7890"},
    {"companyName": "Apple", "companyEmail": "info@healthsolutions.com", "companyPhoneNumber": "098-765-4321"}
]

DEFAULT_PROFESSIONALS = [
    {"professionalFullName": "Ce Min Pangastur", "professionalEmail": "min@example.com", "professionalSkills": ["Coding", "Design", "Data Analysis", "Marketing"]},
    {"professionalFullName": "Edison Chang", "professionalEmail": "edison@example.com", "professionalSkills": ["Procrastinating"]},
    {"professionalFullName": "Jerry Li", "professionalEmail": "jerry@example.com", "professionalSkills": ["Coding", "Design"]},
    {"professionalFullName": "Millie Hai", "professionalEmail": "millie@example.com", "professionalSkills": ["Greetings", "Marketing"]},
    {"professionalFullName": "Blair Zheng", "professionalEmail": "blair@example.com", "professionalSkills": ["Coding", "Design", "Database", "TFT"]},
    {"professionalFullName": "Andrew Lin", "professionalEmail": "andrew@example.com", "professionalSkills": ["Data Analysis", "Marketing", "Pasta sauce"]}
]

# Sample projects to be created under a specific company
DEFAULT_PROJECTS = [
    {"projectName": "AI Research Project"},
    {"projectName": "Cloud Infrastructure Project"}
]

app = create_app()

with app.app_context():
    try:
        # Initialize skills if the Skills table is empty
        skills_entry = Skills.query.first()
        if skills_entry is None:
            skills_entry = Skills(listOfSkills=DEFAULT_SKILLS)
            db.session.add(skills_entry)

        # Initialize categories if the Categories table is empty
        categories_entry = Categories.query.first()
        if categories_entry is None:
            categories_entry = Categories(listOfCategories=DEFAULT_CATEGORIES)
            db.session.add(categories_entry)

        # Initialize companies
        company_instances = {}
        for company_data in DEFAULT_COMPANIES:
            existing_company = Company.query.filter_by(companyEmail=company_data["companyEmail"]).first()
            if existing_company is None:
                company = Company(**company_data)
                db.session.add(company)
                db.session.flush()  # Flush to get the company ID for project creation
                company_instances[company.companyEmail] = company
            else:
                company_instances[company_data["companyEmail"]] = existing_company

        # Initialize professionals
        for professional_data in DEFAULT_PROFESSIONALS:
            if Professional.query.filter_by(professionalEmail=professional_data["professionalEmail"]).first() is None:
                professional = Professional(
                    professionalFullName=professional_data["professionalFullName"],
                    professionalEmail=professional_data["professionalEmail"],
                    professionalSkills=professional_data["professionalSkills"]
                )
                db.session.add(professional)

        # Initialize projects under a specific company (e.g., Microsoft)
        microsoft_company = company_instances.get("contact@techcorp.com")  # Change email if needed
        if microsoft_company:
            for project_data in DEFAULT_PROJECTS:
                if not Projects.query.filter_by(projectName=project_data["projectName"], pCompanyId=microsoft_company.companyId).first():
                    project = Projects()
                    project.create_project_details(
                        companyId=microsoft_company.companyId,
                        projectName=project_data["projectName"]
                    )
                    db.session.add(project)

        # Commit all the initialized data
        db.session.commit()
        print("Database initialized with default values, including projects for Microsoft.")
    except Exception as e:
        db.session.rollback()
        print("Error initializing the database:", str(e))
