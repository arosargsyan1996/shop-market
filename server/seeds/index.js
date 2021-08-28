require( 'dotenv' ).config();
const { startDB } = require( '../db' );
const typeSeed = require( './typeSeed' );

startDB();

( async () => {
    await typeSeed( 1000 );
} )();