import { USER } from '../constants';

const initialState = {
	user: {},
	errors: {},
	isAuth: false
};

const userReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'FAKE':
			return {
				...state,
			};
		case USER.REGISTRATION:
			return {
				...state,
				//errors: action.payload
			};
		case USER.SET_AUTH:
			return {
				...state,
				isAuth: action.payload
			};
		case USER.SET_USER:
			return {
				...state,
				user: action.payload
			};
		case USER.ADD_USER_ERROR:
			return {
				...state,
				errors: action.payload
			};
		case USER.CLEAR_USER_ERROR:
			return {
				...state,
				errors: {}
			};
		default:
			return state;
	}
};

export default userReducer;
