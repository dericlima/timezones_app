import React from 'react';
import ReeValidate from 'ree-validate';
import {Redirect} from 'react-router-dom';

class Register extends React.Component{
    constructor() {
        super();
        this.validator = new ReeValidate({
            name: 'required|min:3',
            email: 'required|email',
            password: 'required|min:6',
            password_confirmation: 'required|min:6'
        });
        this.state = {
            credentials: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isSuccess: false,
            isLoading: false,
            errors: this.validator.errors
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const {credentials} = this.state;
        credentials[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors, credentials})
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        const {credentials} = this.state;

        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    if(this.passwordConfirmation(credentials)){
                        this.setState({
                            isLoading: true
                        });
                        this.submit(credentials);
                    }
                    else{
                        const responseError = {
                            isError: true,
                            code: 401,
                            text: "Oops! Password confirmation didn't match"
                        };
                        this.setState({responseError});
                    }

                }
            });
    }

    passwordConfirmation(credentials){
        return (credentials.password === credentials.password_confirmation);
    }

    submit(credentials) {
        axios.post('/api/register', {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.password_confirmation,
        })
        .then((response) => {
            this.setState({
                isLoading: false,
                isSuccess: true,
                credentials: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
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
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' replace/>
        }
        const {errors} = this.state;
        return(
            <div className='animated wobble col-sm-4 offset-sm-3'>
                <h1>Register User</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <input
                                name='name'
                                type='text'
                                className='form-control'
                                placeholder='Name'
                                value={this.state.name}
                                onChange={this.handleChange}/>
                        </div>
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
                            <input
                                name='password_confirmation'
                                type='password'
                                className='form-control'
                                placeholder='Password Confirmation'
                                value={this.state.password_confirmation}
                                onChange={this.handleChange}/>
                        </div>
                        <div className='form-group'>
                            <input type='submit' className='btn' value='Register'/>
                        </div>
                    </form>
            </div>
        )
    }
}

export default Register;