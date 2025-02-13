const express = require('express');
const router = express.Router();
const aftermarketController = require('../controllers/aftermarketController');

router.get('/', aftermarketController.getAllAftermarketParts);
router.get('/:id', aftermarketController.getAftermarketPartById);
router.post('/', aftermarketController.createAftermarketPart);
router.put('/:id', aftermarketController.updateAftermarketPart);
router.delete('/:id', aftermarketController.deleteAftermarketPart);

module.exports = router;
