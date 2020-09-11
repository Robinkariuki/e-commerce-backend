const express = require('express');

const fileUpload = require('../util/up-load')


const productControllers = require('../controllers/products-controller');
const router = express.Router()


router.get('/',productControllers.getProducts)

router.get('/:id',productControllers.getProductById)
router.post('/addproduct',fileUpload.single('image'),productControllers.createProduct)
router.delete('/:id',productControllers.removeProductById)




module.exports= router