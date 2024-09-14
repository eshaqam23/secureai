import React, { useState } from 'react';
import './App.css';

import Logo from './Components/Logo';
import Home from './Components/Home';
import Demo from './Components/Demo';
import Team from './Components/Team.js';
import Resources from './Components/Resources';
import Footer from './Components/Footer.js';

function App() {
  const [tab, setTab] = useState("home");

  function handleHome () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
    setTab("home");
  }

  function handleDemo () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
    setTab("demo");
  }

  function handleTeam () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
    setTab("team");
  }

  function handleResources () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
    setTab("resources");
  }

  return (
    <div className="App">
      <header className="App-header">
        <div class="innerHeader">
          <Logo />
          <ul class="navigation">
            <li onClick={handleHome}>Home</li>
            <li onClick={handleDemo}>Demo</li>
            <li onClick={handleTeam}>Team</li>
            <li onClick={handleResources}>Resources</li>
          </ul>
        </div>
      </header>
      <main>
        {tab === "home" && <Home setTab={ setTab } />}
        {tab === "demo" && <Demo setTab={ setTab } />}
        {tab === "team" && <Team setTab={ setTab } />}
        {tab === "resources" && <Resources setTab={ setTab } />}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
