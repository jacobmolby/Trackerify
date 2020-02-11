const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const ProfileImageController = require('../controllers/ProfileImageController');

router.get('/', verifyToken, ProfileImageController.create);
router.put('/', verifyToken, ProfileImageController.update);
router.delete('/', verifyToken, ProfileImageController.destroy);

module.exports = router;
