import '../styles/MainContainer.css';
import InteractiveSide from './InteractiveSide';
import KeysContainer from './KeysContainer';

function MainContainer(){
    return (
        <section className="main-container">
            <KeysContainer />
            <InteractiveSide/>
        </section>
    );
}

export default MainContainer;