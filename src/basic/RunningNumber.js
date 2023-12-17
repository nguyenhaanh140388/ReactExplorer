import { useState } from "react";

export default function RunningNumber() {
    const [count, setRandomNumber] = useState(0);

    let min = 1000;
    let max = 9999;

    function clickEvent() {
        let random =
            Math.floor(Math.random() * (+max + 1 - +min)) + +min;
        setRandomNumber(random);
    }

    return (
        <section>
            <h1 className="liner">Hook</h1>
            <MyButton count={count} onClick={clickEvent} />
            <MyButton count={count} onClick={clickEvent} />
            <MyButton count={count} onClick={clickEvent} />
            <MyButton count={count} onClick={clickEvent} />
            <MyButton count={count} onClick={clickEvent} />
        </section>
    );
}

function MyButton({ count, onClick }) {
    return (
        <button onClick={onClick}>
            Clicked {count} times
        </button>
    );
}