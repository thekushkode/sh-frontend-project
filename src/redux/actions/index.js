import { AUTHENTICATING, LOGGED_IN, LOGGED_OUT } from "../reducers/auth"

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