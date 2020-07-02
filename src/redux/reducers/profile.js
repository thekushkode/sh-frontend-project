const initialState = null
//{
//     dogName: '',
//     breed: '',
//     street: '',
//     city: '',
//     userState: '',
//     zipcode: '',
//     temperament: '',
//     size: '',
//     spayNeut: '',
//     vaccines: '',
//     bio: ''
// };

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