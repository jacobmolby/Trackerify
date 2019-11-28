const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const CardController = require('../controllers/CardController');

router.post('/', verifyToken, CardController.create);
router.put('/', verifyToken, CardController.update);
router.delete('/:id', verifyToken, CardController.destroy);

module.exports = router;
