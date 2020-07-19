export const SET_PRIVATE_FEED = 'SET_PRIVATE_FEED'
export const UNSET_PRIVATE_FEED = 'UNSET_PRIVATE_FEED'

const initialState = null;


function privateFeedReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PRIVATE_FEED':
            return action.payload;
        case 'UNSET_PRIVATE_FEED':
            return null;
        default:
            return state;
    }
}

export default privateFeedReducer;