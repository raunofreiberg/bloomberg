import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SET_AUTHORIZED, setAuthorized } from '../ducks/user';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Store', () => {
    it('dispatches setAuthorized to true', () => {
        const expectedActions = {
            type: SET_AUTHORIZED,
            status: true,
        };
        const store = mockStore({});

        const res = store.dispatch(setAuthorized(true));
        expect(res).toEqual(expectedActions);
    });
});
