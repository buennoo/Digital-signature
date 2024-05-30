import '../styles/KeyLabel.css';
import React, { useState, useEffect } from 'react';

function KeyLabel(){
    const [key, setKey] = useState("Loading...");

    useEffect(() => {
      const fetchPublicKey = async () => {
        try {
          const res = await fetch("/publickey");
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          console.log("Received public key:", data.public_key);
          setKey(data.public_key);
        } catch (error) {
          console.error("Error fetching public key:", error);
          setKey("Error fetching key");
        }
      };
      fetchPublicKey();
    }, []);
    

    return (
        <div>
            <div>Public Key: <pre>{key}</pre></div>
        </div>
    );
}

export default KeyLabel;