const jwt = require('jsonwebtoken');

const HttpError = require('../util/http-error')
// (req, res, next) => {
//     try {
//       const token = req.header("x-auth-token");
//       if (!token)
//         return res
//           .status(401)
//           .json({ msg: "No authentication token, authorization denied." });
  
//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       if (!verified)
//         return res
//           .status(401)
//           .json({ msg: "Token verification failed, authorization denied." });
  
//       req.user = verified.id;
//       next();
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
module.exports = (req,res,next)=>{
 
        try {
            const token = req.headers.authorization.split(' ')[1]; //Authorization:'Bearer Token'
            if(!token){ 
                throw new Error('Authentication failed')
            }
           const decodedToken= jwt.verify(token,'escapades') 
           console.log(decodedToken)
           req.userData = decodedToken
           console.log(req.userData)
           next();
        } catch (err) {
            const error = new HttpError('Authentication failed', 401)
        return next(error)
        }
        
    };
