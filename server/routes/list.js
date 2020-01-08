const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const ListController = require('../controllers/ListController');

router.post('/', verifyToken, ListController.create);
router.get('/:id', verifyToken, ListController.show);
router.put('/', verifyToken, ListController.update);

module.exports = router;
