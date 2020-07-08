const initialState = [];
function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MESSAGES':
            return action.payload;
        case 'CLEAR_MESSAGES':
            return null;
        default:
            return state;
    }
}

export default messagesReducer;