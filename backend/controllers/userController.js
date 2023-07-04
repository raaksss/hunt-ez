const asyncHandler=require("express-async-handler");
const User = require("../models/userModel");
User
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs");
const Token=require("../models/tokenModel");
const crypto=require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken=(id) => { 
return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})


};
const registerUser=asyncHandler (async(req,res) => {
const {name,email,password,institnname} = req.body



//Validation
if(!name || !email || !password || !institnname){
    res.status(400)
    throw new Error("Please fill in all required fields")
}
if(password.length<6){
    res.status(400)
    throw new Error("Password must be up to 6 characters")
}

//User email unique
const userExists= await User.findOne({email})
if(userExists){
    res.status(400)
    throw new Error("Email has already been registered")
}

const user=await User.create({name,
email,
password,
institnname});

const token=generateToken(user.id);

res.cookie("token",token,{

    path:"/",
    httpOnly:true,
    expires:new Date(Date.now()+1000* 86400),
    sameSite:"none",
    secure:true
})



if(user){
    const{id,name,email,institnname,phone,designation,institnaddress}=user
    res.status(201).json({
        id,name,email,institnname,phone,designation,institnaddress,token
    });
}
else{
    res.status(400)
    throw new Error("Inavlid user data! User not registered")
}

 });
 
const loginUser= asyncHandler(async(req,res) => { 
    const{email,password}=req.body


    if(!email || !password){
        res.status(400)
    throw new Error("Please add email and password");
    }
const user=await User.findOne({email})

if(!user){
    res.status(400)
    throw new Error("User not found,please signup");
}
const passwordIsCorrect=await bcrypt.compare(password,user.password)

const token=generateToken(user.id);
if(passwordIsCorrect){
res.cookie("token",token,{

    path:"/",
    httpOnly:true,
    expires:new Date(Date.now()+1000* 86400),
    sameSite:"none",
    secure:true
});
}

if(user && passwordIsCorrect){
    const{id,name,email,institnname,phone,designation,institnaddress}=user
    res.status(200).json({
        id,name,email,institnname,phone,designation,institnaddress,token
    });
}
else{
    res.status(400)
    throw new Error("Invalid credentials");
}

});

const logout=asyncHandler(async(req,res)=>{
    res.cookie("token","",{

        path:"/",
        httpOnly:true,
        expires:new Date(0),
        sameSite:"none",
        secure:true
    });
    return res.status(200).json({message:"SUCCESS"});
});

const getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id);
    if(user){
        const{id,name,email,institnname,phone,designation,institnaddress}=user
        res.status(200).json({
            id,name,email,institnname,phone,designation,institnaddress,
        });
    }
    else{
        res.status(400)
        throw new Error("User not found");
    }
    
});
const loginStatus=asyncHandler(async(req,res)=>{
const token=req.cookies.token;
if(!token){
   return res.json(false)
}
const verified=jwt.verify(token,process.env.JWT_SECRET);
if(verified){
   return res.json(true)
}
return res.json(false)
});

const updateUser=asyncHandler(
    async(req,res)=>{
const user=await User.findById(req.user.id);
if(user){
    const{name,email,institnname,phone,designation,institnaddress}=user;
    user.email=email;
    user.name=req.body.name|| name;
    user.phone=req.body.phone|| phone;
    user.institnname=req.body.institnname|| institnname;
    user.designation=req.body.designation|| designation;
    user.institnaddress=req.body.institnaddress|| institnaddress;

    const updateUser=await user.save();
    res.status(200).json(
        {
                id:updateUser.id,name:updateUser.name,email:updateUser.email,institnname:updateUser.institnname,phone:updateUser.phone,designation:updateUser.designation,institnaddress:updateUser.institnaddress,token:updateUser.token
            });
        }
else{
    res.status(404);
    throw new Error("User not found");
}
    });
const changePassword=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id);
const {oldPassword,password}=req.body
if(!user){
    res.status(404);
    throw new Error("User not found");
}
if(!oldPassword|| !password)
{
    res.status(404);
    throw new Error("Please add old and new password"); 
}
const passwordIsCorrect=await bcrypt.compare(oldPassword,user.password)

if(user && passwordIsCorrect){
user.password=password
await user.save()
res.status(200).send("Password changed successfully")
}
else{
    res.status(404);
    throw new Error("Old password is incorrect");
}






});


const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }
  
    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }
  
    // Create Reste Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);
  
    // Hash token before saving to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Save Token to DB
    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 10 * (60 * 1000), // Ten minutes
    }).save();
  
    // Construct Reset Url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  
const message=`
<h2>Hello ${user.name}</h2>
<p>We have received a request to reset your password</p>
<p>Use the below link to reset:</p>
<p>The link is valid for only 10 minutes</p>

<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
`;

const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // fIND tOKEN in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: "Password Reset Successful, Please Login",
  });
});

module.exports={
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
};