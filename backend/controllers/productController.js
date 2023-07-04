const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary=require("cloudinary").v2;
// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku,category, quantity, price, position} = req.body;

  //   Validation
  if (!name || !category || !quantity || !price || !position || !sku) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

let fileData={}
if(req.file){
let uploadedFile;
try {
    uploadedFile=await cloudinary.uploader.upload(req.file.path,{folder:"hunt-ez app",resource_type:"image"})
} catch (error) {
    res.status(500);
    throw new Error("Image could not be uploaded");
}

    fileData={
        fileName:req.file.originalname,
        filePath:uploadedFile.secure_url,
        fileType:req.file.mimetype,
        fileSize:fileSizeFormatter(req.file.size,2),
    };
}

const product=await Product.create({
    user:req.user.id,
    sku,
    name,
    category,
    quantity,
    price,
    position,
    image:fileData,
});

res.status(201).json(product);
});

const getProducts=asyncHandler(async(req,res)=>{
const products=await Product.find({user:req.user.id}).sort("-createdAt")
res.status(200).json(products)
});

const getProduct=asyncHandler(async(req,res)=>{
const product=await Product.findById(req.params.id)
if(!product){
    res.status(404);
    throw new Error("Product not found");
}
if(product.user.toString() !== req.user.id){
    res.status(401);
    throw new Error("User not authorized");
}
res.status(200).json(product);
});

const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized");
    }
    await product.remove()
    res.status(200).json({message:"Product deleted."});
    });

    const updateProduct = asyncHandler(async (req, res) => {
        const { name, category, quantity, price, position} = req.body;

const {id}=req.params;
        const product=await Product.findById(id);
      
        if(!product){
            res.status(404);
            throw new Error("Product not found");
        }

        if(product.user.toString() !== req.user.id){
            res.status(401);
            throw new Error("User not authorized");
        }
      let fileData={}
      if(req.file){
      let uploadedFile;
      try {
          uploadedFile=await cloudinary.uploader.upload(req.file.path,{folder:"hunt-ez app",resource_type:"image"})
      } catch (error) {
          res.status(500);
          throw new Error("Image could not be uploaded");
      }
      
          fileData={
              fileName:req.file.originalname,
              filePath:uploadedFile.secure_url,
              fileType:req.file.mimetype,
              fileSize:fileSizeFormatter(req.file.size,2),
          };
      }
      const updatedProduct=await Product.findByIdAndUpdate(
        {id:id},
        {
            name,
            category,
            quantity,
            price,
            position,
            image:Object.keys(fileData).length===0 ? product?.image:fileData,
        },
        {
            new: true,
            runValidators:true,
        }
        
        )
      res.status(200).json(updatedProduct);
      });
module.exports={
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
};