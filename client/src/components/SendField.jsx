import React, { useState } from 'react';
import '../styles/SendField.css';
import { RxCheck } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

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
      <div className='check'>
        <button className="submit-button" disabled={!file1 || !file2 || !publicKey} onClick={handleVerify}>
          Verify
        </button>
        <div>
          {verificationResult !== null && (
            <div>{verificationResult ? <RxCheck/> : <RxCross2 />}</div>
          )}
        </div>
        </div>
    </div>
  );
}

export default SendField;