from flask import Flask

app = Flask(__name__)

@app.route('/auth/register/company', methods=['POST'])
def authRegisterCompany():
    return

@app.route('/auth/register/professional', methods=['POST'])
def authRegisterProfessional():
    return

@app.route('/auth/login', methods=['POST'])
def login():
    return

@app.route('/auth/logout', methods=['POST'])
def logout():
    return
