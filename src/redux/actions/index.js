import { AUTHENTICATING, LOGGED_IN, LOGGED_OUT } from "../reducers/auth"
import { INCREMENT_LIKES } from "../reducers/feed"

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const unSetUser = () => {
    return {
        type: 'UNSET_USER'
    }
}

export const setProfile = (dog) => {
    return {
        type: 'SET_PROFILE',
        payload: dog
    }
}

export const clearProfile = () => {
    return {
        type: 'CLEAR_PROFILE'
    }
}

export const authStart = () => {
    return {
        type: AUTHENTICATING
    }
}

export const loggedIn = () => {
    return {
        type: LOGGED_IN
    }
}

export const loggedOut = () => {
    return {
        type: LOGGED_OUT
    }
}

export const loadMessages = (payload) => ({
    type: 'LOAD_MESSAGES',
    payload
})

export const clearMessages = (payload) => ({
    type: 'CLEAR_MESSAGES',
})

export const setFeed = (feed) => {
    return {
        type: 'SET_FEED',
        payload: feed
    }
}

export const unSetFeed = () => {
    return {
        type: 'UNSET_FEED'
    }
}

export const increment = (id) => {
    return {
        type: INCREMENT_LIKES,
        id
    }
}

export const setPrivateFeed = (feed) => {
    return {
        type: 'SET_PRIVATE_FEED',
        payload: feed
    }
}

export const unSetPrivateFeed = () => {
    return {
        type: 'UNSET_PRIVATE_FEED'
    }
}

export const setUserFeed = (feed) => {
    return {
        type: 'SET_USER_FEED',
        payload: feed
    }
}

export const unSetUserFeed = () => {
    return {
        type: 'UNSET_USER_FEED'
    }
}

export const loadInbox = (payload) => ({
    type: 'LOAD_INBOX',
    payload
})

export const clearInbox = (payload) => ({
    type: 'CLEAR_INBOX',
})

// export const decrement = (num) => {
//     return {
//         type: 'DECREMENT',
//         payload: num
//     }
// } 