import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/hello")
    .then(res => res.json())
    .then(data => {
      setData(data);
      console.log(data);
    })
    .catch(error => {
      console.error("error: ", error);
    })
  })

  return (
    <div className="App">
      { data === null ? (
        <p>Loading...</p>
      ) : (
        data.hello.map((element, index) => (
          <p key={index}>{element}</p>
        ))
      )}
    </div>
  );
}

export default App;
