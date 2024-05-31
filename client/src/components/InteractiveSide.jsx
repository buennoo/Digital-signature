import '../styles/InteractiveSide.css';
import InputField from './InputField';

function InteractiveSide({ publicKey }) {
    return (
        <section className="down-container">
            <InputField publicKey={publicKey} />
        </section>
    );
}

export default InteractiveSide;
