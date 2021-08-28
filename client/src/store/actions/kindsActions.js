import { KINDS } from '../constants';

const setKinds = ( payload = { data: [], pagesCount: 0, currentPage: null } ) => ( {
    type: KINDS.FETCH_KINDS,
    payload
} );

export const fetchKinds = ( page = 1 ) => (
    async ( dispatch, getState ) => {
        try {
            const state = getState().kind;
            if ( state.currentPage !== page ) {
                const kinds = await axios.get( `type?page=${ page }` );
                console.log( 'fetchKinds:Result', kinds );
                const pagesCount = !state.pagesCount && Math.ceil( kinds.count / kinds.rows.length );

                await dispatch( setKinds( { data: kinds.rows, pagesCount, currentPage: page } ) );
            }
        } catch ( err ) {
            console.log( 'CHSTACAR TYPERI INFON APE', err );
        }
    }
);

export const createKind = ( kind ) => (
    async ( dispatch ) => {
        try {
            const newKind = await axios.post( 'type', kind );
            // dispatch( {
            //     type: KINDS.ADD_KIND,
            //     payload: newKind
            // } );
            dispatch( {
                type: KINDS.SUCCESS
            } );
        } catch ( err ) {
            dispatch( {
                type: KINDS.ADD_KINDS_ERROR,
                payload: err.message
            } );
        }
    }
);

export const clearKindError = () => ( {
    type: KINDS.CLEAR_KINDS_ERROR,
} );