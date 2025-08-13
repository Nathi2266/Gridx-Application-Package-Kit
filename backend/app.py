from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from db import get_db_connection, init_db
import os
import bcrypt
import psycopg2.errors

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret") # Change this in production!
jwt = JWTManager(app)

# Initialize DB tables
init_db()

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")

    if not full_name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO users (full_name, email, password)
            VALUES (%s, %s, %s) RETURNING id;
        """, (full_name, email, hashed_password.decode('utf-8')))
        user_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"message": "User registered successfully", "user_id": user_id}), 201
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        return jsonify({"error": "Email already registered"}), 409 # Conflict
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("SELECT id, password FROM users WHERE email = %s", (email,))
        user_data = cur.fetchone()

        if user_data and bcrypt.checkpw(password.encode('utf-8'), user_data[1].encode('utf-8')):
            access_token = create_access_token(identity=user_data[0])
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route("/api/topup", methods=["POST"])
@jwt_required()
def topup():
    data = request.json
    user_id = data.get("user_id")
    amount = data.get("amount")
    payment_method = data.get("payment_method")

    if not user_id or not amount or not payment_method:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO topups (user_id, amount, payment_method)
            VALUES (%s, %s, %s) RETURNING id;
        """, (user_id, amount, payment_method))
        topup_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"message": "Top-up recorded successfully", "topup_id": topup_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
