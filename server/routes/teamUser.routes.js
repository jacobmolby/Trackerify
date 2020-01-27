const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const TeamUserController = require('../controllers/TeamUserController');

router.post('/', verifyToken, TeamUserController.create);

module.exports = router;
