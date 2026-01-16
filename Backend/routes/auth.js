const express=require("express");
const userModel=require("../Model/user");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const {validateSignupData}=require("../utils/validation");




const authRouter=express.Router();
    
// Sign UP API

authRouter.post("/signup", async(req,res)=>{

    const{firstName,lastName,emailId,password}=req.body;
    const user=new userModel({
        firstName,
        lastName,
        emailId,
        password
    });

    validateSignupData(req);

    const hashed_pass= await bcrypt.hash(password, 10);
  
    user.password=hashed_pass;


    

    await user.save();
    res.send("user registered sucessfully");


});


// Login API

authRouter.post("/login", async(req,res)=>{

    const{firstName, password,emailId}=req.body;
   

    try{

          const userdata= await userModel.findOne({emailId:emailId});

          if(!userdata){
            throw new Error("user not exists");
          }


          const validpassword= await bcrypt.compare(password,userdata.password);
          
          if(validpassword){
            
            //create jwt token and pass in the cookie

            const token= await jwt.sign({_id:userdata._id}, "shubham678");
            console.log(token);

            //create cookie

            res.cookie("token",token,{
            httpOnly: true,
            sameSite: "lax",
            secure: false // set true if using https
            });
            res.send(userdata);

          }

          else{
            throw new Error("invalid credentials");
          }
    }

    catch(err){

        res.status(400).send("Not Exists");
    }

});


    //Logout  API

    authRouter.post("/logout", (req,res)=>{

    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false // must match the login cookie
  });

        res.send("Logout Sucessfully");

    });

    module.exports=authRouter;