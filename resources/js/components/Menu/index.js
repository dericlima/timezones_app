import React from 'react';
import {List} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

const Menu = (props) => (
    <List>
        <List.Item>
            <List.Icon name='users' />
            <List.Content>
                <NavLink exact className='ui inverted primary basic button' activeClassName="active" to="/">
                    Home
                </NavLink>
            </List.Content>
        </List.Item>
        {!props.isAuthenticated &&
        <List.Item>
            <List.Icon name='users'/>
            <List.Content>
                <NavLink exact activeClassName="active" to="/register">
                    Register
                </NavLink>
            </List.Content>
        </List.Item>
        }
        {!props.isAuthenticated &&
        <List.Item>
            <List.Icon name='marker'/>
            <List.Content>
                <NavLink exact activeClassName="active" to="/login">
                    Login
                </NavLink>
            </List.Content>
        </List.Item>
        }
        {props.isAuthenticated &&
        <List.Item>
            <List.Icon name='linkify' />
            <List.Content>
                <NavLink exact activeClassName="active" to="/my_cities">
                    My Cities
                </NavLink>
            </List.Content>
        </List.Item>
        }
        {props.isAuthenticated &&
        <List.Item>
            <List.Icon name='linkify' />
            <List.Content>
                <NavLink exact activeClassName="active" to="/add_city">
                    Add new City
                </NavLink>
            </List.Content>
        </List.Item>
        }
        {props.isAuthenticated &&
        <List.Item>
            <List.Content>
                <a href="#" onClick={props.logout}>
                    Logout
                </a>
            </List.Content>
        </List.Item>
        }
    </List>
);

export default Menu;