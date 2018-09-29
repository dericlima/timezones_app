import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login/index';

const Menu = (props) => (
    <ul>
        <li>
            <NavLink exact activeClassName="active" to="/">
                Home
            </NavLink>
        </li>
        <li>
            <Route exact path='/login' render={(props) => <Login authenticate={this.authenticate} isAuthenticated={this.state.isAuthenticated} {...props} />} />
        </li>
        <li>
            <NavLink exact activeClassName="active" to="/timezones">
                Timezones
            </NavLink>
        </li>
    </ul>
);

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            token: null
        };
        this.authenticate = this.authenticate.bind(this);
    }

    authenticate(token) {
        this.setState({
            isAuthenticated: true,
            token: token
        })
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Menu />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' render={(props) => <Login />} />
                    </Switch>
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
