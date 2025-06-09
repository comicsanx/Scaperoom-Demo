"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, GameSession
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import select, func
from flask import Blueprint, request, jsonify
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# --- RUTAS DE AUTENTICACIÓN (LOGIN/SIGNUP) ---

@api.route('/signup', methods=['POST'])
def signup():
    try:

        email = request.json.get('email', None)
        username = request.json.get('username', None)
        password = request.json.get('password', None)
        avatar_filename = request.json.get('avatar_filename', None)

        if not email or not username or not password or not avatar_filename: 
            return jsonify({'msg': 'Se necesita email, nombre de usuario, contraseña y avatar'}), 400
        
        ALLOWED_AVATARS = ["avatar_01.png", "avatar_02.png", "avatar_03.png"] # EJEMPLO: ¡Ajusta estos nombres!
        if avatar_filename not in ALLOWED_AVATARS:
            return jsonify({"msg": "El avatar seleccionado no es válido"}), 400

        user_exists_email = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
        if user_exists_email:
            return jsonify({'msg': 'El email ya está registrado'}), 409
        
        hashed_password = generate_password_hash(password)

        new_user = User(
            email=email,
            username=username,
            password_hash=hashed_password,
            avatar_filename=avatar_filename,
            is_active=True
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify({'msg': 'User created successfully'}), 201

    except Exception as error:
        print(f'Error al registrar el usuario: {error}')
        return jsonify({"error": "Internal server error"}), 500
    
@api.route('/login', methods=['POST'])
def login():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        if not email or not password:
            return jsonify({'msg': 'email o contraseña incorrectos'}), 401

        stm = select(User).where(User.email == email)
        user = db.session.execute(stm).scalar_one_or_none()

        if user is None:
            return jsonify({'msg': 'Usuario no encontrado en la base de datos'}), 401

        if not check_password_hash(user.password_hash, password):
            return jsonify({'msg': 'Usuario o contraseña incorrecta'}), 400

        access_token = create_access_token(identity=str(user.id))
        return jsonify({"token": access_token, "user": user.serialize()}), 200 

    except Exception as error:
        print(f'Error en el login: {error}')
        return jsonify({"msg": "Error interno del servidor"}), 500
    
# --- RUTAS DE PERFIL DE USUARIO (GET, PUT, DELETE) ---
    
@api.route('/user/profile', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()

def handle_user_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    if request.method == 'GET':
        # Ruta para obtener el perfil del usuario (ya la tendrías implementada)
        return jsonify(user.serialize()), 200
    
    elif request.method == 'PUT':

        try:
            data = request.get_json()

            new_username = data.get('username', None)
            if new_username is not None:
                user.username = new_username

            new_avatar_filename = data.get('avatar_filename', None)
            if new_avatar_filename is not None:
                ALLOWED_AVATARS = ["avatar_01.png", "avatar_02.png", "avatar_03.png"]
                if new_avatar_filename not in ALLOWED_AVATARS:
                    return jsonify({"msg": "Nombre de archivo de avatar no válido."}), 400
                user.avatar_filename = new_avatar_filename

            new_password = data.get('password', None)
            current_password_for_verification = data.get('current_password', None)

            if new_password is not None:
           
                if not current_password_for_verification or not check_password_hash(user.password_hash, current_password_for_verification):
                    return jsonify({"msg": "Contraseña actual incorrecta."}), 401
           
            user.password_hash = generate_password_hash(new_password)

            db.session.commit()

            access_token = create_access_token(identity=str(user.id))
            return jsonify({"msg": "Perfil actualizado con éxito", "user": user.serialize()}), 200

        except Exception as error:
            db.session.rollback()
            print(f"Error al actualizar el perfil del usuario: {error}")
            return jsonify({"msg": "Error interno del servidor"}), 500
    
    elif request.method == 'DELETE':
        try:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"msg": "Usuario eliminado con éxito"}), 204 
        except Exception as error:
            db.session.rollback()
            print(f"Error al eliminar el usuario: {error}")
            return jsonify({"msg": "Error interno del servidor"}), 500
    
    return jsonify({"msg": "Método no permitido"}), 405 

@api.route('/user/level', methods=['GET'])
@jwt_required() 
def get_user_current_level():
    try:
        current_user_id = get_jwt_identity()

        session = GameSession.query.filter_by(user_id=current_user_id).order_by(GameSession.id.desc()).first()
        if not session:
            return jsonify({"error": "No se encontró sesión de juego para este usuario"}), 404
        
        return jsonify({"current_level": session.current_level})
    except Exception as error:
        print(f'Error al obtener el nivel: {error}')
        return jsonify({"msg": "Error interno del servidor"}), 500

@api.route('/user/level', methods=['POST']) 
@jwt_required() 
def update_game_progress(user_id):
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        new_level = data.get('current_level')
        time_for_this_level = data.get('time_for_this_level', 0.0)

        if new_level is None:
            return jsonify({"error": "Falta el campo current_level"}), 400
        
        session = GameSession.query.filter_by(user_id=user_id).order_by(GameSession.id.desc()).first()

        if not session:
            return jsonify({"error": "No se encontró sesión de juego para este usuario"}), 404
        
        session.current_level = new_level
        session.accumulated_time += time_for_this_level


        if new_level == 2: # O el número del nivel final
            session.status = "completed"
            session.total_time = session.accumulated_time

        user = User.query.get(current_user_id)
        if user.best_time is None or session.total_time < user.best_time:
                user.best_time = session.total_time

        db.session.commit()
        return jsonify({"message": "Nivel actualizado", "current_level": session.current_level})
    except Exception as error:
        db.session.rollback()
        print(f'Error al actualizar el nivel: {error}')
        return jsonify({"msg": "Error interno del servidor"}), 500

@api.route('/game_session/start', methods=['POST'])
@jwt_required()
def start_new_game_session():
    try:
        current_user_id = get_jwt_identity()

        new_session = GameSession(
            user_id=current_user_id,
            status="playing",
            accumulated_time=0.0,
            total_time=0.0,
            current_level=1
        )

        db.session.add(new_session)
        db.session.commit()
        return jsonify({"msg": "Nueva sesión de juego iniciada", "session_id": new_session.id}), 201

    except Exception as error:
        db.session.rollback()
        print(f'Error al iniciar nueva sesión de juego: {error}')
        return jsonify({"msg": "Error interno del servidor"}), 500

@api.route('/ranking', methods=['GET'])
@jwt_required() 
def get_ranking_by_level():
    try:
        level_param = request.args.get('level', type=int)
        if level_param is None:
            return jsonify({"msg": "Es necesario especificar el nivel para el ranking (ej: /api/ranking?level=1)"}), 400
        
        subquery = (
            db.session.query(
                GameSession.user_id,
                func.min(GameSession.accumulated_time).label('best_level_time')
            )
            .filter(
                GameSession.current_level == level_param,
                GameSession.status == "completed"
            )
            .group_by(GameSession.user_id)
            .subquery()
        )
        results = (
            db.session.query(
                User.id,
                User.username,
                subquery.c.best_level_time
            )
            .join(subquery, User.id == subquery.c.user_id)
            .order_by(subquery.c.best_level_time.asc())
            .all()
        )
        ranking = [
            {
                "user_id": user_id,
                "username": username,
                "best_time_for_level": best_level_time
            }
            for user_id, username, best_level_time in results
        ]
        return jsonify(ranking), 200
    except Exception as error:
        print(f'Error en el ranking: {error}')
        return jsonify({"msg": "Error interno del servidor"}), 500
    
@api.route('/ranking/global', methods=['GET'])
@jwt_required()
def get_global_ranking():
    try:
        subquery_best_total_time = (
            db.session.query(
                GameSession.user_id,
                func.min(GameSession.accumulated_time).label('best_total_game_time')
            )
            .filter(GameSession.status == "completed")
            .group_by(GameSession.user_id)
            .subquery()
        )

        results = (
            db.session.query(
                User.id,
                User.username, 
                subquery_best_total_time.c.best_total_game_time
            )
            .join(subquery_best_total_time, User.id == subquery_best_total_time.c.user_id)
            .order_by(subquery_best_total_time.c.best_total_game_time.asc())
            .all()
        )
        ranking_global = [
            {
                "user_id": user_id,
                "username": username,
                "total_time_completed_game": total_game_time
            }
            for user_id, username, total_game_time in results
        ]
        return jsonify(ranking_global), 200
    except Exception as error:
        print(f'Error en el ranking global: {error}')
        return jsonify({"msg": "Error interno del servidor"}), 500