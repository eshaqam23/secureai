import React, { useState } from 'react';
import './App.css';

import Logo from './Components/Logo';
import Home from './Components/Home';
import Demo from './Components/Demo';
import Team from './Components/Team.js';
import Resources from './Components/Resources';

function App() {
  const [tab, setTab] = useState("home");

  function handleHome () {
    setTab("home");
  }

  function handleDemo () {
    setTab("demo");
  }

  function handleTeam () {
    setTab("team");
  }

  function handleResources () {
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
        {tab === "home" && <Home />}
        {tab === "demo" && <Demo />}
        {tab === "team" && <Team />}
        {tab === "resources" && <Resources />}
      </main>
    </div>
  );
}

export default App;
