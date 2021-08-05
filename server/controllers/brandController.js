const ApiError = require( '../exceptions/ApiError' );
const { Brand } = require( '../models/models' );

class BrandController {
    async create( req, res, next ) {
        const { name } = req.body;
        if ( !name ) {
            return next( ApiError.badRequest( { message: 'Name is required' } ) );
        }

        try {
            const brand = await Brand.create( { name } );

            return res.json( brand );
        } catch ( err ) {
            console.log( 222222 );
            next( ApiError.validateDB( err ) );
        }
    }


    async getAll( req, res ) {

    };
}

module.exports = new BrandController();