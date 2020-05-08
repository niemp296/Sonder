from flask import Flask, render_template, url_for, request, session, redirect
from flask_cors import CORS
#from flask_pymongo import PyMongo
#import bcrypt

app = Flask(__name__)
CORS(app)
'''

app.config['MONGO_DBNAME'] = 'mongologin'
app.config['MONGO_URI'] = 'mongodb://placeholder'

mongo = PyMongo(app)

@app.route('/')
def index():
    if 'username' in session:
        return 'You are logged in as ' + session['username']
    return "Hello world!"
'''
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
    return data

if __name__ == '__main__':
    app.secret_key = 'secretkey'
    app.run(debug=True)

