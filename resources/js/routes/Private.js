import React from 'react';
import {Redirect, Route} from "react-router-dom";

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

export default PrivateRoute;