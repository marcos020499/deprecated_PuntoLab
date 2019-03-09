import { createStore, combineReducers } from 'redux'

import session from "./reducers/sessionReducer"

const reducer = combineReducers({
    session
});

const devtoools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(reducer, devtoools);