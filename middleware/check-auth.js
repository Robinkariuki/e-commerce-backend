const jwt = require('jsonwebtoken');

const HttpError = require('../util/http-error')
module.exports = (req,res,next)=>{
 
        try {
            const token = req.headers.authorization.split(' ')[1]; //Authorization:'Bearer Token'
            console.log(token)
            if(!token){ 
                throw new Error('Authentication failed')
            }
           const decodedToken= jwt.verify(token,'escapades')
           req.userData ={userId:decodedToken.payload}
           next();
        } catch (err) {
            const error = new HttpError('Authentication failed', 401)
        return next(error)
        }
        
    };
