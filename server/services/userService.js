const { User, Basket } = require( '../models/models' );
const ApiError = require( '../exceptions/ApiError' );
const uuid = require( 'uuid' );
const bcrypt = require( 'bcrypt' );
const mailService = require( './mailService' );
const tokenService = require( './tokenService' );
const UserDto = require( '../dtos/userDto' );
const userError = require( '../exceptions/constants' ).user;

class UserService {
    async registration( email, password, role ) {
        const candidate = await User.findOne( { where: { email } } );
        if ( candidate ) {
            throw ApiError.badRequest( 'Registration error', { email: userError.email.isUnique } );
        }
        const hashPassword = await bcrypt.hash( password, 3 );
        const activationLink = uuid.v4();

        const user = await User.create( { email, password: hashPassword, role, activationLink } );
        const basket = await Basket.create( { userId: user.id } );
        await mailService.sendActivationMail( email, `${ process.env.API_URL }/api/user/activate/${ activationLink }` );

        const userDto = new UserDto( user );
        const tokens = tokenService.generateTokens( { ...userDto } );
        await tokenService.saveRefreshToken( userDto.id, tokens.refreshToken );

        return { ...tokens, user: userDto };
    }

    async login( email, password ) {
        const user = await User.findOne( { where: { email } } );
        if ( !user ) {
            throw ApiError.badRequest( 'Authentication error', userError.authentication );
        }

        const isPassEquals = await bcrypt.compare( password, user.password );
        if ( !isPassEquals ) {
            throw ApiError.badRequest( 'Authentication error', userError.authentication );
        }

        const userDto = new UserDto( user );
        const tokens = tokenService.generateTokens( { ...userDto } );
        await tokenService.saveRefreshToken( userDto.id, tokens.refreshToken );

        return { ...tokens, user: userDto };
    }

    async logout( refreshToken ) {
        return await tokenService.removeToken( refreshToken );
    }

    async activate( activationLink ) {
        const user = await User.findOne( { where: { activationLink } } );
        if ( !user ) {
            throw ApiError.badRequest( 'Not correct activation link' );
        }

        user.isActivated = true;
        await user.save();
    }

    async refresh( refreshToken ) {
        console.log( 'USER:SERVICE', refreshToken, 88 );

        if ( !refreshToken ) {
            throw ApiError.unauthorized();
        }
        const userData = tokenService.validateToken( refreshToken, 'REFRESH' );
        const tokenFromDb = await tokenService.findToken( refreshToken );
        console.log( 'USER:SERVICE', userData, tokenFromDb, 88 );
        if ( !userData || !tokenFromDb ) {
            throw ApiError.unauthorized();
        }
        console.log( 'USER:SERVICE', userData, tokenFromDb, 8888 );

        const user = await User.findOne( { where: { id: userData.id } } );
        const userDto = new UserDto( user );
        const tokens = tokenService.generateTokens( { ...userDto } );
        await tokenService.saveRefreshToken( userDto.id, tokens.refreshToken );

        return { ...tokens, user: userDto };
    }

    async getUsers() {
        const users = await User.findAll();
        return users;
    }
}

module.exports = new UserService();