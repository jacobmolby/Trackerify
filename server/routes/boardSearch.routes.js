const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const BoardSearchController = require('../controllers/BoardSearchController');

router.get('/', verifyToken, BoardSearchController.show);

module.exports = router;
