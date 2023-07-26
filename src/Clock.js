import React from 'react';

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date() };
        this.componentClock = {
            name: 'Component from React.Component',
            theme: {
                backgroundColor: '#EBDEF0',
                color: '#DC7633'
            }
        };
    }

    componentDidMount() {

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <section>
                {/* Pass value from parent to Clock component */}
                <h1 className="liner">{this.props.name}</h1> 
                <h5 >{this.componentClock.name}</h5>
                <div style={this.componentClock.theme}>
                    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                </div>
            </section>
        );
    }
}

export default Clock;