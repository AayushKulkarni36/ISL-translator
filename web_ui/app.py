from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from googletrans import Translator
import json
import os

app = Flask(__name__, static_folder="static")
CORS(app)


with open("isl_dict.json", "r") as f:
    raw_dict = json.load(f)
    isl_dict = {k.lower(): v.replace("\\", "/") for k, v in raw_dict.items()}

translator = Translator()

def detect_language(text):
    try:
        detection = translator.detect(text)
        print(f"Detected language: {detection.lang}")
        return detection.lang
    except Exception as e:
        print("Language detection error:", e)
        return "en"

def translate_to_english(text, source_lang):
    try:
        translated = translator.translate(text, src=source_lang, dest='en')
        print(f"Translated '{text}' from {source_lang} to English: {translated.text}")
        return translated.text
    except Exception as e:
        print("Translation error:", e)
        return text

@app.route("/translate", methods=["POST"])
def translate():
    try:
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "Invalid input"}), 400

        input_text = data["text"].strip()


        detected_lang = detect_language(input_text)

 
        if detected_lang != "en":
            translated_text = translate_to_english(input_text, detected_lang)
        else:
            translated_text = input_text

 
        words = translated_text.lower().split()
        video_paths = []

        print(f"\nWords to check: {words}")
        for word in words:
            if word in isl_dict:
                video_rel_path = isl_dict[word]
                full_path = os.path.join(app.static_folder, video_rel_path)
                if os.path.exists(full_path):
                    video_paths.append(f"/static/{video_rel_path}")
                else:
                    print(f"File not found: {full_path}")
            else:
                print(f"Word not found in dictionary: '{word}'")

        return jsonify({
            "videos": video_paths,
            "display_lang": detected_lang,
            "original_text": input_text
        })

    except Exception as e:
        print("Exception in /translate:", e)
        return jsonify({"error": "Error during translation"}), 500

@app.route('/static/<path:filename>')
def serve_static_file(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == "__main__":
    app.run(debug=True)
