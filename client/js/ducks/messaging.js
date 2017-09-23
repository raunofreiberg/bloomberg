import {combineReducers} from 'redux';
import firebase from '../config';

// action types
const SET_MESSAGES = 'SET_MESSAGES';
const SET_LOADING = 'SET_LOADING';

const initialState = {
    isLoading: true,
    isAuthorized: false,
    user: {},
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

const user = (state = initialState.user, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.user;
        default:
            return state;
    }
};

const isAuthorized = (state = initialState.isAuthorized, action) => {
    switch (action.type) {
        case 'SET_AUTHORIZED':
            return action.status;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    messages,
    isLoading,
    user,
    isAuthorized,
});

// actions
const setError = (statusCode, message) => ({type: 'SET_ERROR', statusCode, message});
const setLoading = status => ({type: SET_LOADING, status});
const setMessages = messagesList => ({type: SET_MESSAGES, messagesList});
const setUser = user => ({type: 'SET_USER', user});
const setAuthorized = status => ({type: 'SET_AUTHORIZED', status});

// action creators
export const fetchMessages = () => async (dispatch, getState) => {
    dispatch(setLoading(true));

    try {
        await firebase.auth()
            .signInAnonymously();
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


export const sendMessage = (message, user) => async () => {
    try {
        const msg = {
            message,
            userId: user.id,
            username: user.name,
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

export const authorizeUser = () => (dispatch) => {
    const locallyStoredUser = JSON.parse(localStorage.getItem('user'));

    if (locallyStoredUser) {
        // TODO: add check against the database with users' ID
        dispatch(setUser(locallyStoredUser));
        dispatch(setAuthorized(true));
    }
};

export const createUser = name => async (dispatch) => {
    try {
        const user = {
            name,
        };

        const userRef = await
            firebase.database()
                .ref('users')
                .push();

        user.id = userRef.key;
        userRef.set(user);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch(setUser(user));
        dispatch(setAuthorized(true));

    } catch (err) {
        console.log(err);
    }
};


export default rootReducer;
