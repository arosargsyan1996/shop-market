require( 'dotenv' ).config();
const { startDB } = require( '../db' );
const typeSeed = require( './typeSeed' );

startDB();
typeSeed( 10 );