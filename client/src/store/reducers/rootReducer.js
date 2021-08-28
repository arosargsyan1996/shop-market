import { combineReducers } from 'redux';
import appReducer from './appReducer';
import kindReducer from './kindReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers( {
    app: appReducer,
    user: userReducer,
    kind: kindReducer,
} );

export default rootReducer;