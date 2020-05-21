from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user
from database.models import User
from flask import Response, request
from flask import current_app as app
import json
from pymongo import MongoClient
from flask_restful import Resource

#import sys
#sys.path.append("..")
#import app

def initialize_signIn(app):
    login = LoginManager(app)

with open("config.json", "r") as f:
    config = json.load(f)
client= MongoClient(config['mongodbHost'])
user_db = client.get_database('test')

records = user_db.user

# this method gets inputted email and password
# and send it match it with the data in the database
# return 404 if email doesn't exist
# return 400 if the password is wrong
# return user is on succesful sign in
class SignInApi(Resource):
    def post(self):
        #if(current_user.is_authenticated):
        #    return "User is authenticated. Redirect to index.html"
        data = request.json
        email = data['email']

        user = records.find_one({'email': data['email']})
        if user is None:
            print("User does not exists")
            return("404")
        
        input_password = data['password']
        if not check_password_hash(user['password'], input_password): 
            print("Wrong password")
            return("400")
        
        print("succesful sign_in")
        # success = login_user(user, remember=data, force=True)
        # print(success)
        return str(user['_id'])

'''
@app.route('/logout')
def logout():
    logout_user()
    return "user is now logged out" 

'''
#----- This section handles user verification and session -----------

# flask-login knows nothing about database
# we need this method to keep track of user session
# id is a string (as stored in the database)
#@LoginManager.user_loader
#def load_user(id):
#    return user['_id']
