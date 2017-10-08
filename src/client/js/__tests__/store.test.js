import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SET_AUTHORIZED, setAuthorized } from '../ducks/user';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Store', () => {
    /**
     * @arg {Function} done - is a callback that you need to execute,
     * If your action performing async task (e.g. request to API)
     */
    it('dispatches setAuthorized to true', () => {
        // Create expected output of your action
        const expectedActions = {
            type: SET_AUTHORIZED,
            status: true,
        };

        // Create store for testing
        const store = mockStore({});
        // Dispatch action
        const res = store.dispatch(setAuthorized(true));
        expect(res).toEqual(expectedActions);
    });
});
