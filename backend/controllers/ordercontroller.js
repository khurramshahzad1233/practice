const catchasyncerror=require("../middleware/catchasyncerror")
const Errorhandler=require("../utils/errorhandler.js")
const orderdata=require("../models/orderschema.js")

exports.createnewordercontroller=catchasyncerror(async(req,res,next)=>{
    const {
        shippinginfo,
        orderitem,
        paymentinfo,
        itemprice,
        taxprice,
        shippingprice,
        totalprice,
    }=req.body;
    const neworder=await orderdata.create({
        shippinginfo,
        orderitem,
        paymentinfo,
        itemprice,
        taxprice,
        totalprice,
        user:req.user._id,
        shippingprice,
    });
    res.status(201).json({
        success:true,
        neworder,
    })
});

exports.getallordercontroller=catchasyncerror(async(req,res,next)=>{
    const allorder=await orderdata.find();
    res.status(200).json({
        success:true,
        allorder,
    })
});

exports.getsingleordercontroller=catchasyncerror(async(req,res,next)=>{
    const order=await orderdata.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if(!order){
        return next(new Errorhandler("order not found",400))
    }
    res.status(200).json({
        success:true,
        order
    })
});

exports.getmyordercontroller=catchasyncerror(async(req,res,next)=>{
    const myorder=await orderdata.find({user:req.user._id});
    if(!myorder){
        return next(new Errorhandler("no order yet",400))
    };
    res.status(200).json({
        success:true,
        myorder,
    })
})

exports.deleteordercontroller=catchasyncerror(async(req,res,next)=>{
    const order=await orderdata.findById(req.params.id)
    if(!order){
        return next(new Errorhandler("order not found",400))
    };
    await order.remove()
    res.status(200).json({
        success:true,
    })
});

exports.orderstatuscontroller=catchasyncerror(async(req,res,next)=>{
    const order=await orderdata.findById(req.params.id)
    if(!order){
        return next(new Errorhandler("order not found",400))
    };
    if(order.orderstatus==="delivered"){
        return next(new Errorhandler("your order is already been delivered",400))
    };
    order.orderstatus=req.body.status;
    if(req.body.status==="shipping"){
        order.orderitem.forEach(async(ord)=>{
            await updatestock(ord.product,ord.quantity)

        });

    };
    if(req.body.status==="delivered"){
        order.deliveredAt=Date.now();
    };
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })
})
