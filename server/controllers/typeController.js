const ApiError = require( '../exceptions/ApiError' );
const TypeService = require( '../services/TypeService' );

class TypeController {
    async create( req, res, next ) {
        const { name } = req.body;
        if ( !name ) {
            return next( ApiError.badRequest( { name: 'Name is required' } ) );
        }

        try {
            const type = await TypeService.create( name );
            return res.json( type );
        } catch ( err ) {
            next( err );
        }
    };

    async getAll( req, res, next ) {
        const { limit = 9, page = 1 } = req.query;

        try {
            const types = await TypeService.getAll( limit, page );
            return res.json( types );
        } catch ( err ) {
            next( err );
        }

    };
}

module.exports = new TypeController();