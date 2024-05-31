import '../styles/KeysContainer.css';
import KeyLabel from './KeyLabel';
import React, { useState } from 'react';

function KeysContainer({ getPublicKey }) {
    const [fetchKey, setFetchKey] = useState(null);

    const handleGenerateKey = (keyType) => {
        if (fetchKey) {
            fetchKey(keyType);
        }
    };

    const handleKeyGenerated = (generatedKey) => {
        getPublicKey(generatedKey);
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
            <KeyLabel setFetchKey={setFetchKey} onKeyGenerated={handleKeyGenerated} />
        </section>
    );
}

export default KeysContainer;
