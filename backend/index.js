const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
require("dotenv").config()
const PORT=process.env.PORT || 3000
const app=express()
app.use(express.json())
app.use(cors())
const userRoutes=require("./routes/userRoutes")
const productRoutes=require("./routes/productRoutes")
app.use("/API/user",userRoutes);
app.use("/API/product",productRoutes);
const database=process.env.DATABASE
mongoose.connect(database).then(()=>{
    console.log("Database Connected")
}).catch(err=>{
    console.log(err)
})
app.listen(PORT,()=>{
    console.log(`App Running on port ${PORT}`)
})
