import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)

# Security token (should be kept secret and matched from UI)
SECURE_TOKEN = "my_secure_token"

# Whitelisted safe commands (extend as needed)
SAFE_COMMANDS = {
    "install": "pip install",
    "upgrade": "pip install --upgrade",
    "run": "python",
}

@app.route("/perform", methods=["POST"])
def perform():
    token = request.headers.get("Authorization")
    if token != f"Bearer {SECURE_TOKEN}":
        return jsonify({"status": "error", "message": "Unauthorized"}), 403

    action = request.json.get("action")
    target = request.json.get("target")
    if action not in SAFE_COMMANDS:
        return jsonify({"status": "error", "message": "Invalid action"}), 400

    command = f"{SAFE_COMMANDS[action]} {target}"
    try:
        result = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT, timeout=30)
        return jsonify({"status": "success", "output": result.decode("utf-8")})
    except subprocess.CalledProcessError as e:
        return jsonify({"status": "error", "output": e.output.decode("utf-8")})
    except Exception as e:
        return jsonify({"status": "error", "output": str(e)})

if __name__ == "__main__":
    app.run(port=6969)