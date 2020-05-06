from .db import db

# Structure of each data type is declared here

class User(db.Document):
    plans = db.ListField(db.StringField(), unique=True)
    budget = db.DecimalField(min_value=0)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)
    firstName = db.StringField(required=True)
    lastName = db.StringField(required=True)
    userType = db.StringField(required=True, choices=('traveler', 'advertiser'))

class Plan(db.Document):
    locations = db.ListField(db.StringField(), required=True)
    budget = db.DecimalField(min_value=0)

class Location(db.Document):
    name = db.StringField(required=True)
    coord = db.ListField(db.FloatField(), max_length=2, required=True)
    openHours = db.ListField(db.StringField(), max_length=2)
    spending = db.DecimalField(min_value=0)
    type = db.StringField(required=True, choices=('city', 'country', 'outdoor', 'food', 'shopping', 'attraction'))
    city = db.StringField()
    country = db.StringField()