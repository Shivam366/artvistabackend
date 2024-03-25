const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addtocart', cartController.addToCart);
router.put('/updateCart',cartController.updatedCartItems);
router.delete('/remove', cartController.removeFromCart);
router.get('/:userId', cartController.getCart);

module.exports = router;
