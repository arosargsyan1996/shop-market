const jwt = require( 'jsonwebtoken' );
const ApiError = require( '../exceptions/ApiError' );
const tokenService = require( '../services/tokenService' );

module.exports = function ( role = 'USER' ) {
    return function ( req, res, next ) {
        if ( req.method === 'OPTIONS' ) {
            next();
        }
        try {
            const authorizationHeader = req.headers.authorization;
            if ( !authorizationHeader ) {
                return next( ApiError.unauthorized() );
            }

            const accessToken = authorizationHeader.split( ' ' )[ 1 ]; //Bearer token
            if ( !accessToken ) {
                return next( ApiError.unauthorized() );
            }

            const userData = tokenService.validateToken( accessToken );
            if ( !userData ) {
                return next( ApiError.unauthorized() );
            }
            console.log( userData, 66 );
            if ( userData.role !== role ) {
                return next( ApiError.noAccess() );
            }
            req.user = userData;
            next();
        } catch ( err ) {
            return next( ApiError.unauthorized() );
        }
    };
};