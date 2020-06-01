from .location import LocationsApi, LocationApi
from .plan import PlansApi, PlanApi
from .user import UsersApi, UserApi, UserPlansApi
from .signIn import SignInApi
from .signUp import SignUpApi

# API endpoints to access Database
def initialize_routes(api):
    api.add_resource(LocationsApi, '/api/locations/')
    api.add_resource(LocationApi, '/api/locations/<id>')
    api.add_resource(PlansApi, '/api/plans/')
    api.add_resource(PlanApi, '/api/plans/<id>')
    api.add_resource(UsersApi, '/api/users/')
    api.add_resource(UserApi, '/api/users/<id>')
    api.add_resource(UserPlansApi, '/api/userplans/<id>')
    api.add_resource(SignInApi, '/api/signIn')
    api.add_resource(SignUpApi, '/api/signUp')
