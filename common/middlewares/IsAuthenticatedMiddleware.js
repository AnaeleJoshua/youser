const jwt = require('jsonwebtoken');
const {jwsecret} = require("../../config/config");

module.exports = {
    check: (req,res,next)=>{
        const authHeader = req.headers['authorization'];

        //IF ni auth header are provided
        // then return 401 unauthorized error
        if (!authHeader){
            return res.status(401).json({
                status:false,
                error:{
                    message: 'Auth headers not provided in the request'
                }
            });
        }

        //if bearer auth header is not provided
        // then return 401 unauthorized error
        if(!authHeader.startWith('Bearer')){
            return res.status(401).json({
                status:false,
                error:{
                    message: "Invalid auth mechanism"
                }
            })
        }
        const token = authHeader.split(' ')[1];

        //IF bearer auth header is provided, but token is not provided
        //Then return 401 unauthorized error
        if (!token){
            return res.status(401).json({
                status:false,
                error:{
                    message: 'Bearer token missing in the authorization header'
                }
            })
        }

        jwt.verify(token, jwsecret, (err,user) =>{
            if (err){
                return res.status(403).json({
                    status:false,
                    error:'invalid access token provided, please login again'
                })
            }
            req.user = user; //save the user object for further use
            next();
        })
    }
}