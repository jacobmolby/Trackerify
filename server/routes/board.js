const router = require('express').Router();
const verifyToken = require('./verifyToken');
const BoardController = require('../controllers/BoardController');

router.get('/board/:id', verifyToken, BoardController.show);
router.post('/board/', verifyToken, BoardController.create);
router.delete('/board/:id', verifyToken, BoardController.destroy);

module.exports = router;
