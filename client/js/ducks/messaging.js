import {combineReducers} from 'redux';
import firebase from '../config';
import history from '../history';

// action types
const SET_MESSAGES = 'SET_MESSAGES';
const SET_LOADING = 'SET_LOADING';
const SET_USER = 'SET_USER';
const SET_AUTORHIZED = 'SET_AUTHORIZED';

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
        case SET_USER:
            return action.user;
        default:
            return state;
    }
};

const isAuthorized = (state = initialState.isAuthorized, action) => {
    switch (action.type) {
        case SET_AUTORHIZED:
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
const setUser = user => ({type: SET_USER, user});
const setAuthorized = status => ({type: SET_AUTORHIZED, status});

// action creators
export const fetchMessages = () => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
        await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database()
                    .ref('messages')
                    .orderByKey()
                    .on('value', (snapshot) => {
                        dispatch(setMessages(snapshot.val()));
                        dispatch(setLoading(false));
                        dispatch(setAuthorized(true));
                    });
            }
        });
    } catch (err) {
        console.log(err); // todo: error handling
    }
};

export const sendMessage = (message) => async () => {
    try {
        const msg = {
            message,
            user: firebase.auth().currentUser.email,
        };

        const msgRef = await
            firebase.database()
                .ref('messages')
                .push();

        msg.id = msgRef.key;
        msgRef.set(msg);

        fetchMessages();
    } catch (err) {
        console.log(err); // todo: error handling
    }
};

export const createUser = (username, password) => async (dispatch) => {
    try {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(username, password);
        dispatch(setAuthorized(false));
        history.push('/');
    } catch (err) {
        console.log(err); // todo: error handling
    }

};

export const loginUser = (username, password) => async (dispatch) => {
    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(username, password);
        dispatch(setAuthorized(true));
    } catch (err) {
        dispatch(setAuthorized(false));
        console.log(err); // todo: error handling
    }
};

export const logUserOut = () => async (dispatch) => {
    try {
        await firebase
            .auth()
            .signOut();
        dispatch(setAuthorized(false));
    } catch (err) {
        dispatch(setAuthorized(true));
        console.log(err); // todo: error handling
    }
};


export default rootReducer;