export const SET_PRIVATE_FEED = 'SET_USER_FEED'
export const UNSET_PRIVATE_FEED = 'UNSET_USER_FEED'

const initialState = null;


function userFeedReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_FEED':
            return action.payload;
        case 'UNSET_USER_FEED':
            return null;
        default:
            return state;
    }
}

export default userFeedReducer;