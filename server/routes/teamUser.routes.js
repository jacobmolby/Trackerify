const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const TeamUserController = require('../controllers/TeamUserController');

router.post('/', verifyToken, TeamUserController.create);
router.delete('/:teamId&:userId', verifyToken, TeamUserController.destroy);

module.exports = router;
