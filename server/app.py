# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from main import mainAgent
# from PIL import Image


# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# @app.route('/process', methods=['POST'])
# def process():
#     data = request.json
#     prompt = data.get("prompt")
#     img = data.get("img")
#     print(img, "JJJ")
#     if not prompt:
#         return jsonify({"error": "Prompt is required"}), 400
#     result = mainAgent(prompt, img)

#     return jsonify({"result": result})

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)

from flask import Flask, request, jsonify
from flask_cors import CORS
from main import mainAgent
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/process', methods=['POST'])
def process():
    # Get the form data (prompt) and file (img) from the request
    prompt = request.form.get("prompt")
    img = request.files.get("img")

    # Print the prompt and image file information
    # print(f"Prompt: {prompt}")
    if img:
        # print(f"Image received: {img.filename}")
        pass
    else:
        print("No image received")

    # If no prompt is provided, return an error
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    # If an image is provided, we can process it with PIL or send it to your mainAgent
    if img:
        img_data = img.read()  # Read the image file data
        img_pil = Image.open(io.BytesIO(img_data))  # Convert to PIL Image object
        # You can now process img_pil if needed

    # Call the mainAgent with the prompt (and image if needed)
    result = mainAgent(prompt, img)  # You can modify this to handle images as well

    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
