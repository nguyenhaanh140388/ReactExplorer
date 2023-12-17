import { useState } from 'react';
import { sculptureList } from './SculptureList';

export default function SculptureGallery(props) {

    const settings = {
        name: 'Sculpture Gallery',
        theme: {
            backgroundColor: '#EBDEF0',
            color: '#DC7633'
        }
    };

    const [currentNumber, setCurrentNumber] = useState(0);
    const [showMore, setShowMore] = useState('');

    let sculptureCurrent = sculptureList[currentNumber];

    function clickNext() {
        setCurrentNumber(currentNumber + 1);
    }

    function clickShowMore() {
        setShowMore(!showMore);
    }

    return (
        <section>
            {/* Pass value from parent to Clock component */}
            <h1 className="liner">{settings.name}</h1>
            <h5 >{props.componentName}</h5>
            <div style={settings.theme}>
                <button onClick={clickNext}>Next</button>
                <h6>{sculptureCurrent.name}</h6>
                <button onClick={clickShowMore}>{showMore ? 'Hide' : 'Show Detail'}</button>
                {showMore && <p>{sculptureCurrent.description}</p>}
                <img
                    src={sculptureCurrent.url}
                    alt={sculptureCurrent.alt}
                />
            </div>
        </section>
    );
}