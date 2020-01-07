const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const ListOrderController = require('../controllers/ListOrderController');

router.put('/', verifyToken, ListOrderController.update);

module.exports = router;
