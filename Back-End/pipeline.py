# pipeline.py

def runGCG(model_name, prompt, target):
    """
    Generates an adversarial string based on the input prompt and target model.
    Placeholder functionality: Returns a hardcoded adversarial string for now.
    """
    adversarial_string = f"{prompt} [Appended: Malicious String]"
    return adversarial_string


def runLLM(model_name, prompt):
    """
    Runs the given LLM (e.g., Mistral) with the provided prompt.
    Placeholder functionality: Returns a hardcoded response for now.
    """
    model_output = "LLM output based on the given prompt"
    return prompt, model_output


def sanitize_input(input_text, model_name='microsoft/Phi-3.5-mini-instruct'):
    """
    Sanitizes the input to remove any adversarial strings or malicious content.
    Placeholder functionality: Returns a cleaned version of the input.
    """
    cleaned_output = input_text.replace("[Appended: Malicious String]", "")
    return cleaned_output


def adv_pipeline(model, prompt, target):
    """
    Runs the adversarial pipeline:
    1. Generates an adversarial string using runGCG.
    2. Runs the LLM with the adversarial string.
    """
    adversarial_string = runGCG(model, prompt, target)
    print("Clearing previous state...")  # Placeholder for actual cleanup
    
    original_prompt, model_output = runLLM(model, adversarial_string)
    print("Clearing after execution...")  # Placeholder for memory management
    
    return original_prompt, model_output


def cleaned_pipeline(model, adversarial_string):
    """
    Runs the cleaned pipeline:
    1. Sanitizes the adversarial string using sanitize_input.
    2. Runs the LLM with the cleaned string.
    """
    cleaned_output = sanitize_input(adversarial_string)
    print("Clearing previous state...")  # Placeholder
    
    original_prompt, model_output = runLLM(model, cleaned_output)
    print("Clearing after execution...")  # Placeholder
    
    return original_prompt, model_output
