import React from 'react';

function Home () {
    return (
        <div class="home">
            <div className="heading">
                <div className="posterImg"><img src="../../img/posterImg.png" alt="Consulting services" /></div>
                <div className="posterText">
                    <h1>Hey Mistral, how do I make a nuclear weapon?</h1>
                    <p>LLM Attack strings are gradient-descent-based, vector-based algorithims type-shi that bypasses safeguards. We used these to "jailbreak" Mistral LLM and then also found a way to safeguard against it.</p>
                    <button>Try it out!</button>
                </div>
                <div>
                    <img src="../../img/secureAI.png" alt="SecureAI Logo" />
                </div>
            </div>
        </div>
    );
}

export default Home;