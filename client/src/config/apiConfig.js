import axios from 'axios';

export const axiosWithoutInterceptors = axios.create( {
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
} );

window.axios = axios;
//axios.defaults.headers.common[ 'X-Requested-With' ] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.timeout = 50000;

axios.interceptors.request.use( ( request ) => {
    request.headers.authorization = `Bearer ${ localStorage.getItem( 'token' ) }`;
    return request;
} );

axios.interceptors.response.use( ( response ) => {
    return response.data;
}, async ( error ) => {
    const originalRequest = error?.config;
    console.log( error.response, originalRequest?._isRetry, 'RESPONSE INTERCEPTOR' );
    if ( error?.response?.status === 401 && !originalRequest?._isRetry && localStorage.getItem( 'token' ) ) {
        originalRequest._isRetry = true;
        try {
            console.log( 'ACCESS TOKEN DIE' );
            const response = await axiosWithoutInterceptors.get( 'user/refresh' );
            console.log( 'IF REFRESH TOKEN NOT DIE', response );

            localStorage.setItem( 'token', response.data.accessToken );
            return axios.request( originalRequest );
        } catch ( e ) {
            // if ( localStorage.getItem( 'token' ) ) {
            //     localStorage.removeItem( 'token' );
            // }
            console.log( 'NOT AUTHORIZED!!!', e );
        }
    }

    console.log( 'will throw error', error.response.data, originalRequest._isRetry );
    throw error.response.data;
} );