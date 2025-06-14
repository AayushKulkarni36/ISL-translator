from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import json
import os

app = Flask(__name__, static_folder="static")
CORS(app)

# Load ISL dictionary with lowercase keys and fixed slashes
with open("isl_dict.json", "r") as f:
    raw_dict = json.load(f)
    isl_dict = {k.lower(): v.replace("\\", "/") for k, v in raw_dict.items()}

@app.route("/translate", methods=["POST"])
def translate():
    try:
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "Invalid input"}), 400

        input_text = data["text"].strip()
        words = input_text.lower().split()
        video_paths = []

        print(f"\n📥 Received text: '{input_text}'")
        print("🔎 Words to check:", words)
        print("📖 Dictionary keys:", list(isl_dict.keys()))

        for word in words:
            if word in isl_dict:
                video_rel_path = isl_dict[word]  # e.g., ISL_Vid/hello.mp4
                full_path = os.path.join(app.static_folder, video_rel_path)
                print(f"\n➡️ Checking word: '{word}'")
                print(f"✅ Found in dictionary. Path: {full_path}")

                if os.path.exists(full_path):
                    video_paths.append(f"/static/{video_rel_path}")
                else:
                    print(f"⚠️ File NOT FOUND on disk: {full_path}")
            else:
                print(f"❌ Word not found in dictionary: '{word}'")

        print("\n🎬 Final video list to return:", video_paths)
        return jsonify({"videos": video_paths})

    except Exception as e:
        print("🚨 Exception in /translate:", e)
        return jsonify({"error": "Error during translation"}), 500

@app.route('/static/<path:filename>')
def serve_static_file(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == "__main__":
    app.run(debug=True)
