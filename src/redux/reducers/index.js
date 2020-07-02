// imports signup/newuser reducer (and any other I create)
import userReducer from './user';
import profileReducer from './profile';
//imports combineReducers from redux
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    user: userReducer,
    profile: profileReducer
})

export default allReducers;