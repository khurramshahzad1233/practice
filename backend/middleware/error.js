const Errorhandler=require("../utils/errorhandler.js")

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"internal server error";

    if(err.name==="CastError"){
        const message="invalid resource not found";
        err=new Errorhandler(message,400)
    };

    if(err.code===11000){
        const message="dublicate key error invalid try agian plz";
        err=new Errorhandler(message,400)
    };

    if(err.name==="jsonWebTokenError"){
        const message="your json web token is invalid try agina plz";
        err=new Errorhandler(message,400)
    };

    if(err.name==="TokenExpiredError"){
        const message="your json web token is expired try agian plz";
        err=new Errorhandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}