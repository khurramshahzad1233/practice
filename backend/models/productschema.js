const mongoose=require("mongoose")
const kittySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"plz enter product name"],
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        require:[true,"plz enter price"],
        maxLength:[8,"price cannot exceeded 8 characters"]
    },
    stock:{
        type:Number,
        required:true,
        maxLength:[4,"stock cannot exceeded 4 characters"]
    },
    category:{
        type:String,
        required:true,
    },
    ratings:{
        type:Number,
        required:true,
        default:0,
    },
    numofreview:{
        type:Number,
        required:true,
        default:0
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    image:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    review:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            }
        }
    ]

});
const productdata=mongoose.model("product",kittySchema)
module.exports=productdata;