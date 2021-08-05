const Router = require( 'express' );
const typeController = require( '../controllers/typeController' );
const authMiddleware = require( '../middleware/authMiddleware' );
const router = new Router();

router.post( '/', typeController.create );
router.get( '/', authMiddleware(), typeController.getAll );

module.exports = router;