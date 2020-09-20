const Product = require('../models/product');
const cartRepo = require('../controllers/repository');
const e = require('express');
const { compare } = require('bcryptjs');






const removeProductCart = async(req,res)=>{
 const {productId} = req.body
try{
    let cart = await cartRepo.cart()
    let productDetails = await Product.findById(productId);

    let indexFound = cart.items.findIndex(item => item.productId.id == productId);
    if(!productDetails){
        return res.status(500).json({ type:"Not found", msg:"invalid request"})
    }
   
    
    if (cart ){
        
        if (indexFound !== -1){
            cart.items.splice(indexFound,1);
            if(cart.items.length==0){
                cart.subTotal = 0;
            }
        }else{
            cart.subTotal = cart.items.map(item=>item.total).reduce((acc,next)=>acc+next);
        }        
        await cart.save()

        return res.status(200).json({type:"deleted Product",data:cart})

    }else{
        return res.status(500).json({ type:"Not found", msg:"invalid request"})
    }
}catch(err){
    return err
}
}




const addQuantityCart = async (req,res)=>{
    const {productId}= req.body

    try{
        let cart = await cartRepo.cart()
        let quantity = await cart.items.quantity
        let productDetails = await Product.findById(productId);
        if(!productDetails){
            return res.status(500).json({ type:"Not found", msg:"invalid request"})
        }
        
        //if cart Exists ---

    if (cart){
               //---- check if index exists ----
      const indexFound = cart.items.findIndex(item => item.productId.id == productId);
        //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
        if (indexFound !== -1 && quantity <= 0 ){
            cart.items.splice(indexFound,1);
            if(cart.items.length==0){
            cart.subTotal = 0;
        }else{
            cart.subTotal = cart.items.map(item=>item.total).reduce((acc,next)=>acc+next);
        }
        
        }
       //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
       else if (indexFound !== -1){
        cart.items[indexFound].quantity = cart.items[indexFound].quantity + 1;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next); 
       }
       //----Check if Quantity is Greater than 0 then add item to items Array ----
       else if (quantity > 0) {
           cart.items.push({
               productId:productId,
               quantity:quantity,
               price:productDetails.price,
               total: parseInt(productDetails.price * quantity)
           })
           cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
       }
        //----if quantity of price is 0 throw the error -------
        else{
            return res.status(400).json({type: "Invalid", msg: "Invalid request"})
        }
        let data = await cart.save();
        res.status(200).json({ type:"success", msg:"process Successful",data:data})
    }
//------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
else {
     const cartData = {
         items :[{
             productId: productId,
             quantity:quantity,
             total:parseInt(productDetails.price * quantity),
             price: productDetails.price
         }],
         subTotal :parseInt(productDetails.price *quantity)

    }
    
     cart = await cartRepo.addItem(cartData)
     
    // let data = await cart.save();
    res.json(cart);
}

}catch (err){
    console.log(err)
    res.status(400).json({type:"invalid",msg:"Something went wrong", err:err})
}

}











const subtractQuantityCart = async (req,res)=>{
    
    const {productId} = req.body
   
    
    try{
        let cart = await cartRepo.cart()
        let quantity = await cart.items.quantity
        let productDetails = await Product.findById(productId);
        if(!productDetails){
            return res.status(500).json({ type:"Not found", msg:"invalid request"})
        }
        
        //if cart Exists ---

    if (cart){
               //---- check if index exists ----
      const indexFound = cart.items.findIndex(item => item.productId.id == productId);
        //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
        if (indexFound !== -1 && quantity <= 0 ){
            cart.items.splice(indexFound,1);
            if(cart.items.length==0){
            cart.subTotal = 0;
        }else{
            cart.subTotal = cart.items.map(item=>item.total).reduce((acc,next)=>acc+next);
        }
        
        }
       //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
       else if (indexFound !== -1){
        cart.items[indexFound].quantity = cart.items[indexFound].quantity - 1;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price
        cart.items[indexFound].image = productDetails.image
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next); 
       }
       //----Check if Quantity is Greater than 0 then add item to items Array ----
       else if (quantity > 0) {
           cart.items.push({
               productId:productId,
               quantity:quantity,
               price:productDetails.price,
               image:image,
               total: parseInt(productDetails.price * quantity)
           })
           cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
       }
        //----if quantity of price is 0 throw the error -------
        else{
            return res.status(400).json({type: "Invalid", msg: "Invalid request"})
        }
        let data = await cart.save();
        res.status(200).json({ type:"success", msg:"process Successful",data:data})
    }
//------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
else {
     const cartData = {
         items :[{
             productId: productId,
             quantity:quantity,
             total:parseInt(productDetails.price * quantity),
             price: productDetails.price
         }],
         subTotal :parseInt(productDetails.price *quantity)

    }
     cart = await cartRepo.addItem(cartData)
    // let data = await cart.save();
    res.json(cart);
}

}catch (err){
    console.log(err)
    res.status(400).json({type:"invalid",msg:"Something went wrong", err:err})
}



}

///jasdbjhsbdjhasjhdjasdhasdjhas




const addItemToCart = async (req,res)=>{
    const {productId} = req.body
    const quantity = Number.parseInt(req.body.quantity);
    try{
        let cart = await cartRepo.cart()
        let productDetails = await Product.findById(productId);
        if(!productDetails){
            return res.status(500).json({ type:"Not found", msg:"invalid request"})
        }
        
        //if cart Exists ---

    if (cart){
               //---- check if index exists ----
      const indexFound = cart.items.findIndex(item => item.productId.id == productId);
        //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
        if (indexFound !== -1 && quantity <= 0 ){
            cart.items.splice(indexFound,1);
            if(cart.items.length==0){
            cart.subTotal = 0;
        }else{
            cart.subTotal = cart.items.map(item=>item.total).reduce((acc,next)=>acc+next);
        }
        
        }
       //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
       else if (indexFound !== -1){
        cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next); 
       }
       //----Check if Quantity is Greater than 0 then add item to items Array ----
       else if (quantity > 0) {
           cart.items.push({
               productId:productId,
               quantity:quantity,
               price:productDetails.price,
               image:productDetails.image,
               total: parseInt(productDetails.price * quantity)
           })
           cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
       }
        //----if quantity of price is 0 throw the error -------
        else{
            return res.status(400).json({type: "Invalid", msg: "Invalid request"})
        }
        let data = await cart.save();
        res.status(200).json({ type:"success", msg:"process Successful",data:data})
    }
//------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
else {
     const cartData = {
         items :[{
             productId: productId,
             quantity:quantity,
             total:parseInt(productDetails.price * quantity),
             price: productDetails.price,
             image:image
             
         }],
         subTotal :parseInt(productDetails.price *quantity)

    }
     cart = await cartRepo.addItem(cartData)
    // let data = await cart.save();
    res.json(cart);
}

}catch (err){
    console.log(err)
    res.status(400).json({type:"invalid",msg:"Something went wrong", err:err})
}



}



const getCart = async (req,res)=>{
    try{
        let cart = await cartRepo.cart()
        if(!cart){
            return res.status(400).json({type:"invalid",msg:"cart Not found"})
        }
        res.status(200).json({status:true,data:cart})
    }catch(err){
        console.log(err)
        res.status(400).json({type:"invalid",msg:"something went wrong",err:err})
    }
    
}

const emptyCart = async (req,res)=>{
    try{
        let cart = await cartRepo.cart()
        cart.items =[];
        cart.subTotal= 0
        let data = await cart.save();
        res.status(200).json({type:"success",msg:"cart Has been emptied",data:data})
    }catch(err){
        console.log(err)
        res.status(400).json({type:"invalid",msg:"something went wrong", err:err})
    }
}


exports.addItemToCart = addItemToCart
exports.getCart = getCart
exports.emptyCart = emptyCart
exports.subtractQuantityCart =subtractQuantityCart
exports.addQuantityCart=addQuantityCart
exports.removeProductCart= removeProductCart;