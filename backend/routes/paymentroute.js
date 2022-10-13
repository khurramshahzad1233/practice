const express=require("express");
const {authuser}=require("../middleware/auth.js")
const {sendstripekey, paymentprocess}=require("../controllers/paymentcontroller.js")
const router=express.Router()

router.route("/payment/process/").post(authuser,paymentprocess);
router.route("/stripeapikey").get(authuser,sendstripekey)



module.exports=router;