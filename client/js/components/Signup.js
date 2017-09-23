import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createUser } from '../ducks/messaging';

class Signup extends React.Component {
    static propTypes = {
        onCreate: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    setUsername = (e) => {
        this.setState({username: e.target.value});
    };

    setPassword = (e) => {
        this.setState({password: e.target.value});
    };

    createUser = () => {
        this.props.onCreate(this.state.username, this.state.password);
    };

    render() {
        return (
            <div>
                <h1 className="index__heading">Signup</h1>
                <input type="text" placeholder="Email" onChange={this.setUsername} />
                <input type="password" placeholder="Password" onChange={this.setPassword} />
                <button className="btn btn--primary" onClick={() => this.createUser()}>Sign up</button>
                <Link to="/" className="btn btn--secondary">Login</Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
    onCreate: (username, password) => dispatch(createUser(username, password)),
});

const SignupConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Signup);

export default SignupConnector;