import React, { lazy, Suspense, cloneElement } from 'react';

function Loading() {
    return <p><h2>Loading...</h2></p>;
}

// Add a fixed delay so you can see the loading state
function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    }).then(() => promise);
}

export default function ReduxComponents() {

    const ListCountry = lazy(() => delayForDemo(import('../basic/ListCountry.js')));

    return (
        <>
            <Suspense fallback={<Loading />}>
                <ListCountry />
            </Suspense>
        </>
    );
}