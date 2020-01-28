const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const TeamBoardController = require('../controllers/TeamBoardController');

router.post('/', verifyToken, TeamBoardController.create);

module.exports = router;
