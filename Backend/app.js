
const connectDB=require("./config/database");
const userModel=require("./Model/user");
const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");
const authRouter=require("./routes/auth");
const {profileApi}=require("./routes/profile");
const {requestRouter}=require("./routes/request");

const cors=require("cors");
const userRouter = require("./routes/user");


app.use(cors({
  origin: "http://localhost:5173", // your React dev URL
  credentials: true
}));


app.use(express.json());
app.use(cookieparser());


connectDB().then(()=>{

    console.log("Database Connected Sucessfully");
    
    app.listen(3000,(req,res)=>{

        console.log("server is listening on port 3000")
        
    })


}).catch((err)=>{

          console.log("server is not connected")

});



    app.use("/", authRouter);
    app.use("/",profileApi)
    app.use("/",requestRouter)
    app.use("/",userRouter);













    // //Deleting data from database
    // app.delete("/user/:id", userAuth, async(req,res)=>{

    //     const userId=req.params.id;

    //     try{

    //         const data= await userModel.findByIdAndDelete(userId);
    //         res.send("deleted");
    //     }

    //     catch(err){

    //         res.status(400).send("Unable to delete");

    //     }


    // });



    // // UPDATING Data In Database
  






