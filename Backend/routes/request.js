const express=require("express");
const userAuth = require("../Middlewares/authMiddleware");
const ConnectionRequestModel=require("../Model/connectionRequest");

const requestRouter=express.Router();

    requestRouter.post("/request/send/:status/:toUserId", userAuth,async(req,res)=>{

        try{

            const fromUserId=req.user._id;
            const toUserId=req.params.toUserId;
            const status=req.params.status;

            const existingConnectionRequest=await ConnectionRequestModel.findOne({

                $or:[
                    {fromUserId,toUserId},
                    {fromUserId:toUserId,toUserId:fromUserId}
                ]

            });

            // Handle ignored separately
            if (status === "ignored") {
                return res.status(200).send("User ignored");
            }


            if(existingConnectionRequest){

                return res.status(400).send("Already Connection Request Exists");
            }

            if(fromUserId==toUserId){
                return res.status(400).send("Same connection Request cannot be Sent");
            }

            const connectionRequest=new ConnectionRequestModel({

                fromUserId,toUserId,status
            });

            const data=await connectionRequest.save();

            res.status(200).send("Connection request sent sucessfully");


        }

        catch(err){

                res.status(400).send("Error");

        }


    



});


requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{

   try
   { const loggedINuser=req.user;
    const{status,requestId}=req.params;

    const allowedStatus=["accepted", "rejected"];

    if(!allowedStatus.includes(status)){
        return res.status(400).send("Invalid Status ");
    }

    const connectionRequest=await ConnectionRequestModel.findOne({

        _id:requestId,
        status:"interested",
        toUserId:loggedINuser._id


    })

    if(!connectionRequest){

        return res.send("Connection Request Not Found");

    }

    connectionRequest.status=status;

    const data=await connectionRequest.save();

     res.status(200).send("Accepted the Request");
}

catch(err){
    res.status(400).send("Unable To accept to accept the Connecction Request of user");
}

});

module.exports={requestRouter};