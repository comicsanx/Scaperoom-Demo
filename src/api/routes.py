"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from sqlalchemy import select, func
from flask import Blueprint, request, jsonify
from .models import db, User, GameSession

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

        user_name = request.json.get('email', None)
        password = request.json.get('password', None)

        if user_name is None:
            return jsonify({'msg': 'Es necesario escribir el nombre de usuario'}), 400
        if password is None:
            return jsonify({'msg': 'Es necesario escribir la contraseña'}), 400

        hashed_password = generate_password_hash(password)

        new_user = User(
            user_name=user_name,
            password=hashed_password
        )

        stm = select(User).where(User.user_name == user_name)
        db_user = db.session.execute(stm).scalar_one_or_none()

        if db_user:
            return jsonify({'msg': 'Usuario ya registrado'}), 409

        db.session.add(new_user)
        db.session.commit()
        return jsonify({'msg': 'Usuario creado correctamente'}), 201

    except Exception as error:
        print(f'error al registrar el usuario', {error})
        return jsonify({"error": "Error interno del servidor"}), 500


@api.route('/login', methods=['POST'])
def login():
    try:
        user_name = request.json.get('user_name', None)
        password = request.json.get('password', None)

        if user_name is None or password in None:
            return jsonify({'msg': 'nombre de usuario o password incorrecto'}), 401

        stm = select(User).where(User.user_name == user_name)
        user = db.session.execute(stm).scalar_one_or_none()

        if user is None:
            return jsonify({'msg': 'Usuario no encontrado en la base de datos'}), 401

        if not check_password_hash(user.password, password):
            return jsonify({'msg': 'Usuario o contraseña incorrecta'}), 400

        access_token = create_access_token(identity=str(user.id))
        return jsonify({"token": access_token, "user_id": user.id})

    except Exception as error:
        print(f'Error en el login: {error}')
        return jsonify({"msg": "Error interno del servidor"}), 500
    

@api.route('/user/<int:user_id>/level', methods=['GET'])
def get_user_level(user_id):
    try:
        session = GameSession.query.filter_by(user_id=user_id).order_by(GameSession.id.desc()).first()
        if not session:
            return jsonify({"error": "No se encontró sesión de juego para este usuario"}), 404
        return jsonify({"current_level": session.current_level})
    except Exception as error:
        print(f'Error al obtener el nivel: {error}')
        return jsonify({"msg": "Error interno del servidor"}), 500

@api.route('/user/<int:user_id>/level', methods=['POST'])
def set_user_level(user_id):
    try:
        data = request.get_json()
        new_level = data.get('current_level')
        if new_level is None:
            return jsonify({"error": "Falta el campo current_level"}), 400
        session = GameSession.query.filter_by(user_id=user_id).order_by(GameSession.id.desc()).first()
        if not session:
            return jsonify({"error": "No se encontró sesión de juego para este usuario"}), 404
        session.current_level = new_level
        db.session.commit()
        return jsonify({"message": "Nivel actualizado", "current_level": session.current_level})
    except Exception as error:
        print(f'Error al actualizar el nivel: {error}')
        return jsonify({"msg": "Error interno del servidor"}), 500

@api.route('/ranking', methods=['GET'])
def get_ranking():
    try:
        results = (
            db.session.query(
                User.id,
                User.user_name,
                func.sum(GameSession.acumuated_time).label('total_time')
            )
            .join(GameSession, GameSession.user_id == User.id)
            .filter(GameSession.current_level.in_([1, 2]))
            .group_by(User.id, User.user_name)
            .order_by(func.sum(GameSession.acumuated_time))
            .all()
        )
        ranking = [
            {
                "user_id": user_id,
                "user_name": user_name,
                "total_time": total_time
            }
            for user_id, user_name, total_time in results
        ]
        return jsonify(ranking), 200
    except Exception as error:
        print(f'Error en el ranking: {error}')
        return jsonify({"msg": "Error interno del servidor"}), 500