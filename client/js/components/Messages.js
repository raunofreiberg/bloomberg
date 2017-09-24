import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchMessages, sendMessage} from '../ducks/messages';
import {loginUser, logUserOut} from "../ducks/user";

class Messages extends React.Component {
    static propTypes = {
        messages: PropTypes.shape({
            message: PropTypes.string,
            id: PropTypes.string,
        }).isRequired,
        user: PropTypes.shape({
            email: PropTypes.string,
        }).isRequired,
        isLoading: PropTypes.bool.isRequired,
        isAuthorized: PropTypes.bool.isRequired,
        onFetch: PropTypes.func.isRequired,
        onSend: PropTypes.func.isRequired,
        onLogin: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            messageInputValue: '',
            username: '',
            password: '',
        };
    }

    componentDidMount() {
        this.props.onFetch();
    }

    setMessageValue = e => this.setState({messageInputValue: e.target.value});

    setUsername = (e) => {
        this.setState({username: e.target.value});
    };

    setPassword = (e) => {
        this.setState({password: e.target.value});
    };

    sendMessage = () => {
        this.props.onSend(this.state.messageInputValue, this.props.user);
        this.setState({messageInputValue: ''});
    };

    login = () => {
        this.props.onLogin(this.state.username, this.state.password);
    };

    renderLogin = () => {
        return (
            <div>
                <h1 className="index__heading">Login</h1>
                <input type="text" placeholder="Email" onChange={this.setUsername}/>
                <input type="password" placeholder="Password" onChange={this.setPassword}/>
                <button className="btn btn--primary login" onClick={() => this.login()}>Login</button>
                <Link to="/signup" className="btn btn-block btn--secondary">Sign up</Link>
            </div>
        );
    };

    renderMessages = (messages) => {
        return (
            <div className="messages__container">
                <h1>User: {this.props.user.displayName}</h1>
                {
                    Object.keys(messages).map(key =>
                        <div className="message" key={key}>
                            <div className="message__data">
                                <img src={messages[key].img} />
                                <span className="message__data-username">{messages[key].username}</span>
                            </div>
                            <p className="message__content">{messages[key].message}</p>
                        </div>
                    )
                }

                <input type="text" onChange={this.setMessageValue} value={this.state.messageInputValue}/>
                <button onClick={() => this.sendMessage()}>Send message</button>
            </div>
        );
    };

    render() {
        if (this.props.isLoading && this.props.isAuthorized) {
            return (
                <div>loading</div>
            );
        } else if (!this.props.isAuthorized && !this.props.isLoading) {
            return (
                <div>
                    {this.renderLogin()}
                </div>
            );
        } else if (this.props.isAuthorized) {
            return (
                <div>
                    <button onClick={() => this.props.onLogout()}>Log out</button>
                    {this.renderMessages(this.props.messages)};
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    messages: state.messages.messages,
    user: state.user.user,
    isLoading: state.messages.isLoading,
    isAuthorized: state.user.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
    onFetch: () => dispatch(fetchMessages()),
    onSend: (message, user) => dispatch(sendMessage(message, user)),
    onLogin: (username, password) => dispatch(loginUser(username, password)),
    onLogout: () => dispatch(logUserOut()),
});

const MessagesConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Messages);

export default MessagesConnector;