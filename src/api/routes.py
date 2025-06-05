"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200
@api.route('/signup', methods=['POST'])
def signup():
    try:
        
        user_name = request.get.json('username', None)
        password = request.get.json('password',None)

        
        if user_name is None:
            return jsonify({'msg': 'Es necesario escribir el nombre de usuario'}), 400
        if password is None:
            return jsonify({'msg': 'Es necesario escribir la contraseña'}), 400
