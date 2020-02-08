const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const UserController = require('../controllers/UserController');

router.put('/', verifyToken, UserController.update);

module.exports = router;
