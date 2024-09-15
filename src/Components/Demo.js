import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Demo() {
    const [inputText, setInputText] = useState('');
    const [jbStatus, setJbStatus] = useState('Awaiting Action...');
    const [secStatus, setSecStatus] = useState('Awaiting Action...');
    const [chatbot1Messages, setChatbot1Messages] = useState([]);
    const [chatbot2Messages, setChatbot2Messages] = useState([]);
    const [adversarialString, setAdversarialString] = useState('');  // Store the adversarial string
    const [sanitizedString, setSanitizedString] = useState('');  // Store the sanitized string

    // Create refs to the answer divs instead of chatbot divs
    const chatbot1AnswerRef = useRef(null);
    const chatbot2AnswerRef = useRef(null);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Generate the adversarial string using nanoGCG
            setJbStatus('Generating attack string...');
            const adversarialResponse = await axios.post('http://127.0.0.1:5000/api/generate-adversarial', {
                prompt: inputText
            });

            const { adversarialString } = adversarialResponse.data;
            setAdversarialString(adversarialString);

            // Display the adversarial string as the user's input in the jailbroken chatbot
            setChatbot1Messages(prevMessages => [...prevMessages, { type: 'user', text: adversarialString }]);
            setJbStatus('Waiting for LLM response...');

            // Step 2: Run the adversarial string through the jailbroken model
            const modelResponse = await axios.post('http://127.0.0.1:5000/api/run-jailbroken-model', {
                adversarialString: adversarialString
            });

            const { jailbreakResponse } = modelResponse.data;

            // Display the jailbroken chatbot's response
            setChatbot1Messages(prevMessages => [
                ...prevMessages, 
                { type: 'ai', text: jailbreakResponse }
            ]);
            setJbStatus("Awaiting Action...");

            // Step 3: Start the Secure chatbot after Jailbroken chatbot finishes
            setSecStatus("Removing attack string from original prompt using our novel approach...");

            // Introduce a 10-second delay before sanitizing the input
            setTimeout(async () => {
                setSanitizedString(inputText);

                // Display the sanitized string (original prompt) as the user's input in the secure chatbot
                setChatbot2Messages(prevMessages => [...prevMessages, { type: 'user', text: inputText }]);

                // Step 4: Run the sanitized string through the secure model
                setSecStatus('Running the sanitized string through the secure model...');
                const secureModelResponse = await axios.post('http://127.0.0.1:5000/api/run-secure-model', {
                    sanitizedString: inputText
                });

                const { safeResponse } = secureModelResponse.data;

                // Display the secure chatbot's response
                setChatbot2Messages(prevMessages => [
                    ...prevMessages, 
                    { type: 'ai', text: safeResponse }
                ]);
                setSecStatus('Awaiting Action...');
            }, 10000); 

            setInputText('');

        } catch (error) {
            console.error('Error during pipeline execution:', error);
            setJbStatus('An error occurred.');
            setSecStatus('An error occurred.');
        }
    };

    // Automatically scroll to the bottom of chatbot1Messages inside the answer div
    useEffect(() => {
        if (chatbot1AnswerRef.current) {
            chatbot1AnswerRef.current.scrollTop = chatbot1AnswerRef.current.scrollHeight;
        }
    }, [chatbot1Messages]);

    // Automatically scroll to the bottom of chatbot2Messages inside the answer div
    useEffect(() => {
        if (chatbot2AnswerRef.current) {
            chatbot2AnswerRef.current.scrollTop = chatbot2AnswerRef.current.scrollHeight;
        }
    }, [chatbot2Messages]);

    return (
        <div className="demo">
            <h1>Demo</h1>
            <form onSubmit={handleSubmit} className="input-container">
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Enter malicious query here..."
                />
                {jbStatus === "Awaiting Action..." && secStatus === "Awaiting Action..." && <button type="submit">Send</button>}
            </form>
            <div className="chatbots">
                {/* Jailbroken Chatbot */}
                <div className="chatbot" id="bot1">
                    <h3>"Jailbroken" Chatbot</h3>
                    <div className="answer" ref={chatbot1AnswerRef}>
                        {chatbot1Messages.map((msg, index) => (
                            <div key={index} className={msg.type === 'user' ? 'user-message' : 'ai-message'}>
                                <strong>{msg.type === 'user' ? 'User:' : 'AI:'}</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="query">
                        <p>Status: {jbStatus}</p>
                        {jbStatus !== "Awaiting Action..." && <div class="loader"></div>}
                    </div>
                </div>

                {/* Secure Chatbot */}
                <div className="chatbot" id="bot2">
                    <h3>Secure Chatbot</h3>
                    <div className="answer" ref={chatbot2AnswerRef}>
                        {chatbot2Messages.map((msg, index) => (
                            <div key={index} className={msg.type === 'user' ? 'user-message' : 'ai-message'}>
                                <strong>{msg.type === 'user' ? 'User:' : 'AI:'}</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="query">
                        <p>Status: {secStatus}</p>
                        {secStatus !== "Awaiting Action..." && <div class="loader"></div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Demo;
