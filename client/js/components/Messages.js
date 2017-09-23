import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchMessages, sendMessage, createUser, authorizeUser} from '../ducks/messaging';

class Messages extends React.Component {
    static propTypes = {
        messages: PropTypes.shape({
            message: PropTypes.string,
            id: PropTypes.string,
        }).isRequired,
        user: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
        }).isRequired,
        isLoading: PropTypes.bool.isRequired,
        isAuthorized: PropTypes.bool.isRequired,
        onFetch: PropTypes.func.isRequired,
        onSend: PropTypes.func.isRequired,
        onCreate: PropTypes.func.isRequired,
        onAuthorizeUser: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            messageInputValue: '',
            userName: 'Anonymous',
        };
    }

    componentDidMount() {
        this.props.onAuthorizeUser();
        this.props.onFetch();
    }

    setMessageValue = e => this.setState({messageInputValue: e.target.value});

    setUsername = (e) => {
        this.setState({userName: e.target.value});
    };

    sendMessage = () => {
        this.props.onSend(this.state.messageInputValue, this.props.user);
        this.setState({messageInputValue: ''});
    };

    createUser = () => {
        this.props.onCreate(this.state.userName);
    };

    renderLogin = () => {
        return (
            <div>
                <input type="text" onChange={this.setUsername} />
                <button onClick={() => this.createUser()}>Join</button>
            </div>
        );
    };

    renderMessages = (messages) => {
        return (
            <ul>
                <h1>User: {this.props.user.name}</h1>
                {
                    Object.keys(messages).map(key =>
                        <li key={key}>{messages[key].message} - {messages[key].username}</li>
                    )
                }

                <input type="text" onChange={this.setMessageValue} value={this.state.messageInputValue} />
                <button onClick={() => this.sendMessage()}>Send message</button>
            </ul>
        );
    };

    render() {
        return (
            <div>
                best chatroom EU
                {
                    !this.props.isLoading && this.props.isAuthorized ?
                        this.renderMessages(this.props.messages) : this.renderLogin()
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
    user: state.user,
    isLoading: state.isLoading,
    isAuthorized: state.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
    onFetch: () => dispatch(fetchMessages()),
    onSend: (message, user) => dispatch(sendMessage(message, user)),
    onCreate: name => dispatch(createUser(name)),
    onAuthorizeUser: () => dispatch(authorizeUser()),
});

const MessagesConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Messages);

export default MessagesConnector;
