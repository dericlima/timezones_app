import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Timezone from './Timezone';
import Register from './Register';
import { List } from 'semantic-ui-react';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            token: null
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
    }

    refresh() {
        return axios.get('api/refresh', {
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
        .then((response) => {
            const token = response.data.token;
            this.authenticate(token);
        })
        .catch((error) => {
            console.log('Error!', error);
        });
    }

    authenticate(token) {
        this.setState({
            isAuthenticated: true,
            token: token
        });
        localStorage.setItem('jwt', token);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Menu isAuthenticated={this.state.isAuthenticated} logout={this.logout}/>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' render={(props) => <Login authenticate={this.authenticate} isAuthenticated={this.state.isAuthenticated} {...props} />} />
                        <Route exact path='/register' component={Register} />
                        <PrivateRoute exact path='/timezones' component={Timezone} isAuthenticated={this.state.isAuthenticated} token={this.state.token} refresh={this.refresh} />
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

const Menu = (props) => (
    <List>
        <List.Item>
            <List.Icon name='users' />
            <List.Content>
                <NavLink exact activeClassName="active" to="/">
                    Home
                </NavLink>
            </List.Content>
        </List.Item>
        <List.Item>
            <List.Icon name='users' />
            <List.Content>
                <NavLink exact activeClassName="active" to="/register">
                    Register
                </NavLink>
            </List.Content>
        </List.Item>
        <List.Item>
            <List.Icon name='marker' />
            <List.Content>
                <NavLink exact activeClassName="active" to="/login">
                    Login
                </NavLink>
            </List.Content>
        </List.Item>
        {props.isAuthenticated ?
            <List.Item>
                <List.Icon name='linkify' />
                <List.Content>
                    <NavLink exact activeClassName="active" to="/timezones">
                        Timezones
                    </NavLink>
                </List.Content>
            </List.Item>
            :
            null
        }
        {props.isAuthenticated ?
            <List.Item>
                <List.Content>
                    <a href="#" onClick={props.logout}>
                        Logout
                    </a>
                </List.Content>
            </List.Item>
            :
            null
        }
    </List>
);

const PrivateRoute = ({ component: Component, isAuthenticated, token, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props} {...rest} token={token} isAuthenticated={isAuthenticated} />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )
    )} />
);

if (document.getElementById('app')) {
    ReactDOM.render(
        <Main />,
        document.getElementById('app')
    );
}
