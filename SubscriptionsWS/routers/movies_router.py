from flask import Blueprint, jsonify, request
from BLL.moviesBLL import Movies_db

movies = Blueprint("movies", __name__)

movies_BLL = Movies_db()

@movies.route("/", methods=["GET"])
def gel_all():
    all_movies = movies_BLL.get_all_movies()
    return jsonify(all_movies)


@movies.route("/<id>", methods=["GET"])
def get_one(id):
    movie = movies_BLL.get_movie_by_id(id)
    return jsonify(movie)

@movies.route("/", methods=["POST"])
def create_one():
    movie = request.json
    status = movies_BLL.create_movie(movie)
    return jsonify({"status": status})

@movies.route("/<id>", methods=["PUT"])
def update_movie(id):
    new_movie = request.json
    status = movies_BLL.update_movie(id, new_movie)
    return jsonify({"status": status})


@movies.route("/<id>", methods=["DELETE"])
def delete_movie(id):
    status = movies_BLL.delete_movie(id)
    return jsonify({"status": status})
