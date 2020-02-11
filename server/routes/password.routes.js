const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const PasswordController = require('../controllers/PasswordController');

router.put('/', verifyToken, PasswordController.update);

module.exports = router;
