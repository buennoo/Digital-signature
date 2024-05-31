import '../styles/KeysContainer.css';
import KeyLabel from './KeyLabel';
import React, { useState } from 'react';
import axios from 'axios';

function KeysContainer({ generatedKey }) {
    const [fetchKey, setFetchKey] = useState(null);

    const handleGenerateKey = (keyType) => {
        if (fetchKey) {
            fetchKey(keyType);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get('/download-folder', {
                responseType: 'blob' // ważne dla odpowiedzi binarnej
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'res.zip'); // nazwa pliku ZIP
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Błąd pobierania folderu:', error);
        }
    };

    return (
        <section className='keys-container'>
            <div className='generate-buttons'>
                <button className="submit-button" onClick={() => handleGenerateKey('Public')}>
                    Generate Public Key
                </button>
                <button className="submit-button" onClick={() => handleDownload()}>
                    Download files
                </button>
            </div>
            <KeyLabel setFetchKey={setFetchKey} generatedKey={generatedKey} />
        </section>
    );
}

export default KeysContainer;
