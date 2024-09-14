import React, { useState } from 'react';
import Logo from './Components/Logo';
import './App.css';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <div class="innerHeader">
          <Logo />
          <ul class="navigation">
            <li>Home</li>
            <li>Demo</li>
            <li>Team</li>
            <li>Resources</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
