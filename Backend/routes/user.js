const express=require("express");
const userAuth = require("../Middlewares/authMiddleware");
const ConnectionRequestModel=require("../Model/connectionRequest");
const userRouter=express.Router();
const User=require("../Model/user");



userRouter.get("/user/requests/recieved", userAuth, async(req,res)=>{

    try{

        const loggedINuser=req.user;

        const connectionRequest=await ConnectionRequestModel.find({

            toUserId:loggedINuser._id,
            status:"interested",

            
        }).populate("fromUserId", ["firstName"]);

        res.json({
            message:"Data Fetched Sucessfully",
            data:connectionRequest,
        })

    }

    catch(err){
        res.status(400).send("No requests Found");
    }
});


    userRouter.get("/user/connections", userAuth, async(req,res)=>{
        try{
        const loggedUser=req.user;

        const connectionRequest=await ConnectionRequestModel.find({

            $or:[
                {toUserId:loggedUser._id, status:"accepted"},
                {fromUserId:loggedUser._id, status:"accepted"},
            ]



        }).populate("fromUserId",["firstName","photoUrl"]).populate("toUserId", ["firstName","photoUrl"]);

        const data=connectionRequest.map((row)=>{

            if(row.fromUserId._id.toString()===loggedUser._id.toString()){

                return row.toUserId;
            }
            
            return row.fromUserId;
        });

           res.json({data});



    }

    catch(err){
        res.status(400).send("No Connections Exists");
    }


    });



    userRouter.get("/user/feed", userAuth, async(req,res)=>{

        try{

            const page=parseInt(req.query.page)||1;
            let limit=parseInt(req.query.limit)||3
            const skip=(page-1)*limit;
            // limit=limit>10?3:limit;

            const loggedINuser=req.user;
            const connectionRequests=await ConnectionRequestModel.find({
                $or:[{fromUserId:loggedINuser._id},{toUserId:loggedINuser._id}]
            }).select("fromUserId toUserId");


            const hideUserFromFeed=new Set();

            connectionRequests.forEach((req)=>{

                hideUserFromFeed.add(req.fromUserId.toString());
                hideUserFromFeed.add(req.toUserId.toString());

            });

            console.log(hideUserFromFeed);
            const user = await User.find({ $and: [{ _id: { $nin: Array.from(hideUserFromFeed) } }, { _id: { $ne: loggedINuser._id } }
            ] })
            .select("firstName emailId").skip(skip).limit(limit);


          
            res.send(user);


          

        }

        catch(err){
            res.status(400).send(err.message);



        }

        



    });

  



module.exports = userRouter;