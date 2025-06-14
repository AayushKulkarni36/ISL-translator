import json

# Load your dictionary
with open("isl_dict.json", "r") as f:
    data = json.load(f)

# Fix paths
fixed_data = {}
for key, path in data.items():
    # Remove leading 'static\\' or 'static/'
    path = path.replace("static\\", "").replace("static/", "")
    # Normalize slashes
    path = path.replace("\\", "/")
    fixed_data[key] = path

# Save the cleaned file back
with open("isl_dict.json", "w") as f:
    json.dump(fixed_data, f, indent=4)

print(" isl_dict.json paths cleaned successfully!")
