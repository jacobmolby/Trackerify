const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const CardOrderController = require('../controllers/CardOrderController');

router.put('/', verifyToken, CardOrderController.update);

module.exports = router;
