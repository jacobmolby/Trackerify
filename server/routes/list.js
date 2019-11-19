const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const ListController = require('../controllers/ListController');

router.post('/', verifyToken, ListController.create);
router.get('/:id', verifyToken, ListController.show);
router.delete('/:id', verifyToken, ListController.destroy);

module.exports = router;
