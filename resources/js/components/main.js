import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Timezone from './Timezone';
import Register from './Register';
import Menu from './Menu';
import City from './City';
import AddCity from './AddCity';
import PrivateRoute from './../routes/Private';
import Header from './Header';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            token: null,
            user: null
        };
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentWillMount() {
        const lsToken = localStorage.getItem('jwt');
        if (lsToken) {
            this.authenticate(lsToken);
        }
    }

    logout() {
        this.setState({
            isAuthenticated: false,
            token: null
        });
        localStorage.removeItem('jwt');
    }

    refresh() {
        return axios.get('api/refresh', {
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
        .then((response) => {
            const token = response.data.token;
            const user = response.data.user;
            this.authenticate(token, user);
        })
        .catch((error) => {
            console.log('Error!', error);
        });
    }

    authenticate(token, user) {
        this.setState({
            isAuthenticated: true,
            token: token,
            user: user
        });
        localStorage.setItem('jwt', token);
    }

    render() {
        return (
            <HashRouter>
                <div className='container-fluid'>
                    <Header />
                    <div className='row content'>
                        <div className='col-sm-3 sidenav header-menu'>
                            <Menu isAuthenticated={this.state.isAuthenticated} logout={this.logout}/>
                        </div>
                        <div className='col-sm-9'>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/login' render={(props) => <Login authenticate={this.authenticate} isAuthenticated={this.state.isAuthenticated} {...props} />} />
                                <Route exact path='/register' component={Register} />
                                <PrivateRoute exact path='/timezones' component={Timezone} isAuthenticated={this.state.isAuthenticated} token={this.state.token} refresh={this.refresh} />
                                <PrivateRoute exact path='/cities' component={City} isAuthenticated={this.state.isAuthenticated} token={this.state.token} refresh={this.refresh} />
                                <PrivateRoute exact path='/add_city' component={AddCity} isAuthenticated={this.state.isAuthenticated} token={this.state.token} refresh={this.refresh} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(
        <Main />,
        document.getElementById('app')
    );
}
