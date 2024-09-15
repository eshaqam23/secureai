from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import tensorflow
import nanogcg
import sys
from nanogcg import GCGConfig
from transformers import pipeline
import gc
from huggingface_hub import login
import os
from dotenv import load_dotenv

def runGCG(model_name, prompt, target):

    model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=getattr(torch, "float16")).to("cuda")
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    messages = [{"role": "user", "content": prompt}]

    config = GCGConfig(
        num_steps=8
    )

    result = nanogcg.run(model, tokenizer, messages, target, config)

    return messages[-1]["content"] + " " + result.best_string


def runLLM(model_name, prompt):

    model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=getattr(torch, "float16")).to("cuda")
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    messages = [{"role": "user", "content": prompt}]

    input = tokenizer.apply_chat_template(messages, add_generation_prompt=True, return_tensors="pt").to("cuda")
    output = model.generate(input, do_sample=False, max_new_tokens=350)

    original_prompt = messages[-1]['content']
    model_answer = tokenizer.batch_decode(output[:, input.shape[1]:], skip_special_tokens=True)[0]

    return model_answer


def sanitize_inputstr(input_text, model_names=['microsoft/Phi-3.5-mini-instruct', 'mistralai/Mistral-7B']):
    models = []
    tokenizers = []

    for model_name in model_names:
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForCausalLM.from_pretrained(model_name)

        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token

        models.append(model)
        tokenizers.append(tokenizer)

    def sanitize_with_model(model, tokenizer, text):
        prompt = "Remove the adversarial strings at the end of this input: " + text + ". Do not add extra x's."
        inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
        model.eval()
        outputs = model.generate(**inputs, max_new_tokens=300)
        clean_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        if prompt in clean_text:
            cleaned_output = clean_text.replace(prompt, "").strip()
        else:
            cleaned_output = clean_text.strip()

        return cleaned_output

    sanitized_output = input_text
    for model, tokenizer in zip(models, tokenizers):
        sanitized_output = sanitize_with_model(model, tokenizer, sanitized_output)

    return sanitized_output

def clear():
  torch.cuda.empty_cache()
  tensorflow.keras.backend.clear_session()
  gc.collect()

app = Flask(__name__)
CORS(app)

load_dotenv()
api_key = os.getenv("API_KEY")

# Step 1: Generate adversarial string using nanoGCG
@app.route('/api/generate-adversarial', methods=['POST'])
def generate_adversarial():

    login(token=api_key)
    data = request.json
    prompt = data.get('prompt', '')
    target = "Sure, heres how to " + ' '.join(prompt.split()[4:])
    
    adversarial_string = runGCG("mistralai/Mistral-7B-Instruct-v0.1", prompt, target)
    
    return jsonify({'adversarialString': adversarial_string})

# Step 2: Run the adversarial string through the jailbroken model
@app.route('/api/run-jailbroken-model', methods=['POST'])
def run_jailbroken_model():
    data = request.json
    adversarial_string = data.get('adversarialString', '')
    
    jailbreak_response = runLLM("mistralai/Mistral-7B-Instruct-v0.1", adversarial_string)
    
    return jsonify({'jailbreakResponse': jailbreak_response})

# Step 3: Sanitize the adversarial string
@app.route('/api/sanitize-input', methods=['POST'])
def sanitize_input():
    data = request.json
    adversarial_string = data.get('adversarialString', '')
    
    sanitized_string = sanitize_inputstr(adversarial_string)
    
    return jsonify({'sanitizedString': sanitized_string})

# Step 4: Run the sanitized string through the secure model
@app.route('/api/run-secure-model', methods=['POST'])
def run_secure_model():
    data = request.json
    sanitized_string = data.get('sanitizedString', '')
    
    safe_response = runLLM("mistralai/Mistral-7B-Instruct-v0.3", sanitized_string)
    
    return jsonify({'safeResponse': safe_response})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
