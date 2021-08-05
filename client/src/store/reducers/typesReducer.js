import { TYPES } from '../constants';

const initialState = {
	types: [],
	errors: {}
};

const typesReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'FAKE':
			return {
				...state,
			};
		case TYPES.ADD_TYPES_ERROR:
			return {
				...state,
				errors: action.payload
			};
		case TYPES.CLEAR_TYPES_ERROR:
			return {
				...state,
				errors: {}
			};
		case TYPES.SUCCESS:
			return {
				...state,
				errors: {}
			};
		case TYPES.ADD_TYPE:
			console.log( action.payload );
			return {
				...state,
				types: [ ...state.types, action.payload ],
			};
		case TYPES.FETCH_TYPES:
			return {
				...state,
				types: action.payload
			};
		default:
			return state;
	}
};

export default typesReducer;
