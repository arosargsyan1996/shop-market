const ApiError = require( '../exceptions/ApiError' );
const { Type } = require( '../models/models' );

class TypeService {
    async create( name ) {
        try {
            return await Type.create( { name } );
        } catch ( err ) {
            throw ApiError.validateDB( err );
        }
    };

    async getAll( limit, page ) {
        const offset = page * limit - limit;

        try {
            return await Type.findAndCountAll( {
                limit,
                offset,
                order: [
                    [ 'id', 'ASC' ]
                ],
            } );
        } catch ( err ) {
            throw ApiError.internal( "Internal server error" );
        }
    };
}

module.exports = new TypeService();