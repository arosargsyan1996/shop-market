const { Type } = require( '../models/models' );
const TypeService = require( '../services/TypeService' );

module.exports = async function ( n ) {
    const last = await Type.findAll( {
        limit: 1,
        order: [ [ 'id', 'DESC' ] ]
    } );

    const lastId = last.length ? last[ 0 ].id : 0;

    console.log( last.length, lastId, last, 666 );

    Array.from(
        Array( n ),
        async ( v, i ) => await TypeService.create( `name${ i + lastId + 1 }` )
    );
};