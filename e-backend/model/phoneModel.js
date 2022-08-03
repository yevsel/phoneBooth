const mongoose = require("mongoose")

// Schema
const phoneModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imagePreview:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    newPrice:{
        type:Number
    },
    oldPrice:{
        type:Number
    },
    quantity:{
        type:Number,
        default:1
    },
    createdAt:{
        type:Number,
        // default:Date.now()
    }
})

module.exports=mongoose.model("phoneModel",phoneModel)