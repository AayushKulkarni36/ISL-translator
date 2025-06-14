from googletrans import Translator

def translate_to_english(text, src_lang):
    translator = Translator()
    try:
        translated = translator.translate(text, src=src_lang, dest='en')
        return translated.text
    except Exception as e:
        print("Translation error:", e)
        return text  # fallback to original
