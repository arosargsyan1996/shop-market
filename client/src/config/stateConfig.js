import { checkAuth } from 'store/actions/userActions';
import { setLoading } from 'store/actions/appActions';
import { fetchKinds } from 'store/actions/kindsActions';

const getPageOptions = ( path, getState ) => {
    const optionsUrlIndex = path.indexOf( '/', 1 );
    let urlRoute = '';
    let optionsUrl = '';

    if ( optionsUrlIndex === -1 ) {
        urlRoute = path;
    } else {
        urlRoute = path.slice( 0, optionsUrlIndex );
        optionsUrl = path.slice( optionsUrlIndex );
    }

    switch ( urlRoute ) {
        case '/type':
            return {
                options: [
                    { cb: fetchKinds, checkSuccess: () => !!getState().kind.data.length }
                ]
            };
        case '/login':
            return {
                unAuth: true
            };
        default:
            return {};
    }
};

export const stateSetUp = ( path = '/' ) => async ( dispatch, getState ) => {
    const { options = [], unAuth = null, auth = null } = getPageOptions( path, getState );
    const haveOptions = options.length;
    const isLoading = getState().app.isLoading;
    const res = {
        fetched: false,
        error: null,
        shouldRedirect: false,
        to: null
    };

    try {
        if ( isLoading === null && localStorage.getItem( 'token' ) ) {
            await dispatch( checkAuth() );
        }
        const isAuth = getState().user.isAuth;
        const shouldRedirect = ( isAuth && unAuth ) || ( !isAuth && auth ) || false;
        res.shouldRedirect = shouldRedirect;
        if ( isAuth && unAuth ) {
            res.to = '/';
        } else if ( !isAuth && auth ) {
            res.to = '/login';
        }

        !isLoading && haveOptions && await dispatch( setLoading( true ) );

        if ( !shouldRedirect && haveOptions ) {
            for ( let i = 0; i < options.length; i++ ) {
                console.log( 666666, !options[ i ].checkSuccess() );
                !options[ i ].checkSuccess() && await dispatch( options[ i ].cb() );
            }

            await dispatch( setLoading( false ) );

            res.fetched = true;
        } else if ( !shouldRedirect && !haveOptions && isLoading === null ) {
            await dispatch( setLoading( false ) );
        }
    } catch ( err ) {
        console.error( err );
    }

    console.log( res, 'res' );
    return res;
};
