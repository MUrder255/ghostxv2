from flask import Flask, request, jsonify
import subprocess, os, uuid, shutil

app = Flask(__name__)
BUILD_DIR = "./builds"

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    app_name = data.get('name', 'GhostXApp')
    code = data.get('code', '')
    uid = str(uuid.uuid4())[:8]
    folder = os.path.join(BUILD_DIR, uid)
    os.makedirs(folder, exist_ok=True)
    
    file_path = os.path.join(folder, f"{app_name}.py")
    with open(file_path, "w") as f:
        f.write(code)
    
    # Try to build with pyinstaller (you must have pyinstaller installed)
    try:
        subprocess.run(["pyinstaller", "--onefile", file_path], cwd=folder, timeout=60)
        dist_path = os.path.join(folder, "dist", f"{app_name}.exe")
        if os.path.exists(dist_path):
            return jsonify({"status": "success", "file": dist_path}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

    return jsonify({"status": "failed", "message": "Build failed."}), 400

if __name__ == '__main__':
    os.makedirs(BUILD_DIR, exist_ok=True)
    app.run(port=6969)