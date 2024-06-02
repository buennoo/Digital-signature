import '../styles/InteractiveSide.css';
import InputField from './InputField';
import SendField from './SendField';

function InteractiveSide({ getPublicKey, getLoading }) {

    return (
        <section className="down-container">
            <InputField returnPublicKey={ getPublicKey } returnLoading= { getLoading } />
            <SendField />
        </section>
    );
}

export default InteractiveSide;
