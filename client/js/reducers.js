import { combineReducers } from 'redux';

import user from './ducks/user';
import messages from './ducks/messages';

export default combineReducers({
    user,
    messages,
});