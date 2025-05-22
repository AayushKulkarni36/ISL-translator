from speech_to_text.recognize_speech import recognize_from_mic
from text_processing.simplify_text import simplify_text
from text_to_isl.map_to_signs import map_to_isl

def main():
    print("🎙 Starting speech recognition...")
    text = recognize_from_mic()

    if text:
        print(f" Recognized text: {text}")
        
        # Text simplification
        simplified = simplify_text(text)
        print(f" Simplified words: {simplified}")

        # Map to ISL signs
        sign_paths = map_to_isl(simplified)
        print(" Mapped ISL signs (placeholder paths):")
        for path in sign_paths:
            print(f" - {path}")
    else:
        print(" No recognizable speech detected.")

if __name__ == "__main__":
    main()
