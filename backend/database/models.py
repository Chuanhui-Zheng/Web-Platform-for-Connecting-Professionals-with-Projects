from extensions import db
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from sqlalchemy import JSON
import random

# Function to create a random id
def create_id():
    existingIds = set()
    
    existingIds.update(
        item.companyId
        for item in Company.query.with_entities(Company.companyId).all()
    )

    existingIds.update(
        item.professionalId
        for item in Professional.query.with_entities(Professional.professionalId).all()
    )
    newId = random.randint(1, 1000000)

    while newId in existingIds:
        newId = random.randint(1, 1000000)
    
    return newId

class Company(db.Model):
    __tablename__ = "companies"
    companyId = db.Column(db.String(), primary_key=True, default=create_id)
    companyName = db.Column(db.String(), default="")
    companyEmail = db.Column(db.String(), nullable=False)
    companyPhoneNumber = db.Column(db.String(), default="")
    companyWebsite = db.Column(db.String(), default="")
    companyLogo = db.Column(db.String(), default="")
    companyPassword = db.Column(db.Text())
    companyDescription = db.Column(db.String(), default="")
    listOfProjectIds = db.Column(JSON, default=list)

    def __repr__(self):
        return f"<Company {self.companyEmail}>"

    def set_company_password(self, companyPassword):
        self.companyPassword = generate_password_hash(companyPassword)
        db.session.commit()

    # Sets company details
    def set_company_details(self, name, phone, website, description, logo):
        self.companyName = name
        self.companyPhoneNumber = phone
        self.companyWebsite = website
        self.companyDescription = description
        self.companyLogo = logo
        db.session.commit()

    def check_company_password(self, companyPassword):
        return check_password_hash(self.companyPassword, companyPassword)
    
    @classmethod
    def get_company_by_email(cls, companyEmail):
        return cls.query.filter_by(companyEmail=companyEmail).first()
    
    # Gets the company based on id
    @classmethod
    def get_company_by_id(cls, companyId):
        return cls.query.filter_by(companyId=companyId).first()
    
    # Gets the company based on id
    @classmethod
    def get_company_by_id(cls, companyId):
        return cls.query.filter_by(companyId=companyId).first()

    def save_company(self):
        db.session.add(self)
        db.session.commit()

    # def delete_company(self):
    #     db.session.delete(self)
    #     db.session.commit()

class Professional(db.Model):
    __tablename__ = "professionals"
    professionalId = db.Column(db.String(), primary_key=True, default=create_id)
    professionalFullName = db.Column(db.String(), default="")
    professionalPhoto = db.Column(db.String(), default="")
    professionalEmail = db.Column(db.String(), nullable=False)
    professionalWebsite = db.Column(db.String(), default="")
    professionalPhoneNumber = db.Column(db.String(), default="")
    professionalDescription = db.Column(db.String(), default="")
    professionalQualifications = db.Column(db.String(), default="")
    professionalEducation = db.Column(db.String(), default="")
    professionalSkills = db.Column(JSON, default=list)
    professionalPassword = db.Column(db.Text())
    professionalPastProjects = db.Column(JSON, default=list)
    professionalRatings = db.Column(JSON, default=dict)
    professionalCertificates = db.Column(JSON, default=dict)

    def __repr__(self):
        return f"<Professional {self.professionalEmail}>"

    def set_professional_password(self, professionalPassword):
        self.professionalPassword = generate_password_hash(professionalPassword)
        db.session.commit()

    def check_professional_password(self, professionalPassword):
        return check_password_hash(self.professionalPassword, professionalPassword)
    
    @classmethod
    def get_professional_by_email(cls, professionalEmail):
        return cls.query.filter_by(professionalEmail=professionalEmail).first()
    
    @classmethod
    def get_professional_by_id(cls, professionalId):
        return cls.query.filter_by(professionalId=professionalId).first()
    
    def save_professional(self):
        db.session.add(self)
        db.session.commit()


    #Sets all data
    def set_professional_details(self, name, website, number, description, qualification, education, skills, photo):
        self.professionalFullName = name
        self.professionalWebsite = website
        self.professionalNumber = number
        self.professionalDescription = description
        self.professionalQualification= qualification
        self.professionalEducation = education
        self.professionalSkills = skills
        self.professionalPhoto = photo
        db.session.commit()