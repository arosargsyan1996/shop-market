const jwt = require( 'jsonwebtoken' );
const { Token } = require( '../models/models' );

class TokenService {
    generateTokens( payload ) {
        const accessToken = jwt.sign( payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1500s'/* '30m' */ } );
        const refreshToken = jwt.sign( payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '3000s'/* '30d' */ } );

        return { accessToken, refreshToken };
    }

    validateToken( token, type = 'ACCESS' ) {
        try {
            let secret = process.env.JWT_ACCESS_SECRET;
            if ( type === 'REFRESH' ) {
                secret = process.env.JWT_REFRESH_SECRET;
            }

            const userData = jwt.verify( token, secret );
            return userData;
        } catch ( err ) {
            return null;
        }
    }

    async saveRefreshToken( userId, refreshToken ) {
        const tokenData = await Token.findOne( { where: { userId } } );
        if ( tokenData ) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }

        const token = await Token.create( { userId, refreshToken } );
        return token;
    }

    async removeToken( refreshToken ) {
        const token = await Token.findOne( { where: { refreshToken } } );
        await Token.destroy( { where: { refreshToken } } );
        return token;
    }

    async findToken( refreshToken ) {
        return await Token.findOne( { where: { refreshToken } } );
    }
}

module.exports = new TokenService();