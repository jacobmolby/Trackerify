const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const BoardController = require('../controllers/BoardController');

router.get('/', verifyToken, BoardController.index);
router.get('/:id', verifyToken, BoardController.show);
router.post('/', verifyToken, BoardController.create);
router.put('/', verifyToken, BoardController.update);
router.delete('/:id', verifyToken, BoardController.destroy);

module.exports = router;
