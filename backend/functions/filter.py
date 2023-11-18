from flask import Flask, jsonify
from flask_cors import CORS
from database.models import Skills, Categories, Projects

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/get/skills', methods=['GET'])
def getSkills():
    skills = Skills.query.filter_by(name="skills").first()
    skillsList = skills.listOfSkills
    return jsonify(skillsList), 200

@app.route('/get/categories', methods=['GET'])
def getCategories():
    categories = Categories.query.filter_by(name="categories").first()
    categoriesList = categories.listOfCategories
    return jsonify(categoriesList), 200

@app.route('/get/locations', methods=['GET'])
def getLocations():
    project = Projects.query.filter_by(name="projects").first()
    locations = project.projectLocation
    return jsonify(locations), 200