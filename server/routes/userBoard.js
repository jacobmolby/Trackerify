const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const UserBoardController = require('../controllers/UserBoardController');

router.post('/', verifyToken, UserBoardController.create);
// router.get('/:id', verifyToken, UserBoardController.show);
router.delete('/:userId&:boardId', verifyToken, UserBoardController.destroy);

module.exports = router;
