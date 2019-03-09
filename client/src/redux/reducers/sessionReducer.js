import { type as sessionTypes } from "../actions/sessionActions";

const initialState = {
    isAuth: false
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
        return {
            isAuth: false,
            user: undefined
        }

    default:
        return state
    }
}