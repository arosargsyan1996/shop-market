import { APP } from '../constants';

export const setLoading = ( payload ) => ( {
    type: APP.SET_LOADING,
    payload
} );