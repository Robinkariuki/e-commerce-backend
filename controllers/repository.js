const Cart = require('../models/cart');




// get all cart items method
exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price total"
    });;
    return carts[0];
};
//add item to cart model method
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}