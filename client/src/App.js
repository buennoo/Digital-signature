import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer';


function App() {
  return (
    <div className="App">
      <Header/>
      <MainContainer/>
    </div>
  );
}

export default App;
