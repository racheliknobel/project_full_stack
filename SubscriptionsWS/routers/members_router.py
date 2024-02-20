from flask import Blueprint, jsonify, request
from BLL.membersBLL import Members_db

members = Blueprint("members", __name__)

members_BLL = Members_db()

@members.route("/", methods=["GET"])
def get_all():
    all_members = members_BLL.get_all_members()
    return jsonify(all_members)

@members.route("/<id>", methods=["GET"])
def get_one(id):
    member = members_BLL.get_movie_by_id(id)
    return jsonify(member)


@members.route("/many", methods=["POST"])
def create_all():
    new_members = request.get_json
    status = members_BLL.create_all_members(new_members)
    return jsonify({"status": status})

@members.route("/", methods=["POST"])
def create_one():
    member = request.json
    status = members_BLL.create_member(member)
    return jsonify({"status": status})

@members.route("/<id>", methods=["PUT"])
def update_one(id):
    new_member = request.json
    status = members_BLL.update_member(id, new_member)
    return jsonify({"status": status})

@members.route("/<id>", methods=["DELETE"])
def delete_one(id):
    status = members_BLL.delete_member(id)
    return jsonify({"status": status})
