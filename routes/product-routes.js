const express = require('express');


const productControllers = require('../controllers/products-controller');
const router = express.Router()


router.get('/products',productControllers.getProducts)

module.exports= router