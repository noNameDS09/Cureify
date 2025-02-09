from flask import Flask, request, jsonify
from main import mainAgent

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    prompt = data.get("prompt")
    img = data.get("img")
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400
    result = mainAgent(prompt, img)
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
