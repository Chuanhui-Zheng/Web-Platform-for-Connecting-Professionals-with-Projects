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

    # Setter for company phone number
    def set_company_phone(self, phone):
        self.companyPhoneNumber = phone
        db.session.commit()
    
    # Setter for company website
    def set_company_webiste(self, website):
        self.companyWebsite = website
        db.session.commit()
    
    # Setter for company website
    def set_company_name(self, name):
        self.companyName = name
        db.session.commit()
    
    # Setter for company description
    def set_company_description(self, description):
        self.companyDescription = description
        db.session.commit()

    # Setter for company logo
    def set_company_logo(self, logo):
        self.companyLogo = logo
        db.session.commit()

    # Setter for company phone number
    def set_company_phone(self, phone):
        self.companyPhoneNumber = phone
        db.session.commit()
    
    # Setter for company website
    def set_company_webiste(self, website):
        self.companyWebsite = website
        db.session.commit()
    
    # Setter for company description
    def set_company_description(self, description):
        self.companyDescription = description
        db.session.commit()

    # Setter for company logo
    def set_company_logo(self, logo):
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

    def check_professional_password(self, professionalPassword):
        return check_password_hash(self.professionalPassword, professionalPassword)
    
    @classmethod
    def get_professional_by_email(cls, professionalEmail):
        return cls.query.filter_by(professionalEmail=professionalEmail).first()

    def save_professional(self):
        db.session.add(self)
        db.session.commit()

        # Setter for professional phone number
    def set_professional_phone(self, phone):
        self.professionalPhoneNumber = phone
        db.session.commit()
    
    # Setter for professional website
    def set_professional_webiste(self, website):
        self.professionalWebsite = website
        db.session.commit()
    
    # Setter for professional description
    def set_professional_description(self, description):
        self.professionalDescription = description
        db.session.commit()

    # Setter for professional logo
    def set_professional_logo(self, logo):
        self.professionalLogo = logo
        db.session.commit()

    # Gets the professional based on id
    def get_professional_by_id(cls, companyId):
     return cls.query.filter_by(companyId=companyId).first()