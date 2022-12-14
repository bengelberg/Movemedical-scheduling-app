import React, { useState, useEffect } from 'react';
import './App.css';
import { Appointments } from './components/Appointments';
import logo from './assets/logo.png'

function App() {
  return (
    <main className="main">
      <div className='header'>
        <img src={logo} alt='logo' height='70px' id="main-logo" />
        <h1>Schedulize</h1>
      </div>
      <Appointments />
    </main>
  );
}

export default App;
