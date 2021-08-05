import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setLoading } from 'store/actions/appActions';

// export function useRedirect( clearLoading = false ) {
//     const dispatch = useDispatch();
//     const { location, push } = useHistory();
//     if ( !clearLoading ) {
//         return ( to ) => {
//             push( to, location );
//         };
//     }
//     return async ( to ) => {
//         await dispatch( setLoading( null ) );
//         push( to, location );
//     };

// };

export const useRedirect = ( clearLoading = false ) => {
    const dispatch = useDispatch();
    const { location, push } = useHistory();
    return useCallback( ( async ( to ) => {
        if ( !clearLoading ) {
            push( to, location );
        } else {
            await dispatch( setLoading( null ) );
            push( to, location );
        }
    } ), [ dispatch, clearLoading, location, push ] );
};