import '../styles/InteractiveSide.css';
import InputField from './InputField';

function InteractiveSide({ getPublicKey }) {

    
    return (
        <section className="down-container">
            <InputField returnPublicKey={ getPublicKey } />
        </section>
    );
}

export default InteractiveSide;
