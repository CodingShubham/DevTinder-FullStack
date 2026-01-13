
const jwt=require("jsonwebtoken");
const userModel=require("../Model/user");

const userAuth= async (req,res,next)=>{

    try{

        const {token}=req.cookies;
        if(!token){

           return res.status(401).send("Please Login In ");

        }

        const decodeObj=await jwt.verify(token, "shubham678");
        const{_id}=decodeObj;

        const user= await userModel.findById(_id);

        if(!user){

            throw new Error("User not found");
        }

        req.user=user;
        next();

    }

    catch(err){

        res.status(400).send("error"+err.message);

    }

}



module.exports=userAuth