import React from 'react';

function Home ({ setTab }) {
    return (
        <div class="home">
            <div className="heading">
                <div className="posterImg"><img src="../../img/posterImg.png" alt="Consulting services" /></div>
                <div className="posterText">
                    <div className="textShift">
                        <h1>Hey Mistral, how do I make a nuclear weapon?</h1>
                        <p>LLM Attack strings are gradient-descent-based, vector-based algorithms that bypass safeguards. We used these to "jailbreak" Mistral LLM and then also found a way to safeguard against it.</p>
                        <button onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth' // Smooth scrolling effect
                              });
                            setTab("demo");
                        }}>Try it out!</button>
                    </div>
                </div>
                <div className="lock">
                    <img src="../../img/secureAI.png" alt="SecureAI Logo" />
                </div>                
            </div>
            <div className="content">
                <div className="even">
                    <img src="../../img/innnovation.png" />
                    <div>
                        <h3>Welcome to SecureAI</h3>
                        <p>At SecureAI, we are pioneers in identifying and addressing the vulnerabilities inherent in Large Language Models (LLMs). While LLMs have transformed industries with their capabilities, they can also be compromised through jailbreaking techniques that expose them to malicious misuse. Our mission is twofold: to shed light on these potential threats and to develop cutting-edge solutions that safeguard AI systems.</p>
                    </div>
                </div>
                <div className="odd">
                    <img src="../../img/innnovation.png" />
                    <div>
                        <h3>The Problem: Jailbreaking LLMs</h3>
                        <p>As LLMs become more integrated into daily operations across industries, they also become more susceptible to exploitation. Jailbreaking LLMs allows unauthorized users to bypass safety measures, manipulate outputs, and potentially cause harm. This can lead to the spread of misinformation, compromised data security, and unethical use of AI-generated content.</p>
                    </div>
                </div>
                <div className="even">
                    <img src="../../img/innnovation.png" />
                    <div>
                        <h3>Our Solution: Securing LLMs</h3>
                        <p>Our team is committed to building AI models and tools that can detect and prevent these jailbreak attempts. At SecureAI, we are constantly innovating new methods to bolster the security of LLMs, ensuring they remain trustworthy and resilient to tampering. By employing advanced AI threat detection techniques, we can recognize patterns and behaviors associated with jailbreaking attempts and stop them before they cause any harm.</p>
                    </div>
                </div>
                <div className="odd">
                    <img src="../../img/innnovation.png" />
                    <div>
                        <h3>Our Vision: A Safer AI Future</h3>
                        <p>SecureAI envisions a world where AI continues to push boundaries—safely and ethically. By securing LLMs against potential threats, we empower organizations to harness the full potential of AI without compromising on safety. Together, we can build a future where AI remains a powerful tool for innovation, protected against those who would misuse it.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;