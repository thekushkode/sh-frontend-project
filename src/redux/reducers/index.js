
import userReducer from './user';
import profileReducer from './profile';
import messagesReducer from './messages';
import { combineReducers } from 'redux';
import authReducer from './auth';
import feedReducer from './feed';
import privateFeedReducer from './privateFeed';
//import counterReducer from './likesCounter';

const allReducers = combineReducers({
    user: userReducer,
    profile: profileReducer,
    messages: messagesReducer,
    auth: authReducer,
    feed: feedReducer,
    privateFeed: privateFeedReducer
})

export default allReducers;
