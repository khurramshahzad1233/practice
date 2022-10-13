const Errorhandler=require("../utils/errorhandler.js")
const catchasyncerror=require("./catchasyncerror.js")
const jwt=require("jsonwebtoken")
const userdata=require("../models/userschema.js")


exports.authuser=catchasyncerror(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new Errorhandler("plz login to access the resource",401))
    };
    const accessdata=jwt.verify(token,process.env.jwt_secret_key);
    req.user=await userdata.findById(accessdata.id);
    next()

});

exports.authrole=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhandler("not authorized or invalid",401))
        };
        next()
    }
}