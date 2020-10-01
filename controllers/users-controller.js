
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');


const signup = async (req,res,next)=>{
    try {
 
   
    const{username,password,email} = req.body;
       // validate

       if (!username || !password || !email)
       return res.status(400).json({ msg: "Not all fields have been entered." });
     if (password.length < 6)
       return res
         .status(400)
         .json({ msg: "The password needs to be at least 6 characters long." });
     

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
 
    await user.save();

   

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
        user,
        
        
       });
   }
   
   );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
  
}

const login = async (req,res)=>{

   
    try{
    const { email, password} = req.body;
    
        if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

        let user = await User.findOne({email});
        if(!user)
        return res.status(400).json({
            msg: "No account with this email has been registered." 
        });
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(400).json({
                msg: "Invalid credentials."
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
              
           }
        )    

    }catch (err) {
       
        res.status(500).json({
            error: err.message
        });
    }
}


const tokenIsValid = async (req, res) => {
   
    try {
        const token = req.headers.authorization.split(' ')[1];
      
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token,'escapades');
      if (!verified) return res.json(false);
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