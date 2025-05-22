import speech_recognition as sr

def recognize_speech_from_mic():
    recognizer = sr.Recognizer()
    mic = sr.Microphone()

    with mic as source:
        print("Adjusting for ambient noise...")
        recognizer.adjust_for_ambient_noise(source)
        print("Listening... Speak now.")
        audio = recognizer.listen(source)

    try:
        print("Recognizing...")
        text = recognizer.recognize_google(audio)
        print(f"You said: {text}")
        return text
    except sr.UnknownValueError:
        print("Sorry, could not understand the audio.")
    except sr.RequestError as e:
        print(f"Could not request results; {e}")

if __name__ == "__main__":
    recognize_speech_from_mic()
 