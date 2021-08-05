const Router = require( 'express' );
const router = new Router();
const authMiddleware = require( '../middleware/authMiddleware' );
const userController = require( '../controllers/userController' );
const { check } = require( 'express-validator' );
const userError = require( '../exceptions/constants' ).user;

router.post( '/registration',
    check( 'email' )
        .isEmail().withMessage( userError.email.isEmail ),
    check( 'password' )
        .isLength( { min: 8, max: 32 } ).withMessage( userError.password.isLength ),
    userController.registration
);
router.post( '/login',
    check( 'email' )
        .isEmail().withMessage( userError.email.isEmail ),
    check( 'password' )
        .isLength( { min: 8, max: 32 } ).withMessage( userError.password.isLength ),
    userController.login
);
router.post( '/logout', userController.logout );
router.get( '/activate/:link', userController.activate );
router.get( '/refresh', userController.refresh );
router.get( '/', authMiddleware(), userController.getUsers );
//router.get( '/auth', authMiddleware(), userController.check );

module.exports = router;