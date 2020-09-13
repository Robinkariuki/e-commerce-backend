const express = require('express');
const cartControllers = require('../controllers/cart-controller')


const router = express.Router()

router.post('/', cartControllers.addItemToCart);
router.get("/", cartControllers.getCart);
router.delete("/empty-cart", cartControllers.emptyCart);

module.exports = router;