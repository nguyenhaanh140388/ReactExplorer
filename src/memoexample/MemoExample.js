import React, { Fragment, createContext, memo, useContext, useState } from "react";
import './MenoExample.css';

const ThemeContext = createContext(null);

export default function MemoExample() {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [theme, setTheme] = useState('Purple');


    function handlerChangeColor() {
        setTheme(theme === 'Purple' ? 'Teal' : 'Purple');
    }

    return (
        <ThemeContext.Provider value={theme}>
            <Fragment >
                <label>
                    Name{': '}
                    <input value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Address{': '}
                    <input value={address} onChange={e => setAddress(e.target.value)} />
                </label>

                <button onClick={handlerChangeColor} >ChangeColor</button>

                <MemorizedGreeting name={name} />
                <NoMemorizedGreeting name={name} />
            </Fragment>
        </ThemeContext.Provider>
    );
}

const NoMemorizedGreeting = ({ name }) => {
    const theme = useContext(ThemeContext);
    console.log('re-render greeting component');
    return <h2 className={theme}>No Memo: {name} !</h2>
};

const MemorizedGreeting = memo(
    function Greeting({ name }) {
        const theme = useContext(ThemeContext);
        console.log('re-render greeting component');
        return <h2 className={theme}>With Memo: {name} !</h2>
    }
);