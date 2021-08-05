import { combineReducers } from 'redux';
import appReducer from './appReducer';
import typesReducer from './typesReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers( {
    app: appReducer,
    user: userReducer,
    types: typesReducer,
} );

export default rootReducer;