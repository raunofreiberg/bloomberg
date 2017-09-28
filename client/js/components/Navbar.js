import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import {fetchMessages} from '../ducks/messages';
import {logUserOut} from "../ducks/user";

const LogoutBtn = () => (
    <button className="navbar-btn" onClick={() => this.props.onLogout()}>Log out</button>
);

class Navbar extends React.Component {

    componentDidMount() {
        this.props.onFetch();
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <span className="navbar-username">{this.props.user.displayName}</span>
                <span className="navbar-app">Bloomfield</span>
                {this.props.isAuthorized ? <LogoutBtn /> : ''}
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    isAuthorized: state.user.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
    onFetch: () => dispatch(fetchMessages()),
    onLogout: () => dispatch(logUserOut()),
});

const NavbarConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);

export default NavbarConnector;
