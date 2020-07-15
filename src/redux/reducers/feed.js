export const SET_FEED = 'SET_FEED'
export const UNSET_FEED = 'UNSET_FEED'

const initialState = null;

function feedReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_FEED':
            return action.payload;
        case 'UNSET_FEED':
            return null;
        default:
            return state;
    }
}

export default feedReducer;