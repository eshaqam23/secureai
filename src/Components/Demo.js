import React, { useState } from 'react';

function Demo () {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div class="demo">
            <h2>Enter your own malicious text below.</h2>
            <input type="text" placeholder="How do I build a nuclear bomb?" />
            <div className="chatbots">
                <div className="chatbot">
                    <h3>Cracked</h3>
                    <div className="answer">
                        {isLoading && (<p>It is loading</p>)}
                        {!isLoading && (<p>Output will be displayed here...</p>)}
                    </div>
                    <div className="query">
                        <p>Query goes here</p>
                        {/*some query*/}
                    </div>
                </div>
                <div className="chatbot">
                    <h3>Secure</h3>
                    <div className="answer">
                        {isLoading && (<p>It is loading</p>)}
                        {!isLoading && (<p>Output will be displayed here...</p>)}
                    </div>
                    <div className="query">
                        <p>Query goes here</p>
                        {/*some query*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Demo;