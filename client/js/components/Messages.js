import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchMessages, sendMessage} from '../ducks/messages';
import {loginUser} from "../ducks/user";

class Messages extends React.Component {
    static propTypes = {
        messages: PropTypes.shape({
            message: PropTypes.string,
            id: PropTypes.string,
        }).isRequired,
        user: PropTypes.shape({
            email: PropTypes.string,
            displayName: PropTypes.string,
            uid: PropTypes.string,
        }).isRequired,
        isLoading: PropTypes.bool.isRequired,
        isAuthorized: PropTypes.bool.isRequired,
        onFetch: PropTypes.func.isRequired,
        onSend: PropTypes.func.isRequired,
        onLogin: PropTypes.func.isRequired,
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

    scrollToBottom = () => {
        const el = this.messagesEnd;
        if (el) el.scrollIntoView();
    };

    sendMessage = (e) => {
        e.preventDefault();
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
                <input type="text" placeholder="Email" className="input__field" onChange={this.setUsername} />
                <input type="password" placeholder="Password" className="input__field" onChange={this.setPassword} />
                <button className="btn btn--primary login" onClick={this.login}>Login</button>
                <Link to="/signup" className="btn btn-block btn--secondary">Sign up</Link>
            </div>
        );
    };

    renderMessages = (messages) => {
        this.scrollToBottom();
        return (
            <div className="conversation">
                {
                    Object.keys(messages).map(key => (
                        messages[key].userId === this.props.user.uid ?
                            <div className="messages messages--sent" key={key}>
                                <div className="message">{messages[key].message}</div>
                            </div>
                            : <div className="messages messages--received" key={key}>
                                <span className="messages--received__avatar">
                                    {messages[key].username ? messages[key].username.charAt(0) : '?'}
                                </span>
                                <div className="message">{messages[key].message}</div>
                            </div>
                    ))
                }
                <div ref={(el) => {this.messagesEnd = el;}} style={{marginTop: '70px'}}></div>
                <form onSubmit={this.sendMessage} className="conversation__actions">
                    <input
                        type="text"
                        onChange={this.setMessageValue}
                        value={this.state.messageInputValue}
                        className="conversation__actions-msg"
                        placeholder="Type..."
                    />
                    {this.state.messageInputValue !== '' ?
                        <button type="submit">
                            <i className="icon icon--arrow"></i>
                        </button> : ''}
                </form>
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
                this.renderMessages(this.props.messages)
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
});

const MessagesConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Messages);

export default MessagesConnector;