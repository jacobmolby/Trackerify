const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const TeamController = require('../controllers/TeamController');

router.post('/', verifyToken, TeamController.create);
router.get('/', verifyToken, TeamController.index);
router.put('/', verifyToken, TeamController.update);
router.delete('/:teamId', verifyToken, TeamController.destroy);

module.exports = router;
