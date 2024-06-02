import '../styles/KeyLabel.css';
import React, { useState, useEffect } from 'react';

function KeyLabel({ setFetchKey, generatedKey, generatedLoad }){
  const [key, setKey] = useState("No key generated yet.");
  const [loading, setLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const fetchPublicKey = async () => {
    setLoading(true);
    setIsButtonClicked(true);
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
    } finally {
        setLoading(false);
    }
  };

  const fetchPrivateKey = async () => {
    setLoading(true);
    setIsButtonClicked(true);
    try {
        const res = await fetch("/privatekey");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Received public key:", data.private_key);
        setKey(data.private_key);
    } catch (error) {
        console.error("Error fetching public key:", error);
        setKey("Error fetching key");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
      setFetchKey(() => (keyType) => {
          if (keyType === 'Public') {
              fetchPublicKey();
          }
          if (keyType === 'Private'){
              fetchPrivateKey();
          }

      });
  }, [setFetchKey]);

  useEffect(() => {
    setKey(generatedKey);
    console.log("passing last:", generatedKey);
  }, [generatedKey]);

  useEffect(() => {
    setLoading(generatedLoad);
    console.log("passing loading:", generatedLoad);
  }, [generatedLoad]);

    return (
      <div className='key-container'>
      <div className='title-key-container'>
          Public Key:
      </div>
      <div>
          {isButtonClicked || generatedKey  ? (
              loading ? (
                  <div className='loading-spinner'></div>
              ) : (
                  <textarea id="public-key-text"
                      value={key}
                      readOnly
                      rows={2}
                      className='key-textarea'
                  />
              )
          ) : (
              <p>No key generated yet.</p>
          )}
      </div>
    </div>
    );
}

export default KeyLabel;