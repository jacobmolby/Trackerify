const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const ListOrderController = require('../controllers/ListOrderController');

router.put('/', verifyToken, ListOrderController.update);

module.exports = router;
