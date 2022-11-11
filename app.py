import uuid

from flask import Flask, jsonify, make_response, request

from data import handler

app = Flask(__name__)


@app.route("/cultivations", methods=["POST"])
def create_cultivation():
    cultivation_id = str(uuid.uuid4())
    cultivation = request.json

    if not cultivation.get("name"):
        return jsonify({"error": f"Could not parse name of cultivation"}), 400

    body = {"id": cultivation_id, **cultivation}
    handler.add_data(filename="data/pseudo-db/cultivations.json", body=body)
    return jsonify(body)


@app.route("/cultivations", methods=["GET"])
def get_cultivations():
    return jsonify(handler.get_data(filename="data/pseudo-db/cultivations.json"))


@app.route("/users")
def get_users():
    return jsonify(handler.get_data(filename="data/static/users.json"))


@app.route("/cultivation-roles")
def get_cultivation_roles():
    return jsonify(handler.get_data(filename="data/static/cultivation-roles.json"))


@app.route("/cultivation-users/<string:cultivation_id>", methods=["GET"])
def get_cultivation_users(cultivation_id):
    cultivations_users = handler.get_data(filename="data/pseudo-db/cultivation-users.json")
    cultivation_users = [cultivation_user for cultivation_user in cultivations_users
                         if cultivation_user["cultivation_id"] == cultivation_id]
    return jsonify(cultivation_users)


@app.route("/cultivation-users/<string:cultivation_id>", methods=["DELETE"])
def delete_cultivation_user(cultivation_id):
    user_id, role_id = handler.validate_user_data(request.json)
    if not any([user_id, role_id]):
        return jsonify({"error": "Could not parse user data"}), 400
    if not role_id:
        return jsonify({"error": f"role id {role_id} does not exist"}), 422

    cultivations_users = handler.get_data(filename="data/pseudo-db/cultivation-users.json")
    cultivation_users = [cu for cu in cultivations_users
                         if not (cu["cultivation_id"] == cultivation_id and cu["user"]["id"] == user_id)]
    handler.overwrite_data(filename="data/pseudo-db/cultivation-users.json", new_data=cultivation_users)

    return jsonify({"delete": "success"}), 204


@app.route("/cultivation-users/<string:cultivation_id>", methods=["POST"])
def add_cultivation_user(cultivation_id):
    user_data = request.json
    user_id, role_id = handler.validate_user_data(user_data)
    if not any([user_id, role_id]):
        return jsonify({"error": "Could not parse user data"}), 400
    if not role_id:
        return jsonify({"error": f"role id {role_id} does not exist"}), 422

    cultivations_users = handler.get_data(filename="data/pseudo-db/cultivation-users.json")
    cultivation_users = [cu for cu in cultivations_users
                         if cu["cultivation_id"] == cultivation_id and cu["user"]["id"] == user_id]

    if cultivation_users:
        return jsonify({"error": f"User already exists in cultivation"}), 422

    cultivation_user = {"cultivation_id": cultivation_id, **user_data}
    handler.add_data(filename="data/pseudo-db/cultivation-users.json", body=cultivation_user)

    return jsonify(cultivation_user)


@app.route("/cultivation-users/<string:cultivation_id>", methods=["PUT"])
def edit_cultivation_user(cultivation_id):
    user_data = request.json
    user_id, new_role_id = handler.validate_user_data(user_data)
    if not any([user_id, new_role_id]):
        return jsonify({"error": "Could not parse user data"}), 400
    if not new_role_id:
        return jsonify({"error": f"role id {new_role_id} does not exist"}), 422

    cultivations_users = handler.get_data(filename="data/pseudo-db/cultivation-users.json")
    cultivation_users = [cu for cu in cultivations_users
                         if cu["cultivation_id"] == cultivation_id and cu["user"]["id"] == user_id]

    if not cultivation_users:
        return jsonify({"error": f"User does not exist in cultivation"}), 422

    for cu_index, cu in enumerate(cultivations_users):
        if cu["cultivation_id"] == cultivation_id and cu["user"]["id"] == user_id:
            cultivations_users[cu_index]["role"]["id"] = new_role_id

    handler.overwrite_data(filename="data/pseudo-db/cultivation-users.json", new_data=cultivations_users)

    return jsonify({"cultivation_id": cultivation_id, **user_data})


@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error="Not found!"), 404)


if __name__ == "__main__":
    app.run()
