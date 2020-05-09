from flask import Flask
from database.db import initialize_db
from flask_restful import Api
from resources.routes import initialize_routes
import json

with open("config.json", "r") as f:
    config = json.load(f)

app = Flask(__name__)
api = Api(app)

# As we are using localhost to host MongoDB, MongoDB server
# needs to be started first before this code can run

app.config['MONGODB_SETTINGS'] = {
    'host': config['mongodbHost']
}

initialize_db(app)
initialize_routes(api)

app.run()