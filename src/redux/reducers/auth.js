export const UNINITIALIZED = 'UNINITIALIZED'
export const AUTHENTICATING = 'AUTHENTICATING'
export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'

const initialState = UNINITIALIZED;

function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATING:
            return AUTHENTICATING;
        case LOGGED_IN:
            return LOGGED_IN;
        case LOGGED_OUT:
            return LOGGED_OUT;
        default:
            return state;
    }
}

export default authReducer;