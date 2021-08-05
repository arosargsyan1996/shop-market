import { APP } from '../constants';

const initialState = {
    isLoading: null
};

const appReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case APP.SET_LOADING:
            console.log( 'SET LOADING TO->' + action.payload );
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};

export default appReducer;