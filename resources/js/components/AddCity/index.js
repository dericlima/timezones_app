import React from 'react';
import ReeValidate from "ree-validate";
import Select from 'react-select';

class AddCity extends React.Component {
    constructor() {
        super();
        this.validator = new ReeValidate({
            name: 'required|min:3',
            lat: 'required|integer',
            long: 'required|integer',
            timezone_id: 'required',
        });
        this.state = {
            city: {
                name: '',
                lat: '',
                long: '',
                timezone_id: ''
            },
            timezone: null,
            selectedTimezone: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = this.props.token;
        axios.get('/api/timezones', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then((response) => {
            var timezones = response.data;
            timezones.forEach((data, index) => {
               timezones[index].value = data.id;
               timezones[index].label = data.name;
            });
            this.setState({
                timezoneOptions: timezones
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const {city} = this.state;
        city[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors, city})
            });
    }

    handleChangeSelect(selectedTimezone) {
        this.setState({
            selectedTimezone
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const {city} = this.state;

        this.submit(city);
    }

    submit(city) {
        axios.post('/api/add_city', {
            name: city.name,
            lat: 10.254,
            long: 41.2654,
            // lat: city.lat,
            // long: city.long,
            timezone_id: this.state.selectedTimezone.id,
            token: this.props.token
        })
        .then((response) => {
            this.setState({
                isSuccess: true,
                city: {
                    name: '',
                    lat: '',
                    long: '',
                    timezone_id: ''
                },
                responseError : {
                    isError: false,
                    code: '',
                    text: ''
                },
                error: ''
            });
        })
        .catch(({error, statusCode}) => {
            const responseError = {
                isError: true,
                code: statusCode,
                text: error
            };
            this.setState({responseError});
        });
    }

    render() {
        const {errors} = this.state;
        return(
            <div className='animated col-sm-4 offset-sm-3'>
                <h1>Add New City</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <input
                            name='name'
                            type='text'
                            className='form-control'
                            placeholder='City'
                            value={this.state.name}
                            onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                        <Select
                            value={this.state.selectedTimezone}
                            onChange={this.handleChangeSelect}
                            options={this.state.timezoneOptions}
                        />
                    </div>
                    <div className='form-group'>
                        <input type='submit' className='btn' value='Add City'/>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddCity;