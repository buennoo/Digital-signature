import '../styles/InteractiveSide.css';
import InputField from './InputField';

function InteractiveSide({ returnPublicKey }) {
    return (
        <section className="down-container">
            <InputField publicKey={ returnPublicKey } />
        </section>
    );
}

export default InteractiveSide;
