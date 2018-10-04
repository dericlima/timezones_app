import React from 'react';
import { Label } from 'react-bootstrap';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        const date = new Date();
        date.setHours(date.getHours() + props.city.timezone.offset);
        this.state = {
            date: date,
            city: props.city.name
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
        const date = new Date();
        date.setHours(date.getHours() + this.props.city.timezone.offset);
        this.setState({
            date: date
        });
    }

    render() {
        return (
            <div>
                <Label bsStyle="warning">Current time</Label><h4>It is {this.state.date.toLocaleTimeString()} in {this.state.city} now.</h4><br />
            </div>
        );
    }
}

export default Clock;