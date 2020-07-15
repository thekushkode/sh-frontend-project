// imports signup/newuser reducer (and any other I create)
import userReducer from './user';
import profileReducer from './profile';
import messagesReducer from './messages';
//imports combineReducers from redux
import { combineReducers } from 'redux';
import authReducer from './auth';
import feedReducer from './feed';

const allReducers = combineReducers({
    user: userReducer,
    profile: profileReducer,
    messages: messagesReducer,
    auth: authReducer,
    feed: feedReducer
})

export default allReducers;