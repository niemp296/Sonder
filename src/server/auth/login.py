from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user

import sys
sys.path.append('../')
from database.models import User
import app

login = LoginManager(app)

client= MongoClient(config['mongodbHost'])
user_db = client.get_database('test')

records = user_db.user

#-----------ROUTING GOES HERE-------------------

@app.route('/signup', methods = ['GET', 'POST'])
def register():
    print(str(request.args))
    data = request.json
    print(data['firstName'])
    print(data['lastName'])
    print(data['traveler'])
    print(data['advertiser'])
    print(data['email'])
    print(data['password'])
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


@app.route('/login', methods=['GET', 'POST'])
def login():
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
    print("succesful login")
    return "200"

@app.route('/logout')
def logout():
    logout_user()
    return "user is now logged out" 

'''TODO:
- authenticated user wanna view user-specific page: see https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-v-user-logins
- import app.config!
'''