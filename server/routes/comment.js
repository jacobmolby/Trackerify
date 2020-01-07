const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const CommentController = require('../controllers/CommentController');

router.post('/', verifyToken, CommentController.create);
//router.get('/:id', verifyToken, CommentController.show);
router.delete('/:commentId', verifyToken, CommentController.destroy);

module.exports = router;
