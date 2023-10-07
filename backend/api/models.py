from django.db import models
from django.contrib.auth.models import User
from django.core.validators import EmailValidator
from django.core.validators import URLValidator

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    
class Company(models.Model):
    id = models.CharField(unique=True)
    password = models.CharField() #options
    name = models.CharField()
    email = models.EmailField(unique=True, validators=[EmailValidator])
    phonenumber = models.CharField()
    website = models.URLField(validators=[URLValidator])
    logo = models.ImageField(upload_to ='uploads/') 
    description = models.TextField()

class Professional(models.Model):
    id = models.CharField(unique=True)
    password = models.CharField() #options
    lastname = models.CharField()
    firstname = models.CharField()
    profilepic = models.ImageField(upload_to ='uploads/') 
    email = models.EmailField(unique=True, validators=[EmailValidator])
    website = models.URLField(validators=[URLValidator])
    phonenumber = models.CharField()
    description = models.TextField()
    qualification = models.URLField(validators=[URLValidator])
    education = models #options
    skills = models #options