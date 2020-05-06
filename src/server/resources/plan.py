from flask import Response, request
from database.models import Plan
from flask_restful import Resource

# Since Python doesn't support overloads, two different methods need to be
# created to support perform CRUD on a list of plans and a single plan.

class PlansApi(Resource):
    def get(self):
        plans = Plan.objects().to_json()
        return Response(plans, mimetype="application/json", status=200)

    def post(self):
        body = request.get_json()
        plan = Plan(**body).save()
        id = plan.id
        return {'id': str(id)}, 200

class PlanApi(Resource):
    def put(self, id):
        body = request.get_json()
        Plan.objects.get(id=id).update(**body)
        return '', 200

    def delete(self, id):
        plan = Plan.objects.get(id=id).delete()
        return '', 200

    def get(self, id):
        plan = Plan.objects.get(id=id).to_json()
        return Response(plan, mimetype="application/json", status=200)