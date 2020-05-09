from .location import LocationsApi, LocationApi
from .plan import PlansApi, PlanApi
from .user import UsersApi, UserApi

# API endpoints to access Database
def initialize_routes(api):
    api.add_resource(LocationsApi, '/api/locations/')
    api.add_resource(LocationApi, '/api/locations/<id>')
    api.add_resource(PlansApi, '/api/plans/')
    api.add_resource(PlanApi, '/api/plans/<id>')
    api.add_resource(UsersApi, '/api/users/')
    api.add_resource(UserApi, '/api/users/<id>')
