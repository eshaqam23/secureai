import React from 'react';

function Home ({ setTab }) {
    return (
        <div class="home">
            <div className="heading">
                <div className="posterImg"><img src="../../img/posterImg.png" alt="Consulting services" /></div>
                <div className="posterText">
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
                <div className="lock">
                    <img src="../../img/secureAI.png" alt="SecureAI Logo" />
                </div>
            </div>
        </div>
    );
}

export default Home;