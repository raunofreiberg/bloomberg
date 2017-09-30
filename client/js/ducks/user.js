import {combineReducers} from 'redux';
import firebase from '../config';
import history from '../history';

const initialState = {
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

const isAuthorized = (state = initialState.isAuthorized, action) => {
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

export const createUser = userObj => async () => {
    try {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(userObj.email, userObj.password)
            .then(user => user.updateProfile({ displayName: userObj.username }));
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

export default userReducer;