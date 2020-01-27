const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const TeamController = require('../controllers/TeamController');

router.post('/', verifyToken, TeamController.create);
router.get('/', verifyToken, TeamController.index);

module.exports = router;
