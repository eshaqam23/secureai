import React, { useState } from 'react';

function Demo() {
    const [inputText, setInputText] = useState('');
    const [chatbot1Messages, setChatbot1Messages] = useState([]);
    const [chatbot2Messages, setChatbot2Messages] = useState([]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Hardcoded string to append
        const maliciousString = ' [Appended: Malicious String]';
        
        // Hardcoded responses
        const chatbot1Response = 'Chatbot 1 response to the malicious query.';
        const chatbot2Response = 'Chatbot 2 response to the malicious query.';

        // Append the string to inputText and show in both chatbots
        const modifiedInput = inputText + maliciousString;

        // Add user and AI messages to both chatbots
        setChatbot1Messages([...chatbot1Messages, { type: 'user', text: modifiedInput }, { type: 'ai', text: chatbot1Response }]);
        setChatbot2Messages([...chatbot2Messages, { type: 'user', text: modifiedInput }, { type: 'ai', text: chatbot2Response }]);

        // Clear the input field
        setInputText('');
    };

    return (
        <div className="demo">
            <h1>Demo</h1>
            {/* Wrap input and button in a div with className input-container */}
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
                <div className="chatbot" id="bot1">
                    <h3>"Jailbreaked" Chatbot</h3>
                    <div className="answer">
                        {chatbot1Messages.map((msg, index) => (
                            <div key={index} className={msg.type === 'user' ? 'user-message' : 'ai-message'}>
                                <strong>{msg.type === 'user' ? 'User:' : 'AI:'}</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatbot" id="bot2">
                    <h3>Secure Chatbot</h3>
                    <div className="answer">
                        {chatbot2Messages.map((msg, index) => (
                            <div key={index} className={msg.type === 'user' ? 'user-message' : 'ai-message'}>
                                <strong>{msg.type === 'user' ? 'User:' : 'AI:'}</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Demo;
