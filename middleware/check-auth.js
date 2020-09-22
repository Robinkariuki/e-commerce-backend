const HttpError = require('../util/http-error')
module.exports = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]; //Authorization:'Bearer Token'
    if(!token){
        return 
    }
}