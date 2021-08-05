import { TYPES } from '../constants';

const setTypes = ( payload ) => ( {
    type: TYPES.FETCH_TYPES,
    payload
} );

export const fetchTypes = () => (
    async ( dispatch, getState ) => {
        if ( getState().user.isAuth ) {
            try {
                const types = await axios.get( 'type' );
                dispatch( setTypes( types.rows ) );
            } catch ( err ) {
                console.log( 'CHSTACAR TYPERI INFON APE', err );
            }
        }
    }
);

export const createType = ( type ) => (
    async ( dispatch ) => {
        try {
            const newType = await axios.post( 'type', type );
            // dispatch( {
            //     type: TYPES.ADD_TYPE,
            //     payload: newType
            // } );
            dispatch( {
                type: TYPES.SUCCESS
            } );
        } catch ( err ) {
            dispatch( {
                type: TYPES.ADD_TYPES_ERROR,
                payload: err.message
            } );
        }
    }
);

export const clearTypeError = () => ( {
    type: TYPES.CLEAR_TYPES_ERROR,
} );