"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=["POST"])
def register():
    body = request.json
    new_user = User(email=body['email'], password=body["password"], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": True, "data": "user registered, log in now"}), 201


@api.route('/login', methods=["POST"])
def login():
    body = request.json
    query = select(User).where(User.email == body["email"])
    user = db.session.execute(query).scalar_one()
    if user is None:
        return jsonify({"success": False, "data": "user not found"}), 404
    print('-------------------',user)
    if user.password != body["password"]:
        return jsonify({"success": False, "data": "wrong email/password"}), 400
    #para error subject must be a string no aparezca, tenemos que poner que la identidad sera str(user.id)
    token = create_access_token(identity=str(user.id))
    

    return jsonify({"success": True, "data": "user logged in", "token": token}), 200

@api.route('/private', methods=["GET"])
@jwt_required() #se encarga de pedir, revisar y verificar el token
def private():
    id = get_jwt_identity()
    print('user id is ----------------------------------------> ',id)
    user = db.session.get(User, id)
    return jsonify({"success":True, "data": user.serialize() })