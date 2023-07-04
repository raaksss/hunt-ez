const dotenv=require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const userRoute=require("./routes/userRoute.js")
const productRoute=require("./routes/productRoute.js")
const app=express();
const errorHandler=require("./middleware/errorMiddleware.js");
const cookieParser = require("cookie-parser");
const path=require("path");

//MIDDLEWARES
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("./uploads",express.static(path.join(__dirname,"uploads")));
app.use(
    cors({
    origin:["http://localhost:3000","https://hunt-ez-app.vercel.app"],
    credentials: true
}));
//Routes Middleware
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);

//Routes
app.get("/",(req,res)=>{
res.send("Home Page");
});


//Error Middleware
app.use(errorHandler);


//CONNECT TO MONGO DB
const PORT=process.env.PORT || 5000;
mongoose.connect(`mongodb+srv://rakshita:01234@cluster0.rgcfppb.mongodb.net/hunt-ez?retryWrites=true&w=majority`).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
})
.catch((err)=>console.log(err));