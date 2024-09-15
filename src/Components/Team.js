import React from 'react';

function Team () {
    return (
        <div class="team">
            <h1>Team</h1>
            <div className="members">
                <div className="member">
                    <img src="../../img/matthew.jpg" alt="Matthew Nguyen" />
                    <h2>Matthew Nguyen</h2>
                    <p>Back-End Engineer</p>
                </div>
                <div className="member">
                    <img src="../../img/saad.jpeg" alt="Saad Fayyaz" />
                    <h2>Saad Fayyaz</h2>
                    <p>Full-Stack Engineer</p>
                </div>
                <div className="member">
                    <img src="../../img/chen.jpg" alt="Chen Hwang" />
                    <h2>Chen Hwang</h2>
                    <p>Back-End Engineer</p>
                </div>
                <div className="member">
                    <img src="../../img/adam.jpg" alt="Adam Eshaq" />
                    <h2>Adam Eshaq</h2>
                    <p>Front-End Engineer</p>
                </div>
            </div>
        </div>
    );
}

export default Team;