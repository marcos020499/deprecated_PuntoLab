import { createStore, combineReducers } from 'redux'

import session from "./reducers/sessionReducer"
import serviceDetails from "./reducers/servicioDetalleReducer";

const reducer = combineReducers({
    session,
    serviceDetails
});

const devtoools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(reducer, devtoools);