const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const UserCardController = require('../controllers/UserCardController');

router.post('/', verifyToken, UserCardController.create);
// router.get('/:id', verifyToken, UserBoardController.show);
// router.delete('/:id', verifyToken, UserBoardController.destroy);

module.exports = router;
