from flask import Flask
from database.db import initialize_db
from flask_restful import Api
from resources.routes import initialize_routes

app = Flask(__name__)
api = Api(app)

# As we are using localhost to host MongoDB, MongoDB server
# needs to be started first before this code can run

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/sonder'
}

initialize_db(app)
initialize_routes(api)

app.run()