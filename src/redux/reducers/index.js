// imports signup/newuser reducer (and any other I create)
import userReducer from './user';
import profileReducer from './profile';
import messagesReducer from './messages';
//imports combineReducers from redux
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    user: userReducer,
    profile: profileReducer,
    messages: messagesReducer
})

export default allReducers;