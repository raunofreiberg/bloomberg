import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchMessages, sendMessage} from '../ducks/messaging';

class Messages extends React.Component {
    static propTypes = {
        messagesList: PropTypes.shape({}).isRequired,
        isLoading: PropTypes.bool.isRequired,
        onLoad: PropTypes.func.isRequired,
        onSend: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
        };
    }

    componentDidMount() {
        this.props.onLoad();
    }


    setMessageValue = (e) => {
        this.setState({inputValue: e.target.value});
    };

    sendMessage = () => {
        this.props.onSend(this.state.inputValue);
    };

    renderMessages = (messages) => {
        return (
            <ul>
                {Object.keys(messages).map(key => <li key={key}>{messages[key].message}</li>)}
            </ul>
        );
    };

    render() {
        return (
            <div>
                wassup
                <input type="text" onChange={this.setMessageValue}/>
                <button onClick={() => this.sendMessage()}>Send message</button>
                {!this.props.isLoading ? this.renderMessages(this.props.messagesList) : ''}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    messagesList: state.messages.messagesList,
    isLoading: state.messages.isLoading,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(fetchMessages()),
    onSend: message => dispatch(sendMessage(message)),
});

const MessagesConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Messages);

export default MessagesConnector;
