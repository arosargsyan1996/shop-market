require( 'dotenv' ).config();
const express = require( 'express' );
const { startDB } = require( './db' );
//const models = require( './models/models' );
const cors = require( 'cors' );
const cookieParser = require( 'cookie-parser' );
const fileUpload = require( 'express-fileupload' );
const router = require( './routes' );
const errorHandler = require( './middleware/errorHandlingMiddleware' );
const path = require( 'path' );

const PORT = process.env.PORT || 5000;

const app = express();
app.use( cors( {
    credentials: true,
    origin: process.env.CLIENT_URL
} ) );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.static( path.resolve( __dirname, 'static' ) ) );
app.use( fileUpload( {} ) );
app.use( '/api', router );

//last middleware
app.use( errorHandler );


const start = async () => {
    try {
        await startDB();
        app.listen( PORT, () => console.log( `Server started on port ${ PORT }` ) );
    } catch ( e ) {
        console.log( e, "Server start error" );
    }
};

start();