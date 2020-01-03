const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const LabelController = require('../controllers/LabelController');

router.post('/', verifyToken, LabelController.create);
//router.get('/:id', verifyToken, LabelController.show);
router.delete('/:boardId&:labelId', verifyToken, LabelController.destroy);

module.exports = router;
