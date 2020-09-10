const Product = require('../models/product')
const { validationResult }  = require('express-validator');
const product = require('../models/product');




const getProducts = async(req,res,next)=>{
  const products = await product.find();
  res.status(200).json({products});
};





const createProduct = async (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(errors)
  }
  const {name,price,description} = req.body;
  const image = req.file.path
  const createdProduct = new Product({
    name,
    description,
    price,
    image
  });
  try {
    await createdProduct.save()
    res.status(200).json({
      data:createdProduct
    })
  } catch (error) {
    return next(error)
  }
 
}





exports.getProducts= getProducts;
exports.createProduct = createProduct;