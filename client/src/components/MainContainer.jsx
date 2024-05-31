import '../styles/MainContainer.css';
import InteractiveSide from './InteractiveSide';
import KeysContainer from './KeysContainer';
import React, { useState } from 'react';

function MainContainer() {
    const [publicKey, setPublicKey] = useState('');

    const setThisKey = (newKey) => {
        // console.log("passing:",publicKey);
        setPublicKey(newKey);
    }

    return (
        <section className="main-container">
            <KeysContainer generatedKey={publicKey} />
            <InteractiveSide getPublicKey={setThisKey} />
        </section>
    );
}

export default MainContainer;
