import React, { useState, useMemo } from 'react'

// use Memo
function ListedAllNumber({ length }) {
    console.log("calculating...");

    let numbers = useMemo(() => {
        let results = [];
        for (let i = 0; i < length; i++) {
            results.push(i);
        }

        return results;
    }, [length])

    return <p>Listed number: {numbers.join(",")}</p>
}

// function ListedAllNumber({length}) {
//// 99999
// 	console.log("calculating...");
	
// 	let numbers = [];
	
// 	for(let i = 0; i < length; i++) {
// 		numbers.push(i);
// 	}
	
// 	return <p>Listed number: {numbers.join(",")}</p>
// }


export default function UseMemoExample() {
	const [length, setLength] = useState(0);
	
	return <div>
		<input type="text" placeholder="Nhập số" value={length} onChange={(e) => setLength(Number(e.target.value))} />
		<ListedAllNumber length={length} />
	</div>
}