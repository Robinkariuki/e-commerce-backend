const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    username:{type:String,required:true},
    password:{type:String,required:true, minlength:6}
})



module.exports = mongoose.model('user',userSchema);