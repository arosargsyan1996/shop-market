const ApiError = require( '../exceptions/ApiError' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const { User } = require( '../models/models' );
const userService = require( '../services/userService' );
const { validationResult } = require( 'express-validator' );
const validationErrorDto = require( '../dtos/validationErrorDto' );

class UserController {
    // constructor() {
    //     this.registration = this.registration.bind( this );
    //     this.login = this.login.bind( this );
    //     this.check = this.check.bind( this );
    // }

    // generateToken( id, email, role ) {
    //     return jwt.sign(
    //         { id, email, role },
    //         process.env.JWT_ACCESS_SECRET,
    //         { expiresIn: '24h' }
    //     );
    // }

    async registration( req, res, next ) {
        try {
            const errors = validationResult( req );
            if ( !errors.isEmpty() ) {
                const errorDto = new validationErrorDto( errors.array() );
                return next( ApiError.badRequest( 'Validation error', { ...errorDto } ) );
            }
            const { email, password, role } = req.body;
            const userData = await userService.registration( email, password, role );
            res.cookie( 'refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true } );

            return res.json( userData );
        } catch ( err ) {
            next( err );
        }
    };

    async login( req, res, next ) {
        try {
            const errors = validationResult( req );
            if ( !errors.isEmpty() ) {
                const errorDto = new validationErrorDto( errors.array() );
                return next( ApiError.badRequest( 'Validation error', { ...errorDto } ) );
            }

            const { email, password } = req.body;
            const userData = await userService.login( email, password );
            res.cookie( 'refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true } );

            return res.json( userData );
        } catch ( err ) {
            next( err );
        }
    };

    async logout( req, res, next ) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout( refreshToken );
            res.clearCookie( 'refreshToken' );
            res.status( 200 ).json( token );
        } catch ( err ) {
            next( err );
        }
    }

    async activate( req, res, next ) {
        try {
            const activationLink = req.params.link;
            await userService.activate( activationLink );
            return res.redirect( process.env.CLIENT_URL );
        } catch ( err ) {
            console.log( err );
        }
    }

    async refresh( req, res, next ) {
        try {
            const { refreshToken } = req.cookies;
            console.log( 'USER:CONTROLLER', refreshToken, 66 );
            const userData = await userService.refresh( refreshToken );
            res.cookie( 'refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true } );

            return res.json( userData );

        } catch ( err ) {
            next( err );
        }
    }

    async getUsers( req, res, next ) {
        try {
            const users = await userService.getUsers();
            res.json( users );
        } catch ( err ) {
            next( err );
        }
    }

    // async check( req, res, next ) {
    //     const token = this.generateToken( req.user.id, req.user.email, req.user.role );
    //     res.json( { token } );
    // };
}

module.exports = new UserController();