from flask import Flask, request, jsonify
from flask_cors import CORS
from database.models import Company, Professional, Projects
from extensions import db
from sqlalchemy import or_, and_, func, text
import re
import json

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
'''
PARAMETERS (query string)
/notifications/get?professionalId=PROFESSIONALIDHERE


RETURN {
    list of notification objects
}
'''
@app.route('/notifications/get', methods=['GET'])
def getNotifications():
    professionalId = int(request.args.get("professionalId"))
    
    professional = Professional.get_professional_by_id(professionalId)
    

    return jsonify(professional.professionalNotifications), 200