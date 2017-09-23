import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMessages, sendMessage } from '../ducks/messaging';

class Movies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
        };
    }

    componentDidMount() {
        this.props.onLoad();
    }

    sendMessage = () => {
        this.props.onSend(this.state.inputValue);
    };

    setMessageValue = (e) => {
        this.setState({inputValue: e.target.value});
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
                <input type="text" onChange={this.setMessageValue} />
                <button onClick={() => this.sendMessage()}>Send message</button>
                {this.props.messages.messages ? this.renderMessages(this.props.messages.messages) : ''}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(fetchMessages()),
    onSend: message => dispatch(sendMessage(message)),
});

const MoviesConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Movies);

export default MoviesConnector;
