const initialState = [];
function inboxReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_INBOX':
            return action.payload;
        case 'CLEAR_INBOX':
            return [];
        default:
            return state;
    }
}

export default inboxReducer;