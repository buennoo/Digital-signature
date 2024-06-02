import '../styles/MainContainer.css';
import InteractiveSide from './InteractiveSide';
import KeysContainer from './KeysContainer';
import React, { useState } from 'react';

function MainContainer() {
    const [publicKey, setPublicKey] = useState('');
    const [loading, setLoading] = useState(false);

    const setThisKey = (newKey) => {
        // console.log("passing:",publicKey);
        setPublicKey(newKey);
    }

    const setLoadingStart = (startLoad) => {
        setLoading(startLoad);
    }

    return (
        <section className="main-container">
            <KeysContainer generatedKey={publicKey} generatedLoad={loading}/>
            <InteractiveSide getPublicKey={setThisKey} getLoading={setLoadingStart}/>
        </section>
    );
}

export default MainContainer;
