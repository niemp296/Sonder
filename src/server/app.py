
from flask import Flask, render_template, url_for, request, session, redirect
from database.db import initialize_db
from flask_restful import Api
from resources.routes import initialize_routes
#from auth import login
from flask_cors import CORS, cross_origin
import json
from pymongo import MongoClient


with open("config.json", "r") as f:
    config = json.load(f)

app = Flask(__name__)
CORS(app) #this allows it to connect with react

api = Api(app)

# As we are using localhost to host MongoDB, MongoDB server
# needs to be started first before this code can run

app.config['MONGODB_SETTINGS'] = {
    'host': config['mongodbHost']
}

initialize_db(app)
initialize_routes(api)

<<<<<<< HEAD
''' for some reason the login backend doesn't work if
it is in another file.
So I'm putting it here momentarily (weird CORS issue)
'''

from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user
from database.models import User

login = LoginManager(app)

client= MongoClient(config['mongodbHost'])
user_db = client.get_database('test')

records = user_db.user

#-----------ROUTING GOES HERE-------------------

@app.route('/signup', methods = ['GET', 'POST'])
def register():
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
            'budget' : 0,
            'email': email,
            'password': password,
            'firstname': firstName,
            'lastName' : lastName,
            'userType': 'traveler'
        })
        print("succesful sign up")
        return("200")

    print("There's an error / User already exists")
    return ("400")

#TODO: change sign-in to sign in 
@app.route('/sign-in', methods=['GET', 'POST'])
def sign-in():
    #if(current_user.is_authenticated):
    #    return "User is authenticated. Redirect to index.html"
    data = request.json
    email = data['email']

    user = records.find_one({'email': data['email']})
    if user is None:
        print("User does not exists")
        return("404")
    
    input_password = data['password']
    print(input_password)
    print(user['password'])
    if not check_password_hash(user['password'], input_password): 
        print("Wrong password")
        return("400")
    
    #login_user(user)
    print("succesful sign-in")
    return "200" #TODO: pass user id so react can access api

@app.route('/logout')
def logout():
    logout_user()
    return "user is now logged out" 
#----- This section handles user verification and session -----------

# flask-login knows nothing about database
# we need this method to keep track of user session
# id is a string (as stored in the database)
#@login.user_loader
#def load_user(id):
#    return user['_id']

''' end of login backend '''

=======
>>>>>>> d6c039c4b3bae95b3aac38862c83e05b8eceefa8
if __name__ == '__main__':
    app.run(debug=True)
