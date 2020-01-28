const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const UserSearchController = require('../controllers/UserSearchController');

router.get('/', verifyToken, UserSearchController.show);

module.exports = router;
