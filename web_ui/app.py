from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load your ISL dictionary from JSON file
with open("isl_dict.json") as f:
    isl_dict = json.load(f)

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text", "").strip().lower()
    words = text.split()
    video_urls = []

    for word in words:
        key = word.capitalize()  # Assumes keys in isl_dict are capitalized
        if key in isl_dict:
            video_urls.append(isl_dict[key])

    if not video_urls:
        return jsonify({"error": "No ISL videos found for input"}), 404

    # ✅ Return all video URLs
    return jsonify({"video_urls": video_urls})

if __name__ == "__main__":
    app.run(debug=True)
