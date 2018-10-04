import React from 'react';
import Clock from './../shared/Clock';
import { Button, Jumbotron, Label } from 'react-bootstrap';

class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: []
        };
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
            const cities = response.data.cities;
            this.setState({
                cities: cities
            });
        })
        .catch((error) => {
            const status = error.response.status;
            if (status === 401 && this.props.isAuthenticated) {

                /** User is logged in but the token in invalid */
                this.props.refresh();
            }
        });
    }

    removeByAttr(arr, attr, value){
        var i = arr.length;
        while(i--){
            if( arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value ) ){

                arr.splice(i,1);

            }
        }
        return arr;
    };

    deleteCity(param, e) {
        const token = this.props.token;
        axios.delete('/api/city/' + param.id, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then((response) => {
            //FIXME There's better ways to update the cities array, I did this way due to the lack of time
            const cities = this.removeByAttr(this.state.cities, 'id', param.id);
            this.setState({
                cities: cities
            });
        })
        .catch((error) => {
            const status = error.response.status;
            if (status === 401 && this.props.isAuthenticated) {

                /** User is logged in but the token in invalid */
                this.props.refresh();
            }
        });
    };

    render() {
        return (
            <div className='panel-group'>
                <h1>My Cities</h1>
                { this.state.cities.map((city, index) => {
                    return (
                        <Jumbotron>
                            <div key={index}>
                                <Label bsStyle="info">City</Label><h4>{city.name}</h4><br />
                                <Label bsStyle="info">Timezone</Label><h4>{city.timezone.name}</h4><br />
                                <Clock city={city}/>
                                <Button disabled={true} bsStyle="primary">Edit</Button>{'   '}
                                <Button onClick={this.deleteCity.bind(this, city)} bsStyle="danger">Delete</Button>
                            </div>
                        </Jumbotron>
                    )
                })}
            </div>
        );
    }
}

export default City;