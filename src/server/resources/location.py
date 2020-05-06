from flask import Response, request
from database.models import Location
from flask_restful import Resource

# Since Python doesn't support overloads, two different methods need to be
# created to support perform CRUD on a list of locations and single location.

class LocationsApi(Resource):
    def get(self):
        locations = Location.objects().to_json()
        return Response(locations, mimetype="application/json", status=200)

    def post(self):
        body = request.get_json()
        location = Location(**body).save()
        id = location.id
        return {'id': str(id)}, 200

class LocationApi(Resource):
    def put(self, id):
        body = request.get_json()
        Location.objects.get(id=id).update(**body)
        return '', 200

    def delete(self, id):
        location = Location.objects.get(id=id).delete()
        return '', 200

    def get(self, id):
        locations = Location.objects.get(id=id).to_json()
        return Response(locations, mimetype="application/json", status=200)