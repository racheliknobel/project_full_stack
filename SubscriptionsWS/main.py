from flask import Flask
from flask_cors import CORS
import json
from bson import ObjectId

from routers.movies_router import movies
from routers.members_router import members
from routers.subscriptions_router import subscriptions


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)



app = Flask(__name__)

app.json_encoder = JSONEncoder

CORS(app)

app.register_blueprint(movies,  url_prefix= "/movies")
app.register_blueprint(members,  url_prefix= "/members")
app.register_blueprint(subscriptions,  url_prefix= "/subscriptions")





app.run()