import { USER } from '../constants';
import { axiosWithoutInterceptors } from 'config/apiConfig';


const setAuth = ( payload ) => ( {
    type: USER.SET_AUTH,
    payload
} );

const setUser = ( payload ) => ( {
    type: USER.SET_USER,
    payload
} );

export const clearUserError = () => ( {
    type: USER.CLEAR_USER_ERROR,
} );

export const userLogin = ( userData ) => (
    async ( dispatch ) => {
        try {
            const user = await axios.post( 'user/login', userData );
            localStorage.setItem( 'token', user.accessToken );

            console.log( user, 'user' );
            dispatch( setAuth( true ) );
            dispatch( setUser( user.user ) );
        } catch ( err ) {
            console.log( err, 'USER:err' );
            dispatch( {
                type: USER.ADD_USER_ERROR,
                payload: typeof err.errors === 'object' ? err.errors : { common: err.errors }
            } );
        }
    }
);

export const logout = () => ( async ( dispatch ) => {
    try {
        const response = await axios.post( 'user/logout' );
        console.log( response, 'USER:logout' );

        localStorage.removeItem( 'token' );
        dispatch( setAuth( false ) );
        dispatch( setUser( {} ) );
    } catch ( err ) {
        console.log( err, 'USER:logout' );
    }
} );

export const userRegistration = ( userData ) => (
    async ( dispatch ) => {
        try {
            const user = await axios.post( 'user/registration', userData );
            // if ( user.email ) {
            //     <Redirect to={ { pathname: '/search', data: { data } } }
            // }
            console.log( user, 'user' );

        } catch ( err ) {
            console.log( err, 'USER:err' );
            dispatch( {
                type: USER.ADD_USER_ERROR,
                payload: err.errors
            } );
        }
    }
);

export const checkAuth = () => ( async ( dispatch ) => {
    try {
        const response = await axiosWithoutInterceptors.get( 'user/refresh' );
        console.log( 'checkAuth', response );
        dispatch( setAuth( true ) );
        dispatch( setUser( response.data.user ) );
    } catch ( err ) {
        localStorage.removeItem( 'token' );
        console.log( 'checkAuth', err );
    }
} );