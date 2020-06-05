from flask import Response, request
from database.models import User
from flask_restful import Resource
from pymongo import MongoClient
from bson.json_util import dumps
import json

# Since Python doesn't support overloads, two different methods need to be
# created to support perform CRUD on a list of users and a single user location.
with open("config.json", "r") as f:
    config = json.load(f)
client= MongoClient(config['mongodbHost'])
plan_db = client.get_database('test').plan

class UsersApi(Resource):
    def get(self):
        users = User.objects().to_json()
        return Response(users, mimetype="application/json", status=200)

    def post(self):
        body = request.get_json()
        user = User(**body).save()
        id = user.id
        return {'id': str(id)}, 200

class UserApi(Resource):
    def put(self, id):
        body = request.get_json()
        User.objects.get(id=id).update(**body)
        return '', 200

    def delete(self, id):
        user = User.objects.get(id=id).delete()
        return '', 200

    def get(self, id):
        user = User.objects(id=id).to_json()
        return Response(user, mimetype="application/json", status=200)

class UserPlansApi(Resource):
    def get(self, id):
        plans = plan_db.find({'author': id}) 
        return Response(dumps(plans), mimetype="application/json", status=200)