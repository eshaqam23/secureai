from flask import Flask, request, jsonify
from flask_cors import CORS
from pipeline import adv_pipeline, cleaned_pipeline

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/api/run-pipelines', methods=['POST'])
def run_pipelines():
    data = request.get_json()
    prompt = data.get('prompt', '')

    model_name = 'mistral'  # Placeholder model
    target = 'malicious'  # Placeholder target

    # Run the adversarial pipeline
    adversarial_string, jailbreak_output = adv_pipeline(model_name, prompt, target)

    # Run the cleaned pipeline
    _, safe_output = cleaned_pipeline(model_name, adversarial_string)

    # Return both responses
    return jsonify({
        'adversarialString': adversarial_string,
        'jailbreakResponse': jailbreak_output,
        'safeResponse': safe_output
    })

if __name__ == '__main__':
    app.run(debug=True)
