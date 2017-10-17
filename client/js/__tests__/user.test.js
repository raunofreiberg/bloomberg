import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { isAuthorized, SET_AUTHORIZED, initialState, loginUser, logUserOut } from '../ducks/user';
import { auth } from "../config";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('# Authentication -- actions', () => {
    const LOGIN_SUCCESS = {
        type: SET_AUTHORIZED,
        status: true,
    };

    const LOGIN_FAILURE = {
        type: SET_AUTHORIZED,
        status: false,
    };

    it('should log the user in', () => {
        expect(isAuthorized(initialState, LOGIN_SUCCESS)).toEqual(true);
    });

    it('should log the user out', () => {
        expect(isAuthorized(initialState, LOGIN_FAILURE)).toEqual(false);
    });
});

describe('# Authentication -- successful login ', () => {
    it('dispatches the setAuthorized action on success', async () => {
        auth.signInWithEmailAndPassword = jest.fn(() => Promise.resolve());
        const store = mockStore(initialState);

        await store.dispatch(loginUser('test@dude.com', 'test1234'));
        expect(store.getActions()).toEqual([{ type: SET_AUTHORIZED, status: true }]);
    });
});

describe('# Authentication -- successful logout', () => {
    it('dispatches the setAuthorized action on success', async () => {
        auth.signOut = jest.fn(() => Promise.resolve());
        const store = mockStore(initialState);

        await store.dispatch(logUserOut());
        expect(store.getActions()).toEqual([{ type: SET_AUTHORIZED, status: false }]);
    });
});
