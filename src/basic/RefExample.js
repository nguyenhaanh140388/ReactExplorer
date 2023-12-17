import React, { useRef } from 'react';

export default function RefExample() {
    const inputRef = useRef(null);

    function handlerClick() {
        inputRef.current.focus();
        inputRef.current.style.backgroundColor = '#8E44AD';
        inputRef.current.style.padding = '3rem';
        inputRef.current.style.color = 'white';
        inputRef.current.style.width = '150px';
        inputRef.current.style.height = '150px';
        inputRef.current.style.margin = '50px';
        inputRef.current.style.borderRadius = '10px';
    }

    return (
        <>
            <input ref={inputRef} />
            <button onClick={handlerClick}>Forcus</button>
        </>
    );

}