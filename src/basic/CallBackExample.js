import React, { useState, useCallback } from 'react'

function Content({ onCount }) {
    console.log('render Button');
    return <button onClick={onCount}>Click here</button>;
}

const MemorizeContent = React.memo(Content);

export default function CallBackExample() {

    const [count, setCount] = useState(0);

    const handleCount = useCallback(() => setCount(count => count + 1), []
    );

    //const handleCount = () => setCount(count + 1);

    return (
        <>
            <MemorizeContent onCount={handleCount}></MemorizeContent>
            <h1>{count}</h1>
        </>
    );

}