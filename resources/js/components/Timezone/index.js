import React from 'react';

class Timezone extends React.Component {
    constructor() {
        super();
        this.state = {
            timezones: []
        }
    }

    componentWillMount() {
        this.getTimezones();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.token !== this.props.token) {
            this.getTimezones();
        }
    }

    getTimezones() {
        const token = this.props.token;
        axios.get('/api/timezones', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then((response) => {
            const timezones = response.data;
            this.setState({ timezones });
        })
        .catch((error) => {
            const status = error.response.status;
            if (status === 401 && this.props.isAuthenticated) {

                /** User is logged in but the token in invalid */
                this.props.refresh();
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Timezones</h1>
                { this.state.timezones.map((timezone, index) => {
                    return (
                        <div className="timezone" key={index}>
                            {timezone.name}<br />
                            {timezone.offset}<br />
                            <hr />
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Timezone;