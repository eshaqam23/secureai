import React, { useState } from 'react';
import axios from 'axios';  // Import axios to make API requests

function Demo() {
    const [inputText, setInputText] = useState('');
    const [status, setStatus] = useState('Awaiting Action...')
    const [chatbot1Messages, setChatbot1Messages] = useState([]);
    const [chatbot2Messages, setChatbot2Messages] = useState([]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make the POST request to the backend
            const response = await axios.post('http://127.0.0.1:5000/api/run-pipelines', {
                prompt: inputText
            });

            // Extract the responses for both chatbots
            const { adversarialString, jailbreakResponse, safeResponse } = response.data;

            // Update chatbot1 (Jailbreaked Chatbot) messages
            setChatbot1Messages([
                ...chatbot1Messages, 
                { type: 'user', text: adversarialString }, 
                { type: 'ai', text: jailbreakResponse }
            ]);

            // Update chatbot2 (Secure Chatbot) messages
            setChatbot2Messages([
                ...chatbot2Messages, 
                { type: 'user', text: adversarialString }, 
                { type: 'ai', text: safeResponse }
            ]);

            // Clear the input field
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
                {/* Jailbreaked Chatbot */}
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
                        <p>Status: {status}</p>
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
                        <p>Status: {status}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Demo;
