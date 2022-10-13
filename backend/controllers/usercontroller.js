const catchasyncerror=require("../middleware/catchasyncerror.js")
const Errorhandler=require("../utils/errorhandler.js")
const userdata=require("../models/userschema.js");
const cloudinary=require("cloudinary");
const sendtoken=require("../utils/sendtoken.js");
const crypto=require("crypto");
const sendEmail=require("../utils/sendEmail.js")

exports.getalluser=catchasyncerror(async(req,res,next)=>{
    const alluser=await userdata.find();
    res.status(200).json({
        success:true,
        alluser,
    })
});

exports.registerusercontroller=catchasyncerror(async(req,res,next)=>{
    const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatar',
        width:150,
        crop:"scale"
    });
    const {name,email,password}=req.body;
    const user=await userdata.create({
        name,email,password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    });
    sendtoken(user,201,res)
   
});

exports.loginusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return next(new Errorhandler("plz enter email and password",400))
    };
    const user=await userdata.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("invalid email or password",401))
    };
    const matchpassword=await user.comparepassword(password);
    if(!matchpassword){
        return next(new Errorhandler("invalid email or password", 401))
    };
    sendtoken(user,200,res)
});

exports.logoutusercontroller=catchasyncerror(async(req,res,next)=>{
    
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"logout successfully"
    })
});

exports.getuserprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
});

exports.getsingleuserdetailcontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id)
    if(!user){
        return next(new Errorhandler("user not found",400))
    };
    res.status(200).json({
        success:true,
        user,
    })
});

// exports.updaterolecontroller=catchasyncerror(async(req,res,next)=>{
//     const user=await userdata.findById(req.params.id)
//     if(!user){
//         return next(new Errorhandler("user not found",400))
//     };
//     const 
// })

exports.updaterolecontroller=catchasyncerror(async(req,res,next)=>{

   const user=await userdata.findById(req.params.id)
    if(!user){
        return next(new Errorhandler("user not found",400))
    };
    const newuserdata={
        email:req.body.email,
        name:req.body.name,
        role:req.body.role,
    };
    await userdata.findByIdAndUpdate(req.params.id,newuserdata,{
        new:true,
        runValidators:true,
        UserFindAndModify:false,
    });
    res.status(200).json({
        success:true,

    })
});

exports.updatepasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id).select("+password")
    const matchpassword=await user.comparepassword(req.body.oldpassword);
    if(!matchpassword){
        return next(new Errorhandler("password is invalid",401))
    };
    if(req.body.newpassword!==req.body.confirmpassword){
        return next(new Errorhandler("password not matched",400))
    };
    user.password=req.body.newpassword;
    await user.save()
    res.status(200).json({
        success:true,
    })
});

exports.updateprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const userdata={
        name:req.body.name,
        email:req.body.email
    };
    if(req.body.avatar!==""){
        const user=await userdata.findById(req.user.id);
        const ImageId=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(ImageId);
        const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatar",
            width:150,
            crop:"scale"
        });
        userdata.avatar={
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    };
    const user=await userdata.findByIdAndUpdate(req.user.id,userdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
    })

});

exports.deleteusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);
    if(!user){
        return next(new Errorhandler("user not found",400))
    };
    const ImageId=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(ImageId);
    await user.remove();
    res.status(200).json({
        success:true,
        message:"remove successfully"
    })
});

exports.forgotpasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findOne({email});
    if(!user){
        return next(new Errorhandler("user not found",400))
    };
    const resettoken=user.getresetpasswordtoken();
    await user.save({validateBeforeSave:false})
    const resetpasswordurl=`${process.env.forgotpassword_url}/reset/password/${resettoken}`;
    const message=`your reset password token is -:\n\n ${resetpasswordurl}\n\n :- if you did not order this token then ignore it`;

    try {
        await sendEmail({
            email:user.email,
            subj:"password recovery",
            message
        });
        res.status(200).josn({
            success:true,
            message:"email sent successfully"
        })
        
    } catch (error) {
        user.resetpasswordexpire=undefined,
        user.resetpasswordtoken=undefined,
        await user.save({validateBeforeSave:false})
        return next(new Errorhandler("server error",500))
        
    }
});

exports.resetpasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const resettoken=req.params.token;
    const resetpasswordtoken=crypto.createHash("sha256").update(resettoken).digest("hex");
    const user=await userdata.findOne({
        resetpasswordtoken,
        resetpasswordexpire:{$gt:Date.now()}
    });
    if(!user){
        return next(new Errorhandler("your json web token is expired try again plz", 400))
    };
    if(req.body.newpassword!==req.body.confirmpassword){
        return next(new Errorhandler("password not matched",400))
    };
    user.password=req.body.newpassword;
    user.resetpasswordtoken=undefined;
    user.resetpasswordexpire=undefined;
    await user.save();
    res.status(200).json({
        success:true,
    })
})