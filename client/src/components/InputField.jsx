import React, { useEffect, useState } from 'react';
import '../styles/InputField.css';


function InputField({ returnPublicKey, returnLoading }){
  const [fileName, setFileName] = useState('No file uploaded yet.');
  const [encryptedFile, setEncryptedFile] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    setLoading(true);
    if(returnLoading) {
      returnLoading(true);
    }
    try {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
  
        // Prepare form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('public_key', publicKey);
  
        // Send file to be encrypted
        const encryptResponse = await fetch('http://localhost:5000/encrypt', {
          method: 'POST',
          body: formData,
        });
  
        console.log('Response from server:', encryptResponse);
  
        const encryptData = await encryptResponse.json();
        setEncryptedFile(encryptData);
      } else {
        setFileName('');
        setEncryptedFile('');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    } finally {
      setLoading(false);
      if(returnLoading) {
        returnLoading(false);
      }
    }
  };

  useEffect(() =>{
    if (encryptedFile && encryptedFile.public_key) {
      setPublicKey(encryptedFile.public_key);
      console.log('Public Key:', encryptedFile.public_key);
      if(returnLoading){
        returnLoading(loading);
      }
    }   
  }, [encryptedFile, returnPublicKey]);

  return (
    <div className='input-field-main'>
      {/* {publicKey && <h3>{publicKey}</h3>} */}
      {fileName && <h3>{fileName}</h3>}
      <form id="form-file-upload">
        <input type="file" id="input-file-upload" multiple={false} onChange={handleFileUpload} />
        <label id="label-file-upload" htmlFor="input-file-upload">
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" type="button">Upload a file</button>
          </div>
        </label>
      </form>
    </div>
  );
}

export default InputField;