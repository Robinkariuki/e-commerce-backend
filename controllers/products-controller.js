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

  const createdProduct = new Product({
    name,
    description,
    price,
    image:req.file.path,
  });
  console.log(req.file.path)
  try {
    
    await createdProduct.save()
    res.status(200).json({
      data:createdProduct
    })
  } catch (error) {
    return next(error)
  }
 
}

const getProductById = async(req,res,next)=>{
  const productId = req.params.id

  let productDetails
  try {
      productDetails = await Product.findById(productId);
      res.status(200).json({data:productDetails})
  } catch (error) {
    return next(error)
  }

}


const removeProductById = async (req,res)=>{
  const productId = req.params.id

  let productDetails;
  try {
     productDetails = await Product.removeProduct(productId)
     res.status(200).json({data:productDetails})
  } catch (error) {
  return next(error)    
  }
}



exports.getProducts= getProducts;
exports.createProduct = createProduct;
exports.getProductById = getProductById;
exports.removeProductById = removeProductById;