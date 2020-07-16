export const SET_FEED = 'SET_FEED'
export const UNSET_FEED = 'UNSET_FEED'
export const INCREMENT_LIKES = 'INCREMENT_LIKES'

const initialState = null;


function feedReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_FEED':
            return action.payload;
        case 'UNSET_FEED':
            return null;
        case 'INCREMENT_LIKES':
            const newState = state.map(post => {
                if (post.docId === action.id) {
                    let newPost = {...post};
                    newPost.Likes++
                    return newPost
                } else {
                    return post
                }
            })
            return newState;
        default:
            return state;
    }
}

export default feedReducer;