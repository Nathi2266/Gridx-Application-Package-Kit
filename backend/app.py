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
    phone_number = data.get("phone_number")

    if not full_name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO users (full_name, email, password, phone_number)
            VALUES (%s, %s, %s, %s) RETURNING id;
        """, (full_name, email, hashed_password.decode('utf-8'), phone_number))
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

@app.route("/api/me", methods=["GET"])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "SELECT id, full_name, email, phone_number, profile_image_url, notifications_enabled, created_at FROM users WHERE id = %s",
            (user_id,),
        )
        row = cur.fetchone()
        if not row:
            return jsonify({"error": "User not found"}), 404
        user = {
            "id": row[0],
            "full_name": row[1],
            "email": row[2],
            "phone_number": row[3],
            "profile_image_url": row[4],
            "notifications_enabled": row[5],
            "created_at": row[6].isoformat() if row[6] else None,
        }
        return jsonify(user), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route("/api/me", methods=["PUT"])
@jwt_required()
def update_me():
    user_id = get_jwt_identity()
    data = request.json or {}
    full_name = data.get("full_name")
    email = data.get("email")
    phone_number = data.get("phone_number")
    profile_image_url = data.get("profile_image_url")

    if not any([full_name, email, phone_number, profile_image_url]):
        return jsonify({"error": "Nothing to update"}), 400

    fields = []
    values = []
    if full_name is not None:
        fields.append("full_name = %s")
        values.append(full_name)
    if email is not None:
        fields.append("email = %s")
        values.append(email)
    if phone_number is not None:
        fields.append("phone_number = %s")
        values.append(phone_number)
    if profile_image_url is not None:
        fields.append("profile_image_url = %s")
        values.append(profile_image_url)

    values.append(user_id)

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(f"UPDATE users SET {', '.join(fields)} WHERE id = %s", tuple(values))
        conn.commit()
        return jsonify({"message": "Profile updated"}), 200
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        return jsonify({"error": "Email already in use"}), 409
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route("/api/me/password", methods=["PUT"])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    data = request.json or {}
    current_password = data.get("current_password")
    new_password = data.get("new_password")
    if not current_password or not new_password:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT password FROM users WHERE id = %s", (user_id,))
        row = cur.fetchone()
        if not row:
            return jsonify({"error": "User not found"}), 404
        if not bcrypt.checkpw(current_password.encode('utf-8'), row[0].encode('utf-8')):
            return jsonify({"error": "Current password is incorrect"}), 401
        new_hash = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        cur.execute("UPDATE users SET password = %s WHERE id = %s", (new_hash, user_id))
        conn.commit()
        return jsonify({"message": "Password updated"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route("/api/me/notifications", methods=["PUT"])
@jwt_required()
def update_notifications():
    user_id = get_jwt_identity()
    data = request.json or {}
    enabled = data.get("enabled")
    if enabled is None:
        return jsonify({"error": "Missing 'enabled' boolean"}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("UPDATE users SET notifications_enabled = %s WHERE id = %s", (bool(enabled), user_id))
        conn.commit()
        return jsonify({"message": "Notifications preference updated"}), 200
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
    app.run(host="0.0.0.0", debug=True, port=5000)
