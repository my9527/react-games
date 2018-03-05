import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';

const logger = store => next => action => {
    console.log('dispatching', action)
    return next(action)
}


export default createStore(rootReducer, applyMiddleware(logger));