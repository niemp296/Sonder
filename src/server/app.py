
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

if __name__ == '__main__':
    app.run(debug=True)
