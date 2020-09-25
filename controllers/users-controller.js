const { validationResult }  = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');


const signup = async (req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }

    const{username,password,email} = req.body;

    let user = await User.findOne({email:email});
    if(user){
        return res.status(400).json({
            msg: "User Already Exists "
        });
    }
    user = new User({
        username,
        email,
        password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
 try {
    await user.save();
 } catch (error) {
     console.log(error)
 }
   

   const payload ={
       user:{
           id:user.id
       }
   };
   jwt.sign(payload,"escapades",{expiresIn:1000},
   (err,token)=>{
       if(err) throw err;
       res.status(200).json({
        token,
        email:user.email,
        userId:user.id,
        
        
       });
   }
   
   );
  
}

const login = async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    console.log(res)
    const { email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user)
        return res.status(400).json({
            message:"user does not exist"
        });
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(400).json({
                message:"Incorrect Password !"
            });

        const payload ={
            user:{
                id:user.id
            }
        };
        jwt.sign(
            payload,
            "escapades",
            {
                expiresIn:3600
            },
           (err,token) =>{
               if(err) throw err;
               res.status(200).json({token,userId:user.id});
               console.log(payload)
           }
        )    

    }catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
    }
}


const tokenIsValid = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
       
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token,'escapades');
      if (!verified) return res.json(false);
        console.log(verified)
      const user = await User.findById(verified.user.id);
     
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  const getUser = async (req, res) => {
    const user = await User.findById(req.userData.user.id);
    
    res.json({user});
  }

exports.login =login
exports.signup =signup
exports.tokenIsValid=tokenIsValid
exports.getUser =getUser