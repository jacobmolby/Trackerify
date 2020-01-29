const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const TeamBoardController = require('../controllers/TeamBoardController');

router.post('/', verifyToken, TeamBoardController.create);
router.delete('/:teamId&:boardId', verifyToken, TeamBoardController.destroy);

module.exports = router;
