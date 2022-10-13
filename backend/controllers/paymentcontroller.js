
const dotenv=require("dotenv")
dotenv.config({path:"backend/config.env"})
const catchasyncerror=require("../middleware/catchasyncerror.js")
const stripe=require("stripe")(process.env.SECRET_KEY)

exports.paymentprocess=catchasyncerror(async(req,res,next)=>{
    const mypayment=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"usd",
        metadata:{
            company:"ecommerce"
        }


    });
    res.status(200).json({
        success:true,
        client_secret:mypayment.client_secret,
    })
});


exports.sendstripekey=catchasyncerror(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        sendapikey:process.env.stripe_publishable_key,
    })
})