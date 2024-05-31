import React, { useState } from 'react';
import '../styles/VerifyField.css';

function SendField() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [publicKey, setPublicKey] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  function handleFile1Change(e) {
    setFile1(e.target.files[0]);
  }

  function handleFile2Change(e) {
    setFile2(e.target.files[0]);
  }

  function handlePublicKeyChange(e) {
    setPublicKey(e.target.value);
  }

  async function handleVerify() {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);
    formData.append('publicKey', publicKey);

    const response = await fetch('/verify', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setVerificationResult(data.verified);
  }

  return (
    <div className="send-file-container">
      <div className="file-input">
        <label htmlFor="file1">Choose file for verification:</label>
        <input type="file" id="file1" onChange={handleFile1Change} />
      </div>
      <div className="file-input">
        <label htmlFor="file2">Choose signature:</label>
        <input type="file" id="file2" onChange={handleFile2Change} />
      </div>
      <div className="public-key-input">
        <label htmlFor="publicKey">Enter Public Key:</label>
        <div className="textarea-container">
          <textarea id="publicKey" value={publicKey} onChange={handlePublicKeyChange} rows="1" />
        </div>
      </div>
      <button className="submit-button" disabled={!file1 || !file2 || !publicKey} onClick={handleVerify}>
        Verify
      </button>
      {verificationResult !== null && (
        <div>{verificationResult ? 'Signature verified' : 'Signature does not match'}</div>
      )}
    </div>
  );
}

export default SendField;