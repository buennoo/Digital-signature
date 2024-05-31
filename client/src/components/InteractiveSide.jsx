import '../styles/InteractiveSide.css';
import InputField from './InputField';
import SendField from './VerifyField';

function InteractiveSide({ getPublicKey }) {

    return (
        <section className="down-container">
            <InputField returnPublicKey={ getPublicKey } />
            <SendField />
        </section>
    );
}

export default InteractiveSide;
