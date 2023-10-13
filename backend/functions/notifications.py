from flask import Flask

app = Flask(__name__)

@app.route('/notifications/get', methods=['GET'])
def getNotifications():
    return

@app.route('/notifications/send', methods=['POST'])
def sendNotifications():
    return
