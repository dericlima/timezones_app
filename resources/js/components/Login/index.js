import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then((response) => {
            const token = response.data.access_token;
            this.props.authenticate(token);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <input
                        name='email'
                        type='email'
                        className='form-control'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.handleChange}/>
                </div>
                <div className='form-group'>
                    <input
                        name='password'
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleChange}/>
                </div>
                <div className='form-group'>
                    <input type='submit' className='btn' value='Login'/>
                </div>
            </form>
        )
    }
}

export default Login;