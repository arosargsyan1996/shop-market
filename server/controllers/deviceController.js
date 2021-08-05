const uuid = require( 'uuid' );
const path = require( 'path' );
const { Device, DeviceInfo } = require( '../models/models' );
const ApiError = require( '../exceptions/ApiError' );

class DeviceController {
    constructor() {
        this.create = this.create.bind( this );
    }

    async _uploadFile( img, fileName ) {
        img.mv(
            path.resolve( __dirname, '..', 'static', fileName ),
            err => err && next( ApiError.internal( 'Server error' ) )
        );
    }

    async create( req, res, next ) {
        try {
            const { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files ? req.files : { img: null };
            const fileName = img ? uuid.v4() + '.jpg' : null;

            try {
                const device = await Device.create( { name, price, brandId, typeId, img: fileName } );

                if ( img ) {
                    await this._uploadFile( img, fileName );
                }

                if ( info ) {
                    JSON.parse( info ).forEach( i => {
                        DeviceInfo.create( {
                            title: i.title,
                            description: i.description,
                            deviceId: device.id
                        } );
                    } );
                }

                res.json( device );
            } catch ( err ) {
                //console.log( 222222, err );
                next( ApiError.validateDB( err ) );
            }
        } catch ( err ) {
            next( ApiError.badRequest( err.message ) );
        }
    };

    async getAll( req, res ) {
        let { brandId, typeId, limit = 9, page = 1 } = req.query;
        let offset = page * limit - limit;
        let devices;

        if ( !brandId && !typeId ) {
            devices = await Device.findAndCountAll( { limit, offset } );
        } else if ( brandId && !typeId ) {
            devices = await Device.findAndCountAll( { where: { brandId }, limit, offset } );
        } else if ( !brandId && typeId ) {
            devices = await Device.findAndCountAll( { where: { typeId }, limit, offset } );
        } else if ( brandId && typeId ) {
            devices = await Device.findAndCountAll( { where: { typeId, brandId }, limit, offset } );
        }

        res.json( devices );
    };

    async getOne( req, res ) {
        const { id } = req.params;
        const device = await Device.findOne( {
            where: { id },
            include: [ { model: DeviceInfo, as: 'info' } ]
        } );

        return res.json( device );
    };
}

module.exports = new DeviceController();