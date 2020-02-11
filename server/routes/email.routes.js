const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const EmailController = require('../controllers/EmailController');

router.put('/', verifyToken, EmailController.update);

module.exports = router;
