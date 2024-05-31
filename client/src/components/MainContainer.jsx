import '../styles/MainContainer.css';
import InteractiveSide from './InteractiveSide';
import KeysContainer from './KeysContainer';
import React, { useState } from 'react';

function MainContainer() {
    const [publicKey, setPublicKey] = useState('');

    return (
        <section className="main-container">
            <KeysContainer getPublicKey={publicKey} />
            <InteractiveSide setPublicKey={returnPublicKey} />
        </section>
    );
}

export default MainContainer;
