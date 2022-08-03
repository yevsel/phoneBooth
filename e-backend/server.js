const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const phoneModel = require("./model/phoneModel")
const cloudinary = require('./utils/cloudinary')
const bodyParser = require("body-parser")
const app = express()


// Middlewares
// app.use(bodyParser({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"50mb"}))
app.use(cors({
    origin:"*"
}))

// Routes
// upload to DB
app.post("/phones/upload",async (req,res)=>{
    try{
        // const data = req.body
        const {imagePreview} = req.body
        // Send Image first to cloudinary
        const imageUploadResponse = await cloudinary.uploader.upload(
            imagePreview,{
                upload_preset:"phones_setup"
            }
        )
        // Upload secured image url to DB
        const resultFromMongo = await phoneModel.create({
            name: req.body.name,
            description:req.body.description,
            category:req.body.category.toLowerCase(),
            newPrice:req.body.newPrice,
            oldPrice:req.body.oldPrice,
            imagePreview:imageUploadResponse.secure_url,
            createdAt:new Date().getTime()
        })
        res.json({message:"OK"})

        // console.log(data)
    }catch(error){
        res.json({message:"FAILED"})
    }
})

// Get all phones
app.get("/phones",async(req,res)=>{
    try {
        const data = await phoneModel.find().limit(6)
        res.json(data)
    } catch (error) {
        console.log(error.message)
    }
})

// Dynamic Route
app.get("/phones/:category",async(req,res)=>{
    try {
        const getFromDB = await phoneModel.find({category:req.params.category.toLowerCase()})
        // console.log(req.params.category)
        
        res.json(getFromDB)
    } catch (error) {
        console.log(error.message)
    }
})

// Single Phone
app.get("/phones/single/:id",async(req,res)=>{
    try {
        const result = await phoneModel.findById(req.params.id)
        // console.log(req.params.id)
        res.json(result)
    } catch (error) {
        console.log(error.message)
    }
})

// Find by date
app.post("/get/by_date",async(req,res)=>{
    try {
        const result = await phoneModel.find({createdAt:{$gt:req.body.lastDate}})
        res.json(result)
    } catch (error) {
        console.log(error.message)
    }
})

// Find with search bar
app.post("/search",async(req,res)=>{
    try {
        // console.log(req.body.data)
        let payload = req.body.data.trim()
        // Use regex to fetch
        let search = await phoneModel.find({name:{$regex:new RegExp("^"+payload+".*","i")}}).exec()
        res.json(search)
        
    } catch (error) {
        console.log(error.message)
    }
})

// Get 

// ENV
const PORT = process.env.PORT || 4500
const HOST = process.env.HOST
const DB = process.env.DB

// Connect to DB
mongoose.connect(DB,()=>{
    console.log("Database is live.....")
})

// Listening...
app.listen(PORT,()=>{
    console.log(`Listening live on ${HOST}:${PORT}`)
})