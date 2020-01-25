const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const ArchiveCardController = require('../controllers/ArchiveCardController');

router.post('/', verifyToken, ArchiveCardController.create);
router.delete('/:cardId', verifyToken, ArchiveCardController.destroy);

module.exports = router;
