
isl_dict = {
    "go": "sign_videos/go.mp4",
    "market": "sign_videos/market.mp4",
    "buy": "sign_videos/buy.mp4",
    "fruit": "sign_videos/fruit.mp4"
}

def map_to_isl(sign_words):
    signs = []
    for word in sign_words:
        if word in isl_dict:
            signs.append(isl_dict[word])
        else:
            print(f"Warning: No ISL sign found for '{word}'")
    return signs

if __name__ == "__main__":
    sample = ["go", "market", "buy", "mango"]
    result = map_to_isl(sample)
    print("Mapped signs:", result)
