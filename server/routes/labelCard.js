const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const LabelCardController = require('../controllers/LabelCardController');

router.post('/', verifyToken, LabelCardController.create);
router.delete('/:cardId&:labelId', verifyToken, LabelCardController.destroy);

module.exports = router;
