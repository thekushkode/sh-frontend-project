const initialState = null

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PROFILE':
            return action.payload;
        case 'CLEAR_PROFILE':
            return null;
        default:
            return state;
    }
}

export default profileReducer;