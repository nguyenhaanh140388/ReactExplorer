import { useState } from "react";

let idNumber = 0;

export default function UpdateObjectForm(props) {

    const settings = {
        name: 'Update Object Form',
        theme: {
            backgroundColor: '#EBDEF0',
            color: '#DC7633'
        }
    };

    const [personal, setPersonal] = useState(
        {
            id: 0,
            firstName: 'Anh',
            lastName: 'Nguyen Ha',
            email: 'Email',
        }
    );

    const [personalArray, setPersonalArray] = useState([]
    );

    function handleFirstNameChange(e) {
        setPersonal(
            {
                ...personal,
                firstName: e.target.value
            }
        );
    }

    return (
        <section>
            {/* Pass value from parent to Clock component */}
            <h1 className="liner">{settings.name}</h1>
            <h5 >{props.componentName}</h5>
            <div style={settings.theme}>
                <label>firstName</label>
                <input
                    value={personal.firstName}
                    onChange={handleFirstNameChange}
                /><br />
                <label>lastName</label>
                <input
                    value={personal.lastName}
                // onChange={handleFirstNameChange}
                />
                <p>{personal.firstName} - {personal.lastName}</p>

                <button onClick={() => {

                    setPersonalArray(
                        [
                            ...personalArray,
                            {
                                id: idNumber++, firstName: personal.firstName
                            }
                        ]
                    );
                }}>Add</button>
                <ul>
                    {personalArray.map(artist => (
                        <li key={artist.id}>{artist.id} - {artist.firstName}
                            <button onClick={() => {
                                setPersonalArray(
                                    personalArray.filter(a =>
                                        a.id !== artist.id
                                    )
                                );
                            }}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}