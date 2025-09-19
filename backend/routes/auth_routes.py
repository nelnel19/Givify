from flask import Blueprint, request, jsonify
from models import UserModel
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_routes = Blueprint("auth_routes", __name__)

# Register Route
@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    age = data.get("age")

    # Validate required fields
    if not name or not email or not password or age is None:
        return jsonify({"error": "All fields are required"}), 400

    # Validate age
    if int(age) < 18:
        return jsonify({"error": "You must be at least 18 years old to register"}), 400

    # Check if email exists
    if UserModel.find_by_email(email):
        return jsonify({"error": "Email already registered"}), 400

    # Create user
    user = UserModel.create_user(name, email, password, age)
    return jsonify({"message": "User registered successfully"}), 201


# Login Route
@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = UserModel.find_by_email(email)
    if not user or not UserModel.verify_password(user["password"], password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user["_id"]))
    return jsonify({
        "access_token": access_token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "age": user["age"]
        }
    }), 200
