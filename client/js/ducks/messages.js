import {combineReducers} from 'redux';
import firebase from '../config';

import {setAuthorized, setUser} from './user';

// action types
const SET_MESSAGES = 'SET_MESSAGES';
const SET_LOADING = 'SET_LOADING';


const initialState = {
    isLoading: false,
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
        case SET_LOADING:
            return action.status;
        default:
            return state;
    }
};

const messagesReducer = combineReducers({
    messages,
    isLoading,
});

// actions
const setError = (statusCode, message) => ({type: 'SET_ERROR', statusCode, message});
const setLoading = status => ({type: SET_LOADING, status});
const setMessages = messagesList => ({type: SET_MESSAGES, messagesList});

// action creators
export const fetchMessages = () => async (dispatch) => {
    try {
        await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(setAuthorized(true));
                dispatch(setUser(firebase.auth().currentUser));

                /*
                we only want to setLoading for the UI once we actually
                get past the authorization and start fetching
                 */
                dispatch(setLoading(true));

                firebase.database()
                    .ref('messages')
                    .orderByKey()
                    .on('value', (snapshot) => {
                        dispatch(setMessages(snapshot.val()));
                        dispatch(setLoading(false));
                    });
            }
        });
    } catch (err) {
        console.log(err); // todo: error handling
    }
};

export const sendMessage = message => async () => {
    try {
        console.log(firebase.auth().currentUser)
        const msg = {
            message,
            username: firebase.auth().currentUser.displayName,
            userId: firebase.auth().currentUser.uid,
        };

        const msgRef = await
            firebase.database()
                .ref('messages')
                .push();

        msg.id = msgRef.key;
        msgRef.set(msg);
    } catch (err) {
        console.log(err); // todo: error handling
    }
};

export default messagesReducer;