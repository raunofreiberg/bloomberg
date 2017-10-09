import { combineReducers } from 'redux';
import firebase from '../config';

import { setAuthorized, setUser } from './user';

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
const setError = (statusCode, message) => ({ type: 'SET_ERROR', statusCode, message });
const setLoading = status => ({ type: SET_LOADING, status });
const setMessages = messagesList => ({ type: SET_MESSAGES, messagesList });

// action creators
export const fetchMessages = () => async (dispatch) => {
    try {
        await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const currentUser = user;

                dispatch(setAuthorized(true));
                firebase.database()
                    .ref(`users/${user.uid}`)
                    .on('value', (userSnapshot) => {
                        currentUser.hue = userSnapshot.val().hue;
                        dispatch(setUser(user));
                    });

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

/**
 * Send a message to Firebase.
 * @param {string} message
 * @param {string} displayName
 * @param {string} uid
 * @param {string} hue - The users' avatar color hue (rgb)
 */
export const sendMessage = (message, { displayName, uid, hue }) => async () => {
    try {
        const msg = {
            message,
            displayName,
            uid,
            hue,
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