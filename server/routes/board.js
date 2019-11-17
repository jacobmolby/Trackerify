const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const BoardController = require('../controllers/BoardController');

router.get('/:id', verifyToken, BoardController.show);
router.post('/', verifyToken, BoardController.create);
router.delete('/:id', verifyToken, BoardController.destroy);

module.exports = router;
