const express = require('express');

const { validationResult }  = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const e = require('express');

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
        userId:user.id
       });
   }
   
   );
  
}

const login = async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
   
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
               res.status(200).json({token});
           }
        )    

    }catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
    }
}

exports.login =login
exports.signup =signup