from flask import Flask
from routers.movies_router import Movies_db





app = Flask(__name__)





app.register_blueprint(movies,  url_prefix= "/movies")





app.run()