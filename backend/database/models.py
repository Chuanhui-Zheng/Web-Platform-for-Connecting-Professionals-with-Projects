from extensions import db
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

def generate_uuid():
    return uuid4()

class Company(db.Model):
    __tablename__ = "companies"
    companyId = db.Column(db.String(), primary_key=True, default=str(generate_uuid))
    companyEmail = db.Column(db.String(), nullable=False)
    companyPassword = db.Column(db.Text())

    def __repr__(self):
        return f"<Company {self.companyEmail}>"

    def set_company_password(self, companyPassword):
        self.companyPassword = generate_password_hash(companyPassword)

    def check_company_password(self, companyPassword):
        return check_password_hash(self.companyPassword, companyPassword)
    
    @classmethod
    def get_company_by_email(cls, companyEmail):
        return cls.query.filter_by(companyEmail=companyEmail).first()

    def save_company(self):
        db.session.add(self)
        db.session.commit()

    # def delete_company(self):
    #     db.session.delete(self)
    #     db.session.commit()

class Professional(db.Model):
    __tablename__ = "professionals"
    professionalId = db.Column(db.String(), primary_key=True, default=str(generate_uuid))
    professionalEmail = db.Column(db.String(), nullable=False)
    professionalPassword = db.Column(db.Text())

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
