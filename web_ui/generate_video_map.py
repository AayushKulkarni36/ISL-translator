import os
import json


base_dir = os.getcwd()


video_folder = os.path.join(base_dir, "web_ui", "static", "ISL_Vid")
print("Looking in:", video_folder)

video_map = {}

for filename in os.listdir(video_folder):
    if filename.endswith(".mp4"):
        word = os.path.splitext(filename)[0]
        video_path = os.path.join("static", "ISL_Vid", filename)
        video_map[word] = video_path


with open(os.path.join(base_dir, "isl_dict.json"), "w") as json_file:
    json.dump(video_map, json_file, indent=4)

print(" isl_dict.json created successfully.")
