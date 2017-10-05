import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import user from './ducks/user';
import messages from './ducks/messages';

export default combineReducers({
    user,
    messages,
    form,
});
