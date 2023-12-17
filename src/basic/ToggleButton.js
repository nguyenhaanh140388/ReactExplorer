import React from 'react';

function Button({ onClick, isToggleOn }) {

    return (
        <button onClick={e => {
            e.stopPropagation();
            onClick();
        }}>
            {isToggleOn ? 'ON' : 'FALSE'}
        </button>
    );
}

class ToggleButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isToggleOn: false };
        this.clickEvent = this.clickEvent.bind(this);
        this.componentClock = {
            name: 'Event Handler',
            theme: {
                backgroundColor: '#EBDEF0',
                color: '#DC7633'
            }
        };
    }

    clickEvent() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }


    render() {
        return (
            <section>
                {/* Pass value from parent to Clock component */}
                <h1 className="liner">{this.props.name}</h1>
                <h5 >{this.componentClock.name}</h5>
                <div style={this.componentClock.theme} onClick={(e) => {
                    e.preventDefault();
                    alert('You clicked on the toolbar!');
                }}>
                    <Button onClick={this.clickEvent} isToggleOn={this.state.isToggleOn}>
                    </Button>
                </div>
            </section>
        );
    }
}

export default ToggleButton;