from app import create_app
from extensions import db
from database.models import Company, Professional, Projects, Skills, Categories, Admin

# Initialize your default data
DEFAULT_SKILLS = ["Coding", "Project Management", "Data Analysis", "Design", "Marketing"]
DEFAULT_CATEGORIES = ["Software", "Finance", "Healthcare", "Education", "Construction"]

# Sample data for other tables
DEFAULT_ADMINS = [
    {"adminEmail": "admin", "adminPassword": "Password"}
]

DEFAULT_COMPANIES = [
    {"companyName": "Microsoft", "companyEmail": "contact@techcorp.com", "companyPassword": "Password","companyPhoneNumber": "123-456-7890", "companyWebsite": "microsoft.com", "companyDescription": "Macro Hard. New project seeking to revolutionise the new generation!"},
    {"companyName": "Apple", "companyEmail": "info@healthsolutions.com", "companyPassword": "Password","companyPhoneNumber": "098-765-4321", "companyWebsite": "apple.com", "companyDescription": "Apples? One of them a day definitely will keep the doctor away."}
]

DEFAULT_PROFESSIONALS = [
    {"professionalFullName": "Ce Min Pangastur", "professionalWebsite": "www.min.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Min", "professionalPhoneNumber": "0412345678", "professionalEmail": "min@example.com", "professionalPassword":"Password","professionalSkills": ["Coding", "Design", "Data Analysis", "Marketing"]},
    {"professionalFullName": "Edison Chang", "professionalWebsite": "www.edison.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Edison", "professionalPhoneNumber": "0412345679", "professionalEmail": "edison@example.com", "professionalPassword":"Password","professionalSkills": ["Procrastinating"]},
    {"professionalFullName": "Jerry Li", "professionalWebsite": "www.jerry.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Jerry", "professionalPhoneNumber": "0412345670", "professionalEmail": "jerry@example.com", "professionalPassword":"Password","professionalSkills": ["Coding", "Design"]},
    {"professionalFullName": "Millie Hai", "professionalWebsite": "www.millie.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Millie", "professionalPhoneNumber": "0412345671", "professionalEmail": "millie@example.com", "professionalPassword":"Password","professionalSkills": ["Greetings", "Marketing"]},
    {"professionalFullName": "Blair Zheng", "professionalWebsite": "www.blair.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Blair", "professionalPhoneNumber": "0412345672", "professionalEmail": "blair@example.com", "professionalPassword":"Password","professionalSkills": ["Coding", "Design", "Database", "TFT"]},
    {"professionalFullName": "Andrew Lin", "professionalWebsite": "www.andrew.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Andrew", "professionalPhoneNumber": "0412345673", "professionalEmail": "andrew@example.com", "professionalPassword":"Password","professionalSkills": ["Data Analysis", "Marketing", "Pasta sauce"]}
]

# Sample projects to be created under a specific company
DEFAULT_PROJECTS = [
    {
        "projectName": "AI Research Project",
        "projectDescription": "Cutting edge new AI research project. Better than ChatGPT, could probably beat him in a 1v1.",
        "projectObjectives":"To create a better AI than ChatGPT",
        "projectCategories":["Software"],
        "projectLocation": "North Ryde",
        "projectSkills": ["Coding"]
    },
    {
        "projectName": "Cloud Infrastructure Project",
        "projectDescription": "There's a chance for precipitation today because look at all the clouds in the sky.",
        "projectObjectives": "To create a bigger cloud than AWS",
        "projectCategories": ["Construction"],
        "projectLocation": "Sydney",
        "projectSkills": ["Networks", "Coding"]
    },
    {
        "projectName": "Cybersecurity Threat Analysis",
        "projectDescription": "Develop a system for identifying, analyzing, and mitigating cybersecurity threats.",
        "projectObjectives": "Enhance the company's cybersecurity resilience.",
        "projectCategories": ["Software", "Finance"],
        "projectLocation": "Melbourne",
        "projectSkills": ["Data Analysis", "Project Management"]
    },
    {
        "projectName": "Healthcare Management System",
        "projectDescription": "A healthcare platform to streamline patient management and communication.",
        "projectObjectives": "Build a scalable system to support patient care.",
        "projectCategories": ["Healthcare", "Software"],
        "projectLocation": "Brisbane",
        "projectSkills": ["Coding", "Design"]
    },
    {
        "projectName": "Sustainable Construction Initiative",
        "projectDescription": "Implement eco-friendly practices in construction and material usage.",
        "projectObjectives": "Reduce carbon footprint in construction processes.",
        "projectCategories": ["Construction"],
        "projectLocation": "Perth",
        "projectSkills": ["Project Management", "Design"]
    },
    {
        "projectName": "Educational App for Remote Learning",
        "projectDescription": "An interactive learning platform tailored for remote students.",
        "projectObjectives": "Improve accessibility and engagement in remote education.",
        "projectCategories": ["Education", "Software"],
        "projectLocation": "Adelaide",
        "projectSkills": ["Coding", "Design", "Data Analysis"]
    }
]

MORE_PROJECTS = [
    {
        "projectName": "Smart Agriculture Initiative",
        "projectDescription": "A project focused on leveraging IoT for real-time monitoring of agricultural activities.",
        "projectObjectives": "Increase crop yield and sustainability through precision farming technologies.",
        "projectCategories": ["Agriculture", "Technology"],
        "projectLocation": "Orange",
        "projectSkills": ["Data Analysis", "Project Management", "IoT"]
    },
    {
        "projectName": "Financial Literacy Platform",
        "projectDescription": "Develop a platform to provide financial literacy courses and tools for young adults.",
        "projectObjectives": "Promote financial independence and informed decision-making among youth.",
        "projectCategories": ["Finance", "Education"],
        "projectLocation": "Canberra",
        "projectSkills": ["Coding", "Content Creation", "Data Analysis"]
    },
    {
        "projectName": "Renewable Energy Mapping",
        "projectDescription": "An initiative to create a digital map of renewable energy resources across Australia.",
        "projectObjectives": "Help businesses and individuals identify local renewable energy opportunities.",
        "projectCategories": ["Energy", "Environment"],
        "projectLocation": "Hobart",
        "projectSkills": ["Design", "Data Visualization", "Mapping"]
    }
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

        # Initialize admins
        admin_instances = {}
        for admin_data in DEFAULT_ADMINS:
            existing_admin = Admin.query.filter_by(adminEmail=admin_data["adminEmail"]).first()
            if existing_admin is None:
                admin = Admin(**admin_data)
                admin.set_admin_password(admin_data["adminPassword"])
                db.session.add(admin)
                db.session.flush()
                admin_instances[admin.adminEmail] = admin
            else:
                admin_instances[admin_data["adminEmail"]] = existing_admin


        # Initialize companies
        company_instances = {}
        for company_data in DEFAULT_COMPANIES:
            existing_company = Company.query.filter_by(companyEmail=company_data["companyEmail"]).first()
            if existing_company is None:
                company = Company(**company_data)
                company.set_company_password(company_data["companyPassword"])
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
                    professionalPassword=professional_data["professionalPassword"],
                    professionalSkills=professional_data["professionalSkills"],
                    professionalWebsite=professional_data["professionalWebsite"],
                    professionalDescription=professional_data["professionalDescription"],
                    professionalQualifications=professional_data["professionalQualifications"],
                    professionalPhoneNumber=professional_data["professionalPhoneNumber"]
                )
                professional.set_professional_password(professional_data["professionalPassword"])
                db.session.add(professional)

        # Initialize projects under a specific company (e.g., Microsoft)
        microsoft_company = company_instances.get("contact@techcorp.com")  # Change email if needed
        if microsoft_company:
            for project_data in DEFAULT_PROJECTS:
                if not Projects.query.filter_by(projectName=project_data["projectName"], pCompanyId=microsoft_company.companyId).first():
                    project = Projects()
                    project.init_project_details_for_demo(
                        companyId=microsoft_company.companyId,
                        projectName=project_data["projectName"],
                        projectDescription=project_data["projectDescription"],
                        projectObjectives=project_data["projectObjectives"],
                        projectCategories=project_data["projectCategories"],
                        projectLocation=project_data["projectLocation"],
                        projectSkills=project_data["projectSkills"]
                    )
                    db.session.add(project)

        apple_company = company_instances.get("info@healthsolutions.com")  # Change email if needed
        if apple_company:
            for project_data in MORE_PROJECTS:
                if not Projects.query.filter_by(projectName=project_data["projectName"], pCompanyId=apple_company.companyId).first():
                    project = Projects()
                    project.init_project_details_for_demo(
                        companyId=apple_company.companyId,
                        projectName=project_data["projectName"],
                        projectDescription=project_data["projectDescription"],
                        projectObjectives=project_data["projectObjectives"],
                        projectCategories=project_data["projectCategories"],
                        projectLocation=project_data["projectLocation"],
                        projectSkills=project_data["projectSkills"]
                    )
                    db.session.add(project)

        # Commit all the initialized data
        db.session.commit()
        print("Database initialized with default values, including projects for Microsoft.")
    except Exception as e:
        db.session.rollback()
        print("Error initializing the database:", str(e))
