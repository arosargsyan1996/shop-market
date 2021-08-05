const TypeService = require( '../services/TypeService' );

module.exports = function ( n ) {
    Array.from(
        Array( n ),
        async ( v, i ) => await TypeService.create( `name${ i + 1 }` )
    );
};