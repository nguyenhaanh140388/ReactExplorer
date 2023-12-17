import { useReducer, createContext, useState, useContext } from "react";

let idNumber = 3;

const initialPersonal = [
    { id: 1, firstName: 'Visit Kafka Museum', lastName: true, email: 'Email' },
    { id: 2, firstName: 'Visit Kafka Museum', lastName: true, email: 'Email' },
    { id: 3, firstName: 'Visit Kafka Museum', lastName: true, email: 'Email' },
];

export const PersonalContext = createContext(null);
export const PersonalDispatchContext = createContext(null);

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

    function handleFirstNameChange(e) {
        setPersonal(
            {
                ...personal,
                firstName: e.target.value
            }
        );
    }

    function handleChangeTask(person) {
        dispatch({
            type: 'changed',
            person: person,
        });
    }

    function tasksReducer(personalArray, action) {
        switch (action.type) {
            case 'added': {
                return [
                    ...personalArray,
                    {
                        id: idNumber++, firstName: personal.firstName
                    }
                ];
            }
            case 'changed': {
                return personalArray.map((t) => {
                    if (t.id === action.person.id) {
                        return action.person;
                    } else {
                        return t;
                    }
                });
            }
            case 'deleted': {
                return personalArray.filter((t) => t.id !== action.id);
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    const [personalArray, dispatch] = useReducer(tasksReducer, initialPersonal);

    function Person() {

        const personalContext = useContext(PersonalContext);
        const personalDispatch = useContext(PersonalDispatchContext);

        const [isEditing, setIsEditing] = useState(false);
        const [personValue, setValue] = useState(personalContext);

        let personContent;

        if (isEditing) {
            personContent = (<>
                <input
                    value={personValue.firstName}
                    onChange={(e) => {
                        setValue(
                            {
                                ...personValue,
                                firstName: e.target.value
                            });
                    }}
                />
                <button onClick={() => {
                    setIsEditing(false);
                    personalDispatch({
                        type: 'changed',
                        person:
                        {
                            ...personalContext,
                            firstName: personValue.firstName
                        },
                    });
                }
                }>Save</button>
            </>);
        } else {
            personContent = (<>
                {personalContext.firstName} <button onClick={() => setIsEditing(true)}>Edit</button>
            </>);
        }

        return (
            <>
                {personContent}
                <button onClick={() => {
                    dispatch({
                        type: 'deleted',
                        id: personalContext.id,
                    });
                }}>Remove</button>
            </>
        );
    }



    return (
        <section className="section fancy">
            {/* Pass value from parent to Clock component */}
            <h1 className="liner">{settings.name}</h1>
            <h5 >{props.componentName}</h5>
            <div style={settings.theme}>
                <label>firstName</label>
                <input
                    value={personal.firstName}
                // onChange={handleFirstNameChange}
                /><br />
                <label>lastName</label>
                <input
                    value={personal.lastName}
                // onChange={handleFirstNameChange}
                />
                <p>{personal.firstName} - {personal.lastName}</p>

                <button onClick={(e) => {
                    dispatch({
                        type: 'added',
                    });
                }}>Add</button>
                <ul>
                    {personalArray.map(p => (

                        <PersonalContext.Provider value={p}>
                            <PersonalDispatchContext.Provider value={dispatch}>
                                <li key={p.id}>
                                    <Person />
                                </li>
                            </PersonalDispatchContext.Provider>
                        </PersonalContext.Provider>

                    ))}
                </ul>
            </div>
        </section>
    );
}