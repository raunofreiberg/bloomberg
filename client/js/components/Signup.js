import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createUser } from '../ducks/user';

class Signup extends React.Component {
    static propTypes = {
        onCreate: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            displayName: '',
            password: '',
        };
    }

    setEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    setPassword = (e) => {
        this.setState({ password: e.target.value });
    };

    setUsername = (e) => {
        this.setState({ displayName: e.target.value });
    };

    createUser = () => {
        const hue = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        const user = {
            email: this.state.email,
            displayName: this.state.displayName,
            password: this.state.password,
            hue,
        };
        this.props.onCreate(user);
    };

    render() {
        return (
            <div>
                <h1 className="index__heading">Signup</h1>
                <input type="text" placeholder="Email" onChange={this.setEmail} className="input__field" />
                <input type="text" placeholder="Display Name" onChange={this.setUsername} className="input__field" />
                <input type="password" placeholder="Password" onChange={this.setPassword} className="input__field" />
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
    onCreate: user => dispatch(createUser(user)),
});

const SignupConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Signup);

export default SignupConnector;
