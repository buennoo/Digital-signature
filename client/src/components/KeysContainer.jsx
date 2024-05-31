import '../styles/KeysContainer.css';
import KeyLabel from './KeyLabel';
import React, { useEffect, useState } from 'react';

function KeysContainer({ generatedKey }) {
    const [fetchKey, setFetchKey] = useState(null);
    const [publicKey, setPublicKey] = useState('')

    const handleGenerateKey = (keyType) => {
        if (fetchKey) {
            fetchKey(keyType);
        }
    };

    return (
        <section className='keys-container'>
            <div className='generate-buttons'>
                <button onClick={() => handleGenerateKey('Public')}>
                    Generate Public Key
                </button>
                <button onClick={() => handleGenerateKey('Private')}>
                    Generate Private Key
                </button>
            </div>
            <KeyLabel setFetchKey={setFetchKey} generatedKey={generatedKey} />
        </section>
    );
}

export default KeysContainer;
