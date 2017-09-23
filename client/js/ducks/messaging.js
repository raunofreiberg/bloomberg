import { combineReducers } from 'redux';
import firebase from '../config';

const initialState = {
    isLoading: true,
    messagesList: {},
};

const messages = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return {
                ...state,
                messagesList: action.messagesList,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.status,
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    messages,
});

// action creators
const setError = (statusCode, message) => ({type: 'SET_ERROR', statusCode, message});
const setLoading = status => ({type: 'SET_LOADING', status});
const setMessages = messagesList => ({type: 'SET_MESSAGES', messagesList});


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
