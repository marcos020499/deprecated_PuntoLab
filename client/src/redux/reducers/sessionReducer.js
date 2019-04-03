import { type as sessionTypes } from "../actions/sessionActions";

const initialState = {
    isAuth: false,
    user: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case sessionTypes.set:
        return {
            isAuth: true,
            user: payload
        }
    
    case sessionTypes.remove:
        localStorage.removeItem('jwtToken');
        return initialState

    default:
        return state
    }
}