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

// export const signIn = () => {
//     return {
//         type: 'SIGN_IN'
//     }
// }
