const express = require('express');

const fileUpload = require('../util/up-load')


const productControllers = require('../controllers/products-controller');
const router = express.Router()


router.get('/products',productControllers.getProducts)

router.get('/products/:productId',productControllers.getProductById)
router.post('/addproduct',fileUpload.single('image'),productControllers.createProduct)
router.delete('/products/:productId',productControllers.removeProductById)




module.exports= router