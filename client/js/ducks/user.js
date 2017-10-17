import { combineReducers } from 'redux';
import { SubmissionError } from 'redux-form';

import firebase from '../config';
import history from '../history';

export const initialState = {
    isAuthorized: false,
    user: {},
};

const SET_USER = 'SET_USER';
export const SET_AUTHORIZED = 'SET_AUTHORIZED';

const user = (state = initialState.user, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
};

export const isAuthorized = (state = initialState.isAuthorized, action) => {
    switch (action.type) {
        case SET_AUTHORIZED:
            return action.status;
        default:
            return state;
    }
};

const userReducer = combineReducers({
    user,
    isAuthorized,
});

export const setUser = user => ({ type: SET_USER, user });
export const setAuthorized = status => ({ type: SET_AUTHORIZED, status });

/**
 * Create a Firebase username with email & password.
 * @param {string} email
 * @param {string} displayName
 * @param {string} password
 * @param {string} hue - The users' avatar color hue (rgb)
 */
export const createUser = ({ email, displayName, password, hue }) => async () => {
    try {
        const createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

        await createdUser.updateProfile({ displayName });
        await firebase.database().ref(`users/${createdUser.uid}`).set({
            email,
            displayName,
            password,
            hue,
        });
        await history.push('/');
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
        throw new SubmissionError({ _error: err.message });
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

export default userReducer;