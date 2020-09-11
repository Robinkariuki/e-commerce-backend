const express = require('express');

const fileUpload = require('../util/up-load')


const productControllers = require('../controllers/products-controller');
const router = express.Router()


router.get('/products',productControllers.getProducts)


router.post('/addproduct',fileUpload.single('image'),productControllers.createProduct)



module.exports= router