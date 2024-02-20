from flask import Blueprint, jsonify, request
from BLL.subscriptionsBLL import Subscriptions_db

subscriptions = Blueprint("subscriptions", __name__)

subscriptions_BLL = Subscriptions_db()

@subscriptions.route("/", methods=["GET"])
def get_all():
    all_subscriptions = subscriptions_BLL.get_all_subscriptions()
    return jsonify(all_subscriptions)

@subscriptions.route("/<id>", methods=["GET"])
def get_one(id):
    subscription = subscriptions_BLL.get_subscription_by_id(id)
    return jsonify(subscription)



@subscriptions.route("/", methods=["POST"])
def create_one():
    subscription = request.json
    status = subscriptions_BLL.create_subscription(subscription)
    return jsonify({"status": status})

@subscriptions.route("/<id>", methods=["PUT"])
def update_one(id):
    new_subscription = request.json
    status = subscriptions_BLL.update_subscription(id, new_subscription)
    return jsonify({"status": status})

@subscriptions.route("/<id>", methods=["DELETE"])
def delete_one(id):
    status = subscriptions_BLL.delete_subscriptions(id)
    return jsonify({"status": status})
