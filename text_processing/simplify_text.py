import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('stopwords')
nltk.download('wordnet')

def simplify_text(text):
    # Lowercase
    text = text.lower()

    # Tokenize
    tokens = word_tokenize(text)

    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words]

    # Lemmatize
    lemmatizer = WordNetLemmatizer()
    simplified = [lemmatizer.lemmatize(word) for word in filtered_tokens]

    return simplified

if __name__ == "__main__":
    sample = "I am going to the market to buy some fruits."
    simplified = simplify_text(sample)
    print("Simplified:", simplified)
