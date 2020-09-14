const express = require('express');
const cartControllers = require('../controllers/cart-controller')


const router = express.Router()

router.post('/addtocart', cartControllers.addItemToCart);
router.get("/get-cart", cartControllers.getCart);
router.delete("/empty-cart", cartControllers.emptyCart);
router.delete("/remove-ItemCart",cartControllers.removeItemCart)

module.exports = router;