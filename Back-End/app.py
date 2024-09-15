from flask import Flask, request, jsonify
from flask_cors import CORS
from time import sleep

app = Flask(__name__)
CORS(app)

# Simulate GCG model (adversarial string generation)
@app.route('/api/generate-adv', methods=['POST'])
def generate_adv():
    data = request.get_json()
    prompt = data.get('prompt', '')
    
    adversarial_string = f"{prompt} [Appended: Malicious String]"
    sleep(10)  # Simulating a delay
    return jsonify({
        'adversarialString': adversarial_string
    })

# Simulate LLM (Jailbroken Chatbot response)
@app.route('/api/run-llm', methods=['POST'])
def run_llm():
    data = request.get_json()
    prompt = data.get('prompt', '')
    
    model_output = f"LLM output based on the prompt: {prompt}"
    sleep(10)  # Simulating a delay
    return jsonify({
        'llmResponse': model_output
    })

# Simulate sanitizing input (Secure Chatbot sanitization)
@app.route('/api/sanitize', methods=['POST'])
def sanitize_input():
    data = request.get_json()
    input_text = data.get('inputText', '')
    
    sanitized_string = input_text.replace("[Appended: Malicious String]", "")
    sleep(14)  # Simulating a delay
    return jsonify({
        'sanitizedString': sanitized_string
    })

if __name__ == '__main__':
    app.run(debug=True)
