import { KINDS } from '../constants';

const initialState = {
	data: [],
	errors: {},
	pagesCount: 0,
	currentPage: null,
};

const kindReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case KINDS.ADD_KINDS_ERROR:
			return {
				...state,
				errors: action.payload
			};
		case KINDS.CLEAR_KINDS_ERROR:
			return {
				...state,
				errors: {}
			};
		case KINDS.SUCCESS:
			return {
				...state,
				errors: {}
			};
		case KINDS.ADD_KIND:
			console.log( action.payload );
			return {
				...state,
				data: [ ...state.data, action.payload ],
			};
		case KINDS.FETCH_KINDS:
			return {
				...state,
				data: action.payload.data,
				pagesCount: action.payload.pagesCount || state.pagesCount,
				currentPage: action.payload.currentPage,
			};
		// case KINDS.SET_PAGES_COUNT:
		// 	return {
		// 		...state,
		// 		pagesCount: action.payload
		// 	};
		// case KINDS.SET_CURRENT_PAGE:
		// 	return {
		// 		...state,
		// 		currentPage: action.payload
		// 	};
		default:
			return state;
	}
};

export default kindReducer;
