const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const AttachmentController = require('../controllers/AttachmentController');

router.post('/', verifyToken, AttachmentController.create);
//router.get('/:id', verifyToken, AttachmentController.show);
router.delete('/:id', verifyToken, AttachmentController.destroy);

module.exports = router;
