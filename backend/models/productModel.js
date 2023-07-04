const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,required:true,
    ref:"user"
   },
   sku:{
    type:String,
    required:true,
    default:"SKU",
    trim:true,
   },
   name:{
    type:String,
    required:[true,"Please add a name"],
    trim:true
   },
   category:{
    type:String,
    required:[true,"Please add a category"],
    trim:true,
   },
   quantity:{
    type:String,
    required:[true,"Please add a quanitity"],
    trim:true,
   },
   price:{
    type:Number,
    required:[true,"Please add a price"],
    trim:true,
   },
   position:{
    type:String,
    required:[true,"Please add a position"],
    trim:true,
   },
   image:{
    type:Object,
    default:{}
   }


},{
    timestamps:true,
}
);
const Product=mongoose.model("Product",productSchema)
module.exports=Product