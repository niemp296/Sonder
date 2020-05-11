from flask import Response, request
from database.models import User
from flask_restful import Resource

# Since Python doesn't support overloads, two different methods need to be
# created to support perform CRUD on a list of users and a single user location.

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
        #TODO: figure out how to get user based on id
        print("getting user based on id")
        print("id: ", id)
        user = User.objects.get(id=id).to_json()
        return Response(user, mimetype="application/json", status=200)