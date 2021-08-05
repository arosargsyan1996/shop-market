import { clearUserError } from 'store/actions/userActions';


export function apiErrorsSideEffect( apiErrors, setError, setFormError, dispatch ) {
    const apiErrorKeys = Object.keys( apiErrors );
    if ( apiErrorKeys.length ) {
        apiErrorKeys.forEach( ( key ) => {
            if ( key !== 'common' ) {
                setError( key, { type: 'apiError', message: apiErrors[ key ] }, { shouldFocus: true } );
            } else {
                setFormError( apiErrors[ key ] );
                setError( 'email', { type: 'apiError', message: null }, { shouldFocus: true } );
                setError( 'password', { type: 'apiError', message: null } );
            }
        } );
        dispatch( clearUserError() );
    }
}

export function clearErrorsSideEffect( emailError, passwordError, clearErrors, setFormError ) {
    if ( ( emailError === null || passwordError === null ) && !( emailError === null && passwordError === null ) ) {
        setFormError( '' );
        ( emailError === null ) ? clearErrors( 'email' ) : clearErrors( 'password' );
    }
}