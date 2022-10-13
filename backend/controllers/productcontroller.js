const Errorhandler=require("../utils/errorhandler.js")
const catchasyncerror=require("../middleware/catchasyncerror.js")
const productdata=require("../models/productschema.js")
const cloudinary=require("cloudinary");
const Apifeature=require("../utils/apifeature.js")


exports.getalladminproduct=catchasyncerror(async(req,res,next)=>{
    const allproduct=await productdata.find();
    res.status(200).json({
        success:true,
        allproduct,
    })
})

exports.searchproductcontroller=catchasyncerror(async(req,res,next)=>{
    const productcount=await productdata.countDocuments();
    const resultperpage=10;
    const apifeature=new Apifeature(productdata.find(),req.query)
    .search()
    .filter()
    .pagination(resultperpage);

    const product=await apifeature.query;
    const filterproductcount=product.length;

    res.status(200).json({
        success:true,
        product,
        productcount,
        filterproductcount,
        resultperpage,
    })

});


exports.createproductcontroller=catchasyncerror(async(req,res,next)=>{
    let images=[];
    if (typeof req.body.image==="string") {
        images.push(req.body.image)
        
    } else {
        images=req.body.image;
        
    };
    let imageslink=[];
    for(let i=0;i<images.length;i++){
        const mycloud=await cloudinary.v2.uploader.upload(images[i],{
            folder:"product"
        });
        imageslink.push({
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        })

    };
    req.body.image=imageslink;
    req.body.user=req.user.id;
    const product=await productdata.create(req.body);
    res.status(201).json({
        success:true,
        product,
    })
});

exports.updateproductcontroller=catchasyncerror(async(req,res,next)=>{
    let product=await productdata.findById(req.params.id)
    if(!product){
        return next(new Errorhandler("product not found",400))
    };
    let images=[];
    if (typeof req.body.image==="string") {
        images.push(req.body.image)
        
    } else {
        images=req.body.image
        
    }
    if(images!==undefined){
        for(let i=0;i<product.image.length;i++){
            await cloudinary.v2.uploader.destroy(product.image[i].public_id);
        };
        let imageslink=[];
        for(let i=0;i<images.length;i++){
            const mycloud=await cloudinary.v2.uploader.upload(images[i],{
                folder:"product"
            });
            imageslink.push({
                public_id:mycloud.public_id,
                url:mycloud.secure_url,
            })
        };
        req.body.image=imageslink;
    }
    product=await productdata.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });
    res.status(200).json({
        success:true,
    })
});

exports.deleteproductcontroller=catchasyncerror(async(req,res,next)=>{
    const product=await productdata.findById(req.params.id)
    if(!product){
        return next(new Errorhandler("product not found",400))
    };
    for(let i=0;i<product.image.length;i++){
        await cloudinary.v2.uploader.destroy(product.image[i].public_id)

    };
    await product.remove();
    res.status(200).json({
        success:true,
    })
});

exports.getsingleproductcontroller=catchasyncerror(async(req,res,next)=>{
    const product=await productdata.findById(req.params.id)
    if(!product){
        return next(new Errorhandler("product not found",400))
    };
    res.status(200).json({
        success:true,
        product,
    })
});

exports.getallreviewcontroller=catchasyncerror(async(req,res,next)=>{
    const product=await productdata.findById(req.query.id)
    if(!product){
        return next(new Errorhandler("product not  found",400))
    };
    res.status(200).json({
        success:true,
        allreview:product.review,
    })
});

exports.createreviewcontroller=catchasyncerror(async(req,res,next)=>{
    const {productid,comment,rating}=req.body;
    const product=await productdata.findById(productid);
    if(!product){
        return next(new Errorhandler("product not found",400))
    };
    const review={
        user:req.user._id,
        name:req.user.name,
        comment:comment,
        rating:Number(rating)
    };

    const isreviewed=product.review.find((rev)=>rev.user.toString()===req.user._id.toString());
    if (isreviewed) {
        product.review.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString())
            (rev.comment=comment),
            (rev.rating=rating)
        })
        
    } else {
        product.review.push(review);
        product.numofreview=product.review.length;
        
    };
    let sum=0;
    product.review.forEach((rev)=>{
        sum+=rev.rating;
    });
    product.ratings=sum/product.review.length;
    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,

    })

});


exports.deletereviewcontroller=catchasyncerror(async(req,res,next)=>{
    const product=await productdata.findById(productid);
    if(!product){
        return next(new Errorhandler("product not found",400))
    };
    const review=product.review.filter((rev)=>{rev._id.toString!==req.query.id.toString()});
    let sum=0;
    review.forEach((rev)=>{
        sum+=rev.rating;
    });
    let ratings=0;
    if (rev.length===0) {
        ratings=0
        
    } else {
        ratings=sum/review.length;
        
    }
    const numofreview=review.length;
    product=await productdata.findByIdAndUpdate(req.query.productid,{
        review,
        ratings,
        numofreview,
    },{
        new:true,
        runValidators:true,
        useFindandModify:false,
    });
    res.status(200).json({
        success:true,
    })
})