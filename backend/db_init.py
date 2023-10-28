from app import create_app
from extensions import db
from database.models import Company, Professional, Projects, Skills, Categories  # Import your models

# Initialize your default data
DEFAULT_SKILLS = ["Coding", "Project Management", "Data Analysis", "Design", "Marketing"]
DEFAULT_CATEGORIES = ["Software", "Finance", "Healthcare", "Education", "Construction"]

# Sample data for other tables
DEFAULT_COMPANIES = [
    {"companyName": "Tech Corp", "companyEmail": "contact@techcorp.com", "companyPhoneNumber": "123-456-7890"},
    {"companyName": "Health Solutions", "companyEmail": "info@healthsolutions.com", "companyPhoneNumber": "098-765-4321"}
]

DEFAULT_PROFESSIONALS = [
    {"professionalFullName": "John Doe", "professionalEmail": "john@example.com", "professionalSkills": ["Coding", "Design"]},
    {"professionalFullName": "Jane Smith", "professionalEmail": "jane@example.com", "professionalSkills": ["Data Analysis", "Marketing"]}
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
        for company_data in DEFAULT_COMPANIES:
            if Company.query.filter_by(companyEmail=company_data["companyEmail"]).first() is None:
                company = Company(**company_data)
                db.session.add(company)

        # Initialize professionals
        for professional_data in DEFAULT_PROFESSIONALS:
            if Professional.query.filter_by(professionalEmail=professional_data["professionalEmail"]).first() is None:
                professional = Professional(
                    professionalFullName=professional_data["professionalFullName"],
                    professionalEmail=professional_data["professionalEmail"],
                    professionalSkills=professional_data["professionalSkills"]
                )
                db.session.add(professional)

        # Commit all the initialized data
        db.session.commit()
        print("Database initialized with default values.")
    except Exception as e:
        db.session.rollback()
        print("Error initializing the database:", str(e))