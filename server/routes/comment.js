const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const CommentController = require('../controllers/CommentController');

router.post('/', verifyToken, CommentController.create);
//router.get('/:id', verifyToken, CommentController.show);
router.delete('/:id', verifyToken, CommentController.destroy);

module.exports = router;
