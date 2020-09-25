const express = require('express');
const cartControllers = require('../controllers/cart-controller')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()
// router.use(checkAuth);
router.post('/addtocart', cartControllers.addItemToCart);
router.get("/get-cart", cartControllers.getCart);
router.delete("/empty-cart", cartControllers.emptyCart);
router.post("/reduce-quantity",cartControllers.subtractQuantityCart)
router.post("/increase-quantity",cartControllers.addQuantityCart)
router.post("/remove-product",cartControllers.removeProductCart)

module.exports = router;