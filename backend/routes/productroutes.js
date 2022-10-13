const express=require("express");
const { getalladminproduct, createproductcontroller, searchproductcontroller, getsingleproductcontroller, createreviewcontroller, getallreviewcontroller, deleteproductcontroller, updateproductcontroller } = require("../controllers/productcontroller");
const {authuser, authrole}=require("../middleware/auth.js")
const router=express.Router()


router.route("/products").get(getalladminproduct)
router.route("/product/new").post(createproductcontroller)
router.route("/product/search").get(searchproductcontroller);
router.route("/product/:id").get(getsingleproductcontroller);
router.route("/review/new").put(authuser,createreviewcontroller);
router.route("/reviews").get(getallreviewcontroller)
router.route("/admin/product").get(authuser,authrole("admin"),getalladminproduct)
router.route("/admin/product/new").post(authuser,authrole("admin"),createproductcontroller)
router.route("/admin/product/:id").delete(authuser,authrole("admin"),deleteproductcontroller).put(authuser,authrole("admin"),updateproductcontroller)







module.exports=router;