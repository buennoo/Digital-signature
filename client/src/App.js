import React, { useState, useEffect } from 'react';
import './App.css';
import KeyLabel from './components/KeyLabel';
import InputField from './components/InputField';


function App() {
  return (
    <div className="App">
        <KeyLabel />
        <InputField />
    </div>
  );
}

export default App;
