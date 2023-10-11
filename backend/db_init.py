from app import create_app
from extensions import db
from database.models import Company, Professional, Projects, Skills, Categories, Admin

# Initialize your default data
DEFAULT_SKILLS = ["Coding", "Project Management", "Data Analysis", "Design", "Marketing"]
DEFAULT_CATEGORIES = ["Software", "Finance", "Healthcare", "Education", "Construction"]

# Sample data for other tables
DEFAULT_ADMINS = [
    {"adminEmail": "admin@example.com", "adminPassword": "Password123"}
]

DEFAULT_COMPANIES = [
    {"companyName": "Microsoft", "companyEmail": "microsoft@example.com", "companyPassword": "Password123", "companyPhoneNumber": "123-456-7890", "companyWebsite": "microsoft.com", "companyDescription": "Leading the charge in technology with a mission to empower every person and organization on the planet to achieve more."},
    {"companyName": "Apple", "companyEmail": "apple@example.com", "companyPassword": "Password123", "companyPhoneNumber": "098-765-4321", "companyWebsite": "apple.com", "companyDescription": "Innovating with cutting-edge technology to create products that inspire and empower."},
    {"companyName": "Mirvac", "companyEmail": "mirvac@example.com", "companyPassword": "Password123", "companyPhoneNumber": "987-654-3210", "companyWebsite": "mirvac.com", "companyDescription": "Leading urban property development and delivering sustainable and innovative communities."},
    {"companyName": "Samsung", "companyEmail": "samsung@example.com", "companyPassword": "Password123", "companyPhoneNumber": "876-543-2109", "companyWebsite": "samsung.com", "companyDescription": "Pioneering advancements in electronics and home appliances, enhancing the quality of life for people around the globe."},
    {"companyName": "Atlassian", "companyEmail": "atlassian@example.com", "companyPassword": "Password123", "companyPhoneNumber": "765-432-1098", "companyWebsite": "atlassian.com", "companyDescription": "Empowering teams to work collaboratively and efficiently with world-class software solutions."},
    {"companyName": "Bechtel", "companyEmail": "bechtel@example.com", "companyPassword": "Password123", "companyPhoneNumber": "111-222-3333", "companyWebsite": "bechtel.com", "companyDescription": "Global leader in engineering and construction, shaping a sustainable future."},
    {"companyName": "Oracle", "companyEmail": "oracle@example.com", "companyPassword": "Password123", "companyPhoneNumber": "222-333-4444", "companyWebsite": "oracle.com", "companyDescription": "Helping businesses transform with leading cloud infrastructure and software solutions."},
    {"companyName": "AECOM", "companyEmail": "aecom@example.com", "companyPassword": "Password123", "companyPhoneNumber": "333-444-5555", "companyWebsite": "aecom.com", "companyDescription": "Building a better world with integrated infrastructure and environmental services."},
    {"companyName": "Google", "companyEmail": "google@example.com", "companyPassword": "Password123", "companyPhoneNumber": "444-555-6666", "companyWebsite": "google.com", "companyDescription": "Innovating with a mission to organize the world’s information and make it universally accessible and useful."},
    {"companyName": "Tesla", "companyEmail": "tesla@example.com", "companyPassword": "Password123", "companyPhoneNumber": "555-666-7777", "companyWebsite": "tesla.com", "companyDescription": "Accelerating the world’s transition to sustainable energy with revolutionary automotive and energy solutions."},
    {"companyName": "Balfour Beatty", "companyEmail": "balfour@example.com", "companyPassword": "Password123", "companyPhoneNumber": "666-777-8888", "companyWebsite": "balfourbeatty.com", "companyDescription": "Innovative construction and infrastructure development."},
    {"companyName": "IBM", "companyEmail": "ibm@example.com", "companyPassword": "Password123", "companyPhoneNumber": "777-888-9999", "companyWebsite": "ibm.com", "companyDescription": "Transforming industries with AI and cloud computing."},
    {"companyName": "Kiewit", "companyEmail": "kiewit@example.com", "companyPassword": "Password123", "companyPhoneNumber": "888-999-0000", "companyWebsite": "kiewit.com", "companyDescription": "Building infrastructure that moves communities forward."},
    {"companyName": "Intel", "companyEmail": "intel@example.com", "companyPassword": "Password123", "companyPhoneNumber": "999-000-1111", "companyWebsite": "intel.com", "companyDescription": "Driving innovation in technology with advanced semiconductors and solutions."},
    {"companyName": "Adobe", "companyEmail": "adobe@example.com", "companyPassword": "Password123", "companyPhoneNumber": "000-111-2222", "companyWebsite": "adobe.com", "companyDescription": "Empowering creativity through digital design and media solutions."},
    {"companyName": "Jacobs", "companyEmail": "jacobs@example.com", "companyPassword": "Password123", "companyPhoneNumber": "101-202-3030", "companyWebsite": "jacobs.com", "companyDescription": "Delivering sustainable and smart infrastructure solutions."},
    {"companyName": "Amazon Web Services", "companyEmail": "aws@example.com", "companyPassword": "Password123", "companyPhoneNumber": "303-404-5050", "companyWebsite": "aws.amazon.com", "companyDescription": "Providing scalable cloud computing services for global innovation."},
    {"companyName": "Skanska", "companyEmail": "skanska@example.com", "companyPassword": "Password123", "companyPhoneNumber": "404-505-6060", "companyWebsite": "skanska.com", "companyDescription": "Constructing infrastructure that empowers communities and protects the environment."},
    {"companyName": "HP", "companyEmail": "hp@example.com", "companyPassword": "Password123", "companyPhoneNumber": "505-606-7070", "companyWebsite": "hp.com", "companyDescription": "Pioneering new ways to create, collaborate, and deliver solutions across technology."},
    {"companyName": "NVIDIA", "companyEmail": "nvidia@example.com", "companyPassword": "Password123", "companyPhoneNumber": "606-707-8080", "companyWebsite": "nvidia.com", "companyDescription": "Innovating in AI, graphics, and computing to drive technological advancements."},
    {"companyName": "HDR", "companyEmail": "hdr@example.com", "companyPassword": "Password123", "companyPhoneNumber": "707-808-9090", "companyWebsite": "hdrinc.com", "companyDescription": "Engineering solutions for a smarter, more sustainable future."},
    {"companyName": "Dell", "companyEmail": "dell@example.com", "companyPassword": "Password123", "companyPhoneNumber": "808-909-0101", "companyWebsite": "dell.com", "companyDescription": "Empowering businesses to drive progress with advanced computing solutions."},
    {"companyName": "Fluor", "companyEmail": "fluor@example.com", "companyPassword": "Password123", "companyPhoneNumber": "909-010-1212", "companyWebsite": "fluor.com", "companyDescription": "Providing engineering, procurement, and construction services worldwide."},
    {"companyName": "Salesforce", "companyEmail": "salesforce@example.com", "companyPassword": "Password123", "companyPhoneNumber": "010-121-2323", "companyWebsite": "salesforce.com", "companyDescription": "Connecting businesses and customers with powerful CRM solutions."},
    {"companyName": "Turner Construction", "companyEmail": "turner@example.com", "companyPassword": "Password123", "companyPhoneNumber": "121-232-3434", "companyWebsite": "turnerconstruction.com", "companyDescription": "Leading in construction management and innovation."},
    {"companyName": "Meta", "companyEmail": "meta@example.com", "companyPassword": "Password123", "companyPhoneNumber": "232-343-4545", "companyWebsite": "meta.com", "companyDescription": "Connecting people and building immersive experiences for the future."},
    {"companyName": "Lenovo", "companyEmail": "lenovo@example.com", "companyPassword": "Password123", "companyPhoneNumber": "343-454-5656", "companyWebsite": "lenovo.com", "companyDescription": "Developing innovative technology solutions for global markets."},
    {"companyName": "Tetra Tech", "companyEmail": "tetratech@example.com", "companyPassword": "Password123", "companyPhoneNumber": "454-565-6767", "companyWebsite": "tetratech.com", "companyDescription": "Providing sustainable engineering and consulting solutions."},
    {"companyName": "Cisco", "companyEmail": "cisco@example.com", "companyPassword": "Password123", "companyPhoneNumber": "565-676-7878", "companyWebsite": "cisco.com", "companyDescription": "Enabling secure networking and digital transformation for businesses worldwide."},
    {"companyName": "Siemens", "companyEmail": "siemens@example.com", "companyPassword": "Password123", "companyPhoneNumber": "676-787-8989", "companyWebsite": "siemens.com", "companyDescription": "Driving technology advancements in infrastructure, healthcare, and energy solutions."},
    {"companyName": "Hensel Phelps", "companyEmail": "henselphelps@example.com", "companyPassword": "Password123", "companyPhoneNumber": "787-898-9090", "companyWebsite": "henselphelps.com", "companyDescription": "Delivering large-scale construction and infrastructure projects across sectors."},
    {"companyName": "Facebook", "companyEmail": "facebook@example.com", "companyPassword": "Password123", "companyPhoneNumber": "898-909-0101", "companyWebsite": "facebook.com", "companyDescription": "Connecting people globally through innovative social networking solutions."},
    {"companyName": "JLL", "companyEmail": "jll@example.com", "companyPassword": "Password123", "companyPhoneNumber": "909-010-1111", "companyWebsite": "jll.com", "companyDescription": "Providing real estate and investment management services globally."},
    {"companyName": "Verizon", "companyEmail": "verizon@example.com", "companyPassword": "Password123", "companyPhoneNumber": "010-111-2222", "companyWebsite": "verizon.com", "companyDescription": "Delivering reliable and fast internet and telecommunications services worldwide."},
    {"companyName": "SaveTrees", "companyEmail": "savetrees@example.com", "companyPassword": "Password123", "companyPhoneNumber": "010-111-2223", "companyWebsite": "savetrees.com", "companyDescription": "Saving trees and forests in Australia, 1 by 1."},
]

DEFAULT_PROFESSIONALS = [
    {"professionalFullName": "Ce Min Pangastur", "professionalWebsite": "www.min.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Min", "professionalPhoneNumber": "0412345678", "professionalEmail": "min@example.com", "professionalPassword":"Password123","professionalSkills": ["Coding", "Design"]},
    {"professionalFullName": "Edison Chang", "professionalWebsite": "www.edison.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Edison", "professionalPhoneNumber": "0412345679", "professionalEmail": "edison@example.com", "professionalPassword":"Password123","professionalSkills": ["Other"]},
    {"professionalFullName": "Jerry Li", "professionalWebsite": "www.jerry.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Jerry", "professionalPhoneNumber": "0412345670", "professionalEmail": "jerry@example.com", "professionalPassword":"Password123","professionalSkills": ["Coding", "Design"]},
    {"professionalFullName": "Millie Hai", "professionalWebsite": "www.millie.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Millie", "professionalPhoneNumber": "0412345671", "professionalEmail": "millie@example.com", "professionalPassword":"Password123","professionalSkills": ["Other"]},
    {"professionalFullName": "Blair Zheng", "professionalWebsite": "www.blair.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Blair", "professionalPhoneNumber": "0412345672", "professionalEmail": "blair@example.com", "professionalPassword":"Password123","professionalSkills": ["Coding", "Design"]},
    {"professionalFullName": "Andrew Lin", "professionalWebsite": "www.andrew.com", "professionalQualifications": "Bachelors of Computer Science", "professionalDescription": "Hello, my name is Andrew", "professionalPhoneNumber": "0412345673", "professionalEmail": "andrew@example.com", "professionalPassword":"Password123","professionalSkills": ["Other"]},
    {"professionalFullName": "Sophia Lee", "professionalWebsite": "www.sophialee.dev", "professionalQualifications": "Masters in Software Engineering", "professionalDescription": "Experienced software engineer specializing in backend development.", "professionalPhoneNumber": "0412345674", "professionalEmail": "sophia@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "James Tan", "professionalWebsite": "www.jamestan.com", "professionalQualifications": "Bachelors of Civil Engineering", "professionalDescription": "Civil engineer with expertise in sustainable building solutions.", "professionalPhoneNumber": "0412345675", "professionalEmail": "james@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Lily Wong", "professionalWebsite": "www.lilywong.com", "professionalQualifications": "Ph.D. in Data Science", "professionalDescription": "Data scientist with extensive experience in machine learning and AI.", "professionalPhoneNumber": "0412345676", "professionalEmail": "lily@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Michael Chen", "professionalWebsite": "www.michaelchen.dev", "professionalQualifications": "Bachelors in IT Management", "professionalDescription": "IT consultant specializing in digital transformation for enterprises.", "professionalPhoneNumber": "0412345677", "professionalEmail": "michael@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Emily Zhou", "professionalWebsite": "www.emilyzhou.com", "professionalQualifications": "Masters in Cybersecurity", "professionalDescription": "Cybersecurity expert focusing on network protection and threat detection.", "professionalPhoneNumber": "0412345678", "professionalEmail": "emily@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Daniel Kim", "professionalWebsite": "www.danielkim.dev", "professionalQualifications": "Bachelors in Computer Science", "professionalDescription": "Full-stack developer passionate about building scalable applications.", "professionalPhoneNumber": "0412345679", "professionalEmail": "daniel@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Sara Wu", "professionalWebsite": "www.sarawu.com", "professionalQualifications": "Masters in Architecture", "professionalDescription": "Architect specializing in eco-friendly building design and sustainable architecture.", "professionalPhoneNumber": "0412345680", "professionalEmail": "sara@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "William Zhang", "professionalWebsite": "www.williamzhang.dev", "professionalQualifications": "Bachelors in Software Engineering", "professionalDescription": "Front-end developer with a focus on responsive and accessible web design.", "professionalPhoneNumber": "0412345681", "professionalEmail": "william@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Grace Xu", "professionalWebsite": "www.gracexu.com", "professionalQualifications": "Bachelors in Construction Management", "professionalDescription": "Construction manager with expertise in project management and safety compliance.", "professionalPhoneNumber": "0412345682", "professionalEmail": "grace@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Jason Park", "professionalWebsite": "www.jasonpark.dev", "professionalQualifications": "Bachelors in Information Systems", "professionalDescription": "System analyst with strong skills in data modeling and process optimization.", "professionalPhoneNumber": "0412345683", "professionalEmail": "jason@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Ashley Ng", "professionalWebsite": "www.ashleyng.dev", "professionalQualifications": "Masters in Machine Learning", "professionalDescription": "Machine learning engineer with experience in NLP and predictive analytics.", "professionalPhoneNumber": "0412345684", "professionalEmail": "ashley@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Victor Choi", "professionalWebsite": "www.victorchoi.com", "professionalQualifications": "Bachelors in Structural Engineering", "professionalDescription": "Structural engineer focused on designing resilient infrastructure.", "professionalPhoneNumber": "0412345685", "professionalEmail": "victor@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Mia Lu", "professionalWebsite": "www.mialu.dev", "professionalQualifications": "Bachelors in Data Science", "professionalDescription": "Data analyst with skills in data visualization and statistical modeling.", "professionalPhoneNumber": "0412345686", "professionalEmail": "mia@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Oscar Deng", "professionalWebsite": "www.oscardeng.com", "professionalQualifications": "Bachelors in Electrical Engineering", "professionalDescription": "Electrical engineer with a focus on renewable energy systems.", "professionalPhoneNumber": "0412345687", "professionalEmail": "oscar@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Isabella Wang", "professionalWebsite": "www.isabellawang.dev", "professionalQualifications": "Masters in Computer Science", "professionalDescription": "Software developer experienced in backend systems and API integration.", "professionalPhoneNumber": "0412345688", "professionalEmail": "isabella@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "David Chan", "professionalWebsite": "www.davidchan.dev", "professionalQualifications": "Bachelors in Software Engineering", "professionalDescription": "App developer specializing in Android development.", "professionalPhoneNumber": "0412345689", "professionalEmail": "david@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Natalie Sun", "professionalWebsite": "www.nataliesun.com", "professionalQualifications": "Masters in Civil Engineering", "professionalDescription": "Civil engineer with expertise in sustainable materials.", "professionalPhoneNumber": "0412345690", "professionalEmail": "natalie@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Lucas Fang", "professionalWebsite": "www.lucasfang.dev", "professionalQualifications": "Bachelors in AI and Robotics", "professionalDescription": "Robotics engineer working on autonomous systems.", "professionalPhoneNumber": "0412345691", "professionalEmail": "lucas@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Karen Liu", "professionalWebsite": "www.karenliu.dev", "professionalQualifications": "Masters in Data Science", "professionalDescription": "Data analyst with a focus on predictive modeling and trend analysis.", "professionalPhoneNumber": "0412345693", "professionalEmail": "karen@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Henry Zhang", "professionalWebsite": "www.henryzhang.com", "professionalQualifications": "Bachelors in Civil Engineering", "professionalDescription": "Construction engineer experienced in urban development projects.", "professionalPhoneNumber": "0412345694", "professionalEmail": "henry@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Diana Wu", "professionalWebsite": "www.dianawu.dev", "professionalQualifications": "Bachelors in Computer Science", "professionalDescription": "Full-stack developer specializing in e-commerce platforms.", "professionalPhoneNumber": "0412345695", "professionalEmail": "diana@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Eric Choi", "professionalWebsite": "www.ericchoi.com", "professionalQualifications": "Bachelors in Industrial Engineering", "professionalDescription": "Industrial engineer focusing on lean manufacturing processes.", "professionalPhoneNumber": "0412345696", "professionalEmail": "eric@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Vivian Chang", "professionalWebsite": "www.vivianchang.dev", "professionalQualifications": "Masters in Cybersecurity", "professionalDescription": "Cybersecurity specialist skilled in intrusion detection and data protection.", "professionalPhoneNumber": "0412345697", "professionalEmail": "vivian@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Leo Nguyen", "professionalWebsite": "www.leonguyen.com", "professionalQualifications": "Bachelors in Electrical Engineering", "professionalDescription": "Electrical engineer with expertise in circuit design and power systems.", "professionalPhoneNumber": "0412345698", "professionalEmail": "leo@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Hannah Kim", "professionalWebsite": "www.hannahkim.dev", "professionalQualifications": "Masters in Computer Science", "professionalDescription": "Software developer with a focus on cloud architecture and DevOps.", "professionalPhoneNumber": "0412345699", "professionalEmail": "hannah@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Samuel Lin", "professionalWebsite": "www.samuellin.com", "professionalQualifications": "Bachelors in Mechanical Engineering", "professionalDescription": "Mechanical engineer specializing in renewable energy systems.", "professionalPhoneNumber": "0412345700", "professionalEmail": "samuel@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Lisa Wong", "professionalWebsite": "www.lisawong.dev", "professionalQualifications": "Bachelors in Software Engineering", "professionalDescription": "Mobile app developer with experience in iOS and Android platforms.", "professionalPhoneNumber": "0412345701", "professionalEmail": "lisa@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Tommy Fang", "professionalWebsite": "www.tommyfang.com", "professionalQualifications": "Masters in Urban Planning", "professionalDescription": "Urban planner focused on sustainable city design and infrastructure.", "professionalPhoneNumber": "0412345702", "professionalEmail": "tommy@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Jessica Li", "professionalWebsite": "www.jessicali.dev", "professionalQualifications": "Masters in AI and Robotics", "professionalDescription": "Robotics engineer working on AI-driven automation solutions.", "professionalPhoneNumber": "0412345703", "professionalEmail": "jessica@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Ben Yang", "professionalWebsite": "www.benyang.com", "professionalQualifications": "Bachelors in Construction Management", "professionalDescription": "Experienced in managing large construction projects with an emphasis on cost efficiency.", "professionalPhoneNumber": "0412345704", "professionalEmail": "ben@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Amy Tran", "professionalWebsite": "www.amytran.dev", "professionalQualifications": "Masters in Data Analytics", "professionalDescription": "Data analyst skilled in statistical analysis and business intelligence.", "professionalPhoneNumber": "0412345705", "professionalEmail": "amy@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Kevin Wu", "professionalWebsite": "www.kevinwu.com", "professionalQualifications": "Bachelors in Architecture", "professionalDescription": "Architect with a focus on sustainable and modern building designs.", "professionalPhoneNumber": "0412345706", "professionalEmail": "kevin@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Olivia Lee", "professionalWebsite": "www.olivialee.dev", "professionalQualifications": "Bachelors in Computer Science", "professionalDescription": "Software engineer experienced in frontend frameworks and UX design.", "professionalPhoneNumber": "0412345707", "professionalEmail": "olivia@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Nathan Park", "professionalWebsite": "www.nathanpark.com", "professionalQualifications": "Masters in Construction Engineering", "professionalDescription": "Construction engineer with expertise in project planning and safety compliance.", "professionalPhoneNumber": "0412345708", "professionalEmail": "nathan@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Ryan Zhou", "professionalWebsite": "www.ryanzhou.com", "professionalQualifications": "Bachelors in Civil Engineering", "professionalDescription": "Civil engineer with experience in residential and commercial development.", "professionalPhoneNumber": "0412345710", "professionalEmail": "ryan@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]},
    {"professionalFullName": "Alice Kim", "professionalWebsite": "www.alicekim.dev", "professionalQualifications": "Bachelors in Cybersecurity", "professionalDescription": "Cybersecurity analyst skilled in risk management and penetration testing.", "professionalPhoneNumber": "0412345711", "professionalEmail": "alice@example.com", "professionalPassword": "Password123", "professionalSkills": ["Coding"]},
    {"professionalFullName": "Jack Wang", "professionalWebsite": "www.jackwang.com", "professionalQualifications": "Masters in Structural Engineering", "professionalDescription": "Structural engineer focused on resilient infrastructure and safety codes.", "professionalPhoneNumber": "0412345712", "professionalEmail": "jack@example.com", "professionalPassword": "Password123", "professionalSkills": ["Other"]}
]

# Sample projects to be created under a specific company
DEFAULT_PROJECTS = [
    {
        "projectName": "AI Research Project",
        "projectDescription": "Cutting-edge AI research aimed at surpassing current capabilities in language modeling and problem-solving.",
        "projectObjectives": "To create an AI model more advanced than current state-of-the-art models.",
        "projectCategories": ["Software"],
        "projectLocation": "North Ryde, 2113",
        "projectSkills": ["Coding"],
        "projectStartDate": "01/01/2025",
        "projectEndDate": "01/06/2025"
    },
    {
        "projectName": "Cloud Infrastructure Project",
        "projectDescription": "Design a scalable cloud infrastructure to rival major cloud providers with a focus on flexibility and efficiency.",
        "projectObjectives": "Build a robust cloud infrastructure platform for enterprise use.",
        "projectCategories": ["Software"],
        "projectLocation": "Sydney, 2000",
        "projectSkills": ["Coding"],
        "projectStartDate": "15/02/2025",
        "projectEndDate": "15/08/2025"
    },
    {
        "projectName": "Cybersecurity Threat Analysis",
        "projectDescription": "Develop a real-time threat detection and mitigation system to enhance cybersecurity defenses.",
        "projectObjectives": "Strengthen security through advanced threat analysis and response.",
        "projectCategories": ["Software"],
        "projectLocation": "Melbourne, 3000",
        "projectSkills": ["Coding"],
        "projectStartDate": "20/03/2025",
        "projectEndDate": "20/09/2025"
    },
    {
        "projectName": "Healthcare Management System",
        "projectDescription": "Build a healthcare software solution to streamline patient management and medical communication.",
        "projectObjectives": "Provide efficient patient record handling and communication tools for healthcare providers.",
        "projectCategories": ["Software"],
        "projectLocation": "Brisbane, 4000",
        "projectSkills": ["Coding"],
        "projectStartDate": "05/04/2025",
        "projectEndDate": "05/10/2025"
    },
    {
        "projectName": "Sustainable Construction Initiative",
        "projectDescription": "Implement sustainable practices in construction using eco-friendly materials and energy-efficient methods.",
        "projectObjectives": "Reduce carbon footprint and promote sustainability in the construction process.",
        "projectCategories": ["Construction"],
        "projectLocation": "Perth, 6000",
        "projectSkills": ["Other"],
        "projectStartDate": "10/05/2025",
        "projectEndDate": "10/11/2025"
    },
    {
        "projectName": "Educational App for Remote Learning",
        "projectDescription": "Create a platform to support remote education with interactive and accessible learning tools.",
        "projectObjectives": "Enhance the remote learning experience through a user-friendly educational app.",
        "projectCategories": ["Software"],
        "projectLocation": "Adelaide, 5000",
        "projectSkills": ["Coding"],
        "projectStartDate": "15/06/2025",
        "projectEndDate": "15/12/2025"
    }
]

MORE_PROJECTS = [
    {
        "projectName": "Smart Agriculture Initiative",
        "projectDescription": "Develop a software solution for precision farming with IoT integration to monitor crops.",
        "projectObjectives": "Boost agricultural yield through data-driven, real-time insights.",
        "projectCategories": ["Software"],
        "projectLocation": "Orange, 2800",
        "projectSkills": ["Other"],
        "projectStartDate": "20/06/2025",
        "projectEndDate": "20/12/2025"
    },
    {
        "projectName": "Financial Literacy Platform",
        "projectDescription": "Develop an app for young adults to learn financial literacy through interactive courses and tools.",
        "projectObjectives": "Encourage financial independence through accessible education.",
        "projectCategories": ["Software"],
        "projectLocation": "Canberra, 2600",
        "projectSkills": ["Coding"],
        "projectStartDate": "01/07/2025",
        "projectEndDate": "01/01/2026"
    },
    {
        "projectName": "Renewable Energy Mapping",
        "projectDescription": "Create software for mapping renewable energy resources across regions.",
        "projectObjectives": "Support environmental awareness by identifying renewable energy opportunities.",
        "projectCategories": ["Software"],
        "projectLocation": "Hobart, 7000",
        "projectSkills": ["Other"],
        "projectStartDate": "10/08/2025",
        "projectEndDate": "10/02/2026"
    }
]

SAVE_TREES_PROJECTS = [
    {
        "projectName": "Plant Trees",
        "projectDescription": "Develop an app to track tree planting initiatives and connect volunteers with local reforestation projects.",
        "projectObjectives": "Encourage reforestation efforts by simplifying volunteer recruitment and tracking environmental impact.",
        "projectCategories": ["Software"],
        "projectLocation": "Melbourne, 3000",
        "projectSkills": ["Coding"],
        "projectStartDate": "01/01/2025",
        "projectEndDate": "01/06/2025"
    },
    {
        "projectName": "GreenScape AI",
        "projectDescription": "An AI-driven platform to assess deforested land and recommend optimal tree species for replanting.",
        "projectObjectives": "Use AI to guide sustainable reforestation with species that thrive in specific environments, enhancing biodiversity.",
        "projectCategories": ["Software"],
        "projectLocation": "Brisbane, 4000",
        "projectSkills": ["Coding"],
        "projectStartDate": "15/02/2025",
        "projectEndDate": "15/08/2025"
    },
    {
        "projectName": "EcoTrack",
        "projectDescription": "Build a platform that allows individuals and businesses to offset carbon emissions by funding local tree-planting projects.",
        "projectObjectives": "Promote carbon offsetting and track contributions towards reforestation goals.",
        "projectCategories": ["Software"],
        "projectLocation": "Sydney, 2000",
        "projectSkills": ["Coding"],
        "projectStartDate": "01/03/2025",
        "projectEndDate": "01/09/2025"
    },
    {
        "projectName": "Plant-A-Tree Challenge",
        "projectDescription": "Create a social media-integrated website to challenge users to plant trees and share their progress.",
        "projectObjectives": "Raise awareness and motivate individuals to engage in reforestation through a gamified approach.",
        "projectCategories": ["Software"],
        "projectLocation": "Perth, 6000",
        "projectSkills": ["Coding"],
        "projectStartDate": "10/04/2025",
        "projectEndDate": "10/10/2025"
    },
    {
        "projectName": "Forest Restoration Data Hub",
        "projectDescription": "A central database and website for storing data on global reforestation efforts, accessible by researchers and policymakers.",
        "projectObjectives": "Facilitate data-driven decisions for environmental restoration by providing comprehensive reforestation data.",
        "projectCategories": ["Software"],
        "projectLocation": "Darwin, 0800",
        "projectSkills": ["Coding"],
        "projectStartDate": "15/05/2025",
        "projectEndDate": "15/11/2025"
    },
    {
        "projectName": "EcoAI Drone Mapping",
        "projectDescription": "Develop drone software to map deforested areas and analyze terrain for optimal tree replanting locations.",
        "projectObjectives": "Improve efficiency in reforestation planning using aerial imagery and data analysis.",
        "projectCategories": ["Software"],
        "projectLocation": "Alice Springs, 0870",
        "projectSkills": ["Coding"],
        "projectStartDate": "20/06/2025",
        "projectEndDate": "20/12/2025"
    },
    {
        "projectName": "TreeMatcher",
        "projectDescription": "Build a website that matches tree-planting volunteers with projects based on location and availability.",
        "projectObjectives": "Make tree-planting accessible to more people by connecting volunteers to projects in their local areas.",
        "projectCategories": ["Software"],
        "projectLocation": "Adelaide, 5000",
        "projectSkills": ["Coding"],
        "projectStartDate": "01/07/2025",
        "projectEndDate": "01/01/2026"
    },
    {
        "projectName": "Carbon Footprint Calculator",
        "projectDescription": "Create a tool that helps users calculate their carbon footprint and suggests tree-planting activities to offset it.",
        "projectObjectives": "Increase awareness of personal carbon impact and encourage participation in reforestation.",
        "projectCategories": ["Software"],
        "projectLocation": "Hobart, 7000",
        "projectSkills": ["Coding"],
        "projectStartDate": "15/08/2025",
        "projectEndDate": "15/02/2026"
    },
    {
        "projectName": "ReforestMonitor",
        "projectDescription": "A website solution to monitor tree growth and health in reforestation sites using satellite imagery.",
        "projectObjectives": "Provide insights into reforestation success rates and areas needing additional support.",
        "projectCategories": ["Software"],
        "projectLocation": "Canberra, 2600",
        "projectSkills": ["Coding"],
        "projectStartDate": "01/09/2025",
        "projectEndDate": "01/03/2026"
    },
    {
        "projectName": "Green Pledge Tracker",
        "projectDescription": "Develop a website where companies can pledge to plant a certain number of trees and track their progress.",
        "projectObjectives": "Encourage corporate social responsibility through transparency and accountability in reforestation efforts.",
        "projectCategories": ["Software"],
        "projectLocation": "Gold Coast, 4217",
        "projectSkills": ["Coding"],
        "projectStartDate": "10/10/2025",
        "projectEndDate": "10/04/2026"
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
        microsoft_company = company_instances.get("microsoft@example.com")  # Change email if needed
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

        apple_company = company_instances.get("apple@example.com")  # Change email if needed
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

        save_trees_company = company_instances.get("savetrees@example.com")  # Change email if needed
        if save_trees_company:
            for project_data in SAVE_TREES_PROJECTS:
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
