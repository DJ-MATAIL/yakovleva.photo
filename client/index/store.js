import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const reduxInitialState = window.__REDUX_STATE__
delete window.__REDUX_STATE__

export default createStore(
    reducer,
    reduxInitialState,
    applyMiddleware(thunk)
)
