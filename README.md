# ISL Voice-to-Sign Language Translator

This project is a **Voice-to-Indian Sign Language (ISL) Translator** that converts spoken input into corresponding sign language video animations. It is designed to aid communication for the deaf and hard-of-hearing community.

## 🚀 Live Demo

👉 [**Try the Live Demo**](https://AayushKulkarni36.github.io/ISL-translator/)


---

## 🔧 Features

-  Speech to Text using Web Speech API
-  Text simplification and processing
-  Word-to-Sign Mapping using ISL dictionary
-  Sign animation playback using smooth UI
-  React frontend + Flask backend
-  Light/Dark mode UI toggle
-  Multi-language input support (via Google Translate)

---

## 🧭 Project Structure

SL-translator/
├── app.py # Flask backend
├── isl_dict.json # ISL word-to-video mapping
├── static/ # Sign language videos
├── web_ui/
│ └── translator/translate.py # Word/video translator logic
├── isl-frontend/
│ ├── public/
│ └── src/
│ ├── App.js # Main React UI
│ └── App.css # Custom styling and animations
└── README.md


## 🚀 How to Run

### Prerequisites

- Python 3.x
- Flask(backend)
- NLP
- React,Node.js (for frontend)
- Git

### Backend Setup
```bash
cd ISL-translator
pip install -r requirements.txt
python app.py

### Frontend Setup
cd isl-frontend
npm install
npm start
```


# How It Works
1.Voice Input: The user speaks using the microphone.

2.Speech Recognition: Captured using Web Speech API.

3.Language Detection & Translation: If input is not English, it's translated using Google Translate.

4.Text Processing: Simplified text is split into words.

5.Mapping: Each word is checked in isl_dict.json.

6.Video Display: Corresponding sign language videos are played sequentially.


## Use Cases
-Education tools for deaf students

-Real-time communication assist

-Integration into classrooms or public services


# Screenshot:
![image](https://github.com/user-attachments/assets/64d39942-c079-4452-9b58-e32df87fda98)








## LICENSE

MIT License. Free to use and contribute!


🙋‍♂️ Author:
Aayush Kulkarni
Final Year IT Engineering Student

Connect(Linkedin): https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3B2dMBiY8EQuOgZxSPCJ3t3w%3D%3D




