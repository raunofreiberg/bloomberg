import { combineReducers } from 'redux';
import firebase from '../config';

// action types
const SET_MESSAGES = 'SET_MESSAGES';
const SET_LOADING = 'SET_LOADING';

const initialState = {
    isLoading: true,
    messagesList: {},
};

// reducers
const messages = (state = initialState.messagesList, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return action.messagesList;
        default:
            return state;
    }
};

const isLoading = (state = initialState.isLoading, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return action.status;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    messages,
    isLoading,
});

// actions
const setError = (statusCode, message) => ({ type: 'SET_ERROR', statusCode, message });
const setLoading = status => ({ type: SET_LOADING, status });
const setMessages = messagesList => ({ type: SET_MESSAGES, messagesList });

// action creators
export const fetchMessages = () => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        await firebase.database()
            .ref('messages')
            .orderByKey()
            .on('value', (snapshot) => {
                dispatch(setMessages(snapshot.val()));
                dispatch(setLoading(false));
            });
    } catch (err) {
        console.log(err);
    }
};


export const sendMessage = message => async () => {
    try {
        const msg = {
            message,
        };

        const msgRef = await
            firebase.database()
                .ref('messages')
                .push();

        msg.id = msgRef.key;
        msgRef.set(msg);

        fetchMessages();
    } catch (err) {
        console.log(err);
    }
};

export const login = () => {
    firebase.auth()
        .signInAnonymously();
};


export default rootReducer;
