import { APP } from '../constants';

export const faker = () => ( {
    type: 'FAKER',
} );

export const setLoading = ( payload ) => ( {
    type: APP.SET_LOADING,
    payload
} );