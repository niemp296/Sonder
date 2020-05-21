from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user
from database.models import User
from flask import Response, request
import json
from pymongo import MongoClient
from flask_restful import Resource

#login = LoginManager(app)
with open("config.json", "r") as f:
    config = json.load(f)
client= MongoClient(config['mongodbHost'])
user_db = client.get_database('test')

records = user_db.user

class SignUpApi(Resource):
    def post(self):
        print(str(request.args))
        data = request.json
        firstName = data['firstName']
        lastName =data['lastName']
        email = data['email']

        existing_user = records.find_one({'email': data['email']}) 
        if existing_user is None:
            password = generate_password_hash(data['password'])
            print("no existing user. Password: ", password)
            records.insert_one({
                'plans': [],
                'budget' : 0,
                'email': email,
                'password': password,
                'firstName': firstName,
                'lastName' : lastName,
                'userType': 'traveler'
            })
            print("succesful sign up")
            return("200")

        print("There's an error / User already exists")
        return ("400")
