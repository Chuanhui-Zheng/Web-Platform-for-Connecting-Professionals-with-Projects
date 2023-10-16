from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/notifications/get', methods=['GET'])
def getNotifications():
    return

@app.route('/notifications/send', methods=['POST'])
def sendNotifications():
    return
