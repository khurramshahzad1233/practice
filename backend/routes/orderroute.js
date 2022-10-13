const express=require("express")
const { createnewordercontroller, getmyordercontroller, getsingleordercontroller, getallordercontroller, deleteordercontroller, orderstatuscontroller } = require("../controllers/ordercontroller")
const {authuser,authrole}=require("../middleware/auth.js")
const router=express.Router()

router.route("/order/new").post(authuser,createnewordercontroller);
router.route("/order/me").get(authuser,getmyordercontroller)
router.route("/order/:id").get(authuser,getsingleordercontroller)
router.route("/admin/order").get(authuser,authrole("admin"),getallordercontroller)
router.route("/admin/order/:id").delete(authuser,authrole("admin"),deleteordercontroller)
router.route("/admin/order/:id").put(authuser,authrole("admin"),orderstatuscontroller)

module.exports=router