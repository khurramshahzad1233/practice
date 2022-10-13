const express=require("express")
const { getalluser, registerusercontroller, loginusercontroller, getuserprofilecontroller, logoutusercontroller, deleteusercontroller, updaterolecontroller, getsingleuserdetailcontroller } = require("../controllers/usercontroller");
const {authuser, authrole}=require("../middleware/auth.js")
const router=express.Router()

router.route("/user").get(getalluser);
router.route(`/user/register`).post(registerusercontroller);
router.route(`/user/login`).post(loginusercontroller);
router.route("/me").get(authuser,getuserprofilecontroller)
router.route("/logout").get(logoutusercontroller)
router.route("/admin/user").get(authuser,authrole("admin"),getalluser);
router.route("/admin/user/:id").delete(authuser,authrole("admin"),deleteusercontroller)
router.route(`/admin/user/:id`).put(authuser,authrole("admin"),updaterolecontroller)
router.route(`/admin/user/:id`).get(authuser,authrole("admin"),getsingleuserdetailcontroller)

module.exports=router;