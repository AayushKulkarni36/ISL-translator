# ISL-translator


# 🧠 ISL Voice-to-Sign Language Translator 🎙️🤟

A final-year BE project that translates spoken English into Indian Sign Language (ISL) using **Speech Recognition**, **NLP**, and **3D animated sign videos**. This helps bridge the communication gap for the deaf and hard-of-hearing community in India.

---

## 🛠️ Features

- 🎤 **Speech-to-Text** using Python's `speech_recognition` library.
- ✏️ **Text Simplification** using basic NLP techniques.
- 🤖 **Word-to-Sign Mapping** powered by a custom ISL dictionary.
- 🎞️ **3D ISL Sign Display** using `OpenCV` to show animated sign videos.
- 🌐 **Web UI** for accessible user interaction.

---

## 📁 Project Structure

├── speech_to_text/ # Audio to text conversion
├── text_processing/ # Simplification and NLP
├── text_to_isl/ # Mapping text to sign videos
├── web_ui/ # Web interface (HTML/CSS/JS)
├── isl_dict.json # Dictionary of word-to-sign mappings
├── main.py # Project entry point
├── Roadmap.txt # Project goals and timeline
├── README.md # This file
└── archived_csharp/ # Archived prototype in C#


## 🚀 How to Run

1. Clone the repo:
   ```bash
    git clone https://github.com/AayushKulkarni36/ISL-translator.git
   cd ISL-translator
   
2.Install dependencies:  pip install -r requirements.txt
   
3.Run the app: python main.py

🔧 Tech Stack
Languages: Python, HTML, CSS, JavaScript
Libraries: speech_recognition, OpenCV, os, json



📌 Future Improvements
🔡 Add sentence-to-video generation

🌐 Host the app with Flask/Django

🧠 Integrate deep learning for sign prediction

📲 Build a mobile version
