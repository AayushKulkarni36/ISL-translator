import speech_recognition as sr

def recognize_from_mic():
    recognizer = sr.Recognizer()
    
    with sr.Microphone() as source:
        print("Speak something...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio)
        print("You said:", text)
        return text
    except sr.UnknownValueError:
        print("Could not understand audio.")
        return ""
    except sr.RequestError:
        print("API unavailable or request error.")
        return ""
