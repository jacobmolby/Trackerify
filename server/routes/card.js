const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const CardController = require('../controllers/CardController');

router.post('/', verifyToken, CardController.create);
//router.get('/:id', verifyToken, CardController.show);
router.delete('/:id', verifyToken, CardController.destroy);

module.exports = router;
