import React, { useState, useEffect } from 'react';
import './App.css';
import { Appointments } from './components/Appointments';

function App() {


  return (
    <main className="main">
      <div className='header'>
        <h1>Movemedical Scheduler</h1>
      </div>
      <Appointments/>
    </main>
  );
}

export default App;
