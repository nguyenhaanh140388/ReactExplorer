export default function PersonalSchedule(props) {

    PersonalSchedule.defaultProps = {
        display: true
    }

    const settings = {
        name: 'Personal Schedule',
        theme: {
            backgroundColor: '#EBDEF0',
            color: '#DC7633'
        }
    };

    function Item({ name, finished }) {
        if (finished) {
            return <li>{name}✔</li>
        } else {
            return <li>{name}</li>
        }
    }

    function ShowComponent(props) {
        if (props.display) {
            return (
                <section >
                    {/* Pass value from parent to Clock component */}
                    <h1 className="liner">{props.name}</h1>
                    <h5 >{props.componentName}</h5>
                    <ul style={props.styles}>{scheduleItems}</ul>
                </section>
            );
        } else {
            return <></>
        }
    }

    const schedule = [
        { name: 'Wakeup', finish: false },
        { name: 'Clean Teeth, mouth', finish: false },
        { name: 'Do excercise', finish: false },
        { name: 'Have Breakfast', finish: true },
        { name: 'Working', finish: true },
    ];

    const scheduleItems = schedule.map(
        p => <Item name={p.name} finished={p.finish} />
    );

    return (
        <ShowComponent display={true} name={settings.name} styles={settings.theme} />
    );
}