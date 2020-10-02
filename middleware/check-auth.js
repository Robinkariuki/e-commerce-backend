const jwt = require('jsonwebtoken');

const HttpError = require('../util/http-error')

    const auth = (req,res,next)=>{
 
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token){ 
                throw new Error('Authentication failed')
            }
           const decodedToken= jwt.verify(token,process.env.JWT_KEY) 
         
           req.userData = decodedToken
          
           next();
        } catch (err) {
            const error = new HttpError('Authentication failed', 401)
        return next(error)
        }
        
    };


    module.exports = auth;