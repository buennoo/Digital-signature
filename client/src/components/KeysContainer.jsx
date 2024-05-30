import '../styles/KeysContainer.css';
import KeyLabel from './KeyLabel';
import React, { useState } from 'react';

function KeysContainer(){
    const [fetchKey, setFetchKey] = useState(null);

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
            <KeyLabel setFetchKey={setFetchKey} />
        </section>
    );
}

export default KeysContainer;