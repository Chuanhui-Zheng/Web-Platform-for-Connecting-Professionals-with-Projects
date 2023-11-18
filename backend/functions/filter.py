from flask import Flask, jsonify
from flask_cors import CORS
from database.models import Skills, Categories, Projects

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


"""
getSkills() retrieves the list of skills from the database.

Returns:
[
    ...list of skills...
]
"""
@app.route('/get/skills', methods=['GET'])
def getSkills():
    skills = Skills.query.filter_by(name="skills").first()
    skillsList = skills.listOfSkills
    return jsonify(skillsList), 200


"""
getCategories() retrieves the list of categories from the database.

Returns:
[
    ...list of categories...
]
"""
@app.route('/get/categories', methods=['GET'])
def getCategories():
    categories = Categories.query.filter_by(name="categories").first()
    categoriesList = categories.listOfCategories
    return jsonify(categoriesList), 200


"""
getLocations() retrieves the list of categories from the database.

Returns:
[
    ...list of locations...
]
"""
@app.route('/get/locations', methods=['GET'])
def getLocations():
    projects = Projects.query.all()
    locations = list({project.projectLocation for project in projects if project.projectLocation})
    return jsonify(locations), 200