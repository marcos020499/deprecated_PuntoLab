import { type as sessionTypes } from "../actions/servicioDetalleActions";

const initialState = {
    isEditing: false,
    data: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case sessionTypes.set:
            if (!payload) {
                return initialState
            }
        
            return {
                isEditing: payload.isEditing ? payload.isEditing : state.isEditing,
                data: payload.data
            }

        default:
            return state
    }
}