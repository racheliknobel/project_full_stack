from flask import Blueprint, jsonify, request
from BLL.moviesBLL import Movies_db

movies = Blueprint("movies", __name__)

movies_BLL = Movies_db()

@movies.route("/", methods=["GET"])
def gel_all():
    all_movies = movies_BLL.get_all_movies()
    return jsonify(all_movies)





@movies.route("/", methods=["POST"])
def create_all():
    new_movies = request.json()
    status = movies_BLL.create_all_movies(new_movies)
    return jsonify({"status": status})