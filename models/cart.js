const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const itemSchema = new Schema({
productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
quantity:{type:Number, required:true, min:[1,'Quantity can not be less then 1.']},
price:{type:Number, required:true},
total:{type:Number, required:true,timestamps:true},
image:{type:String, required:true},
name:{type:String, required:true}

})



const cartSchema = new Schema({
 items:[itemSchema],
 subTotal:{default:0,type:Number, timestamps:true},
})


module.exports =mongoose.model('Cart',cartSchema)