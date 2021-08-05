const userError = require( '../exceptions/constants' ).user;


class ApiError extends Error {
    status;
    errors;

    constructor( status, message, errors = [] ) {
        super( message );
        this.status = status;
        this.errors = errors;
    }

    static unauthorized() {
        return new ApiError( 401, userError.authorized );
    }

    static noAccess() {
        return new ApiError( 403, userError.noAccess );
    }

    static badRequest( message, errors = [] ) {
        return new ApiError( 400, message, errors );
    }

    static internal( message ) {
        return new ApiError( 500, message );
    }

    static forbidden( message ) {
        return new ApiError( 403, message );
    }

    static validateDB( err ) {
        if ( err.name === 'SequelizeDatabaseError' || !err.errors ) {
            return new Error( err );
        }

        const message = {};
        err.errors.forEach( er => {
            message[ er.path ] = er.message;
        } );

        return new ApiError( 500, message );
    }
}
module.exports = ApiError;