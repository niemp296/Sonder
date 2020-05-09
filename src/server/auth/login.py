from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user
import sys
sys.path.append('../')
from database.models import User
from database.db import db
import app

#login = LoginManager(app)
'''
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response
'''
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
    email = data['email']

    existing_user = email_already_exist(email)
    if existing_user is None:
        password = generate_password_hash(data['password'])
        print("no existing user. Password: ", password)
        new_user = User(email, password).save()
        login_user(new_user)
        print("succesfully registered: ", email)
        #TODO: send feedback to react
    return data

''' TODO: change the return so it pass something back to front-end '''
@app.route('/login', methods=['GET', 'POST'])
def login():
    if(current_user.is_authenticated):
        return "User is authenticated. Redirect to index.html"
    data = request.json
    print(data['email'])
    print(data['password'])
    user = User.objects(email=form.email.data).first()
    if user is None or not check_password_hash(data['password'], user['password']): 
        return("Invalid username or password")
    login_user(user) #remember??
    return ("succesful login")

@app.route('/logout')
def logout():
    logout_user()
    return "user is now logged out" 
#----- This section handles user verification and session -----------

class User(UserMixin, db.Document):
    meta = {'collection': 'users'}
    email = db.StringField(max_length=30)
    password = db.StringField()

# flask-login knows nothing about database
# we need this method to keep track of user session
# id is a string (as stored in the database)
@login.user_loader
def load_user(id):
    return User.objects(pk=user_id).first()

def email_already_exist(email):
    user = User.query.filter_by(email).first()
    if user is not None:
        return False


#------ This section contains the unused cose ------------------


'''TODO:
- authenticated user wanna view user-specific page: see https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-v-user-logins
- import app.config!
'''