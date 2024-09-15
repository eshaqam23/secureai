import React, { useState } from 'react';
import axios from 'axios';

function Demo() {
    const [inputText, setInputText] = useState('');
    const [jbStatus, setJbStatus] = useState('Awaiting Action...');
    const [secStatus, setSecStatus] = useState('Awaiting Action...');
    const [chatbot1Messages, setChatbot1Messages] = useState([]);
    const [chatbot2Messages, setChatbot2Messages] = useState([]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Generate Adversarial String for Jailbroken chatbot
            setJbStatus("Generating Adversarial String...");
            const advResponse = await axios.post('http://127.0.0.1:5000/api/generate-adv', {
                prompt: inputText
            });

            const adversarialString = advResponse.data.adversarialString;
            setChatbot1Messages([...chatbot1Messages, { type: 'user', text: adversarialString }]);
            setJbStatus("Awaiting LLM response...");

            // Step 2: Run LLM for Jailbroken chatbot
            const llmResponse = await axios.post('http://127.0.0.1:5000/api/run-llm', {
                prompt: adversarialString
            });

            setChatbot1Messages(prevMessages => [
                ...prevMessages,
                { type: 'ai', text: llmResponse.data.llmResponse }
            ]);
            setJbStatus("Awaiting Action...");

            // Step 3: Start the Secure chatbot after Jailbroken chatbot finishes
            setSecStatus("Removing adversarial string using novel approach...");
            const sanitizeResponse = await axios.post('http://127.0.0.1:5000/api/sanitize', {
                inputText: adversarialString
            });

            const sanitizedString = sanitizeResponse.data.sanitizedString;
            setChatbot2Messages([...chatbot2Messages, { type: 'user', text: sanitizedString }]);
            setSecStatus("Awaiting LLM response...");

            // Step 4: Run LLM for Secure chatbot
            const secureLlmResponse = await axios.post('http://127.0.0.1:5000/api/run-llm', {
                prompt: sanitizedString
            });

            setChatbot2Messages(prevMessages => [
                ...prevMessages,
                { type: 'ai', text: secureLlmResponse.data.llmResponse }
            ]);
            setSecStatus("Awaiting Action...");

            // Clear input field
            setInputText('');

        } catch (error) {
            console.error('Error fetching chatbot responses:', error);
        }
    };

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
                <button type="submit">Send</button>
            </form>
            <div className="chatbots">
                {/* Jailbroken Chatbot */}
                <div className="chatbot" id="bot1">
                    <h3>"Jailbroken" Chatbot</h3>
                    <div className="answer">
                        {chatbot1Messages.map((msg, index) => (
                            <div key={index} className={msg.type === 'user' ? 'user-message' : 'ai-message'}>
                                <strong>{msg.type === 'user' ? 'User:' : 'AI:'}</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="query">
                        <p>Status: {jbStatus}</p>
                    </div>
                </div>

                {/* Secure Chatbot */}
                <div className="chatbot" id="bot2">
                    <h3>Secure Chatbot</h3>
                    <div className="answer">
                        {chatbot2Messages.map((msg, index) => (
                            <div key={index} className={msg.type === 'user' ? 'user-message' : 'ai-message'}>
                                <strong>{msg.type === 'user' ? 'User:' : 'AI:'}</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="query">
                        <p>Status: {secStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Demo;
