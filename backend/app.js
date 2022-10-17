const express=require("express");
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config.env"})
  }
// const dotenv=require("dotenv");
// dotenv.config({path:"backend/config.env"})
const bodyParser=require("body-parser");
const errormiddleware=require("./middleware/error.js");
const cookieParser=require("cookie-parser");
const fileUpload=require("express-fileupload")

const path=require("path")
const user=require("./routes/userroute.js");
const product=require("./routes/productroutes.js");
const payment=require("./routes/paymentroute.js");
const order=require("./routes/orderroute.js")
const app=express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload())



app.use("/api",user)
app.use("/api",product)
app.use("/api",payment)
app.use("/api",order)


app.use(express.static(path.join(__dirname,"../frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

app.use(errormiddleware);

module.exports=app;