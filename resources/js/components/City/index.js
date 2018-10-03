import React from 'react';

class City extends React.Component {
    constructor() {
        super();
        this.state = {
            cities: []
        }
    }

    componentWillMount() {
        this.getCities();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.token !== this.props.token) {
            this.getCities();
        }
    }

    getCities() {
        const token = this.props.token;
        axios.get('/api/cities', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                const cities = response.data;
                this.setState({ cities });
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
                <h1>My Cities</h1>
                { this.state.cities.map((city, index) => {
                    return (
                        <div className="city" key={index}>
                            {city.name}<br />
                            {city.lat}<br />
                            {city.long}<br />
                            {city.timezone.name}<br />
                            <hr />
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default City;