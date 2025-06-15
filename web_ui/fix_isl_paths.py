import json


with open("isl_dict.json", "r") as f:
    data = json.load(f)


fixed_data = {}
for key, path in data.items():

    path = path.replace("static\\", "").replace("static/", "")

    path = path.replace("\\", "/")
    fixed_data[key] = path


with open("isl_dict.json", "w") as f:
    json.dump(fixed_data, f, indent=4)

print(" isl_dict.json paths cleaned successfully!")
