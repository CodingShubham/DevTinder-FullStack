const express=require("express");
const userAuth = require("../Middlewares/authMiddleware");
const Chat = require("../Model/chat");
const chatRouter=express.Router();

chatRouter.get("/chat/:targetUserId",userAuth ,async(req,res)=>{

    const userId=req.user._id;
    const{targetUserId}=req.params

    try{

        let chat= await Chat.findOne({participants:{$all:[userId,targetUserId]},}).populate({path:"messages.sender", select:"firstName lastName photoUrl"})

        if(!chat){
            chat=new Chat({
                participants:[userId,targetUserId],
                messages:[],
            })

             await chat.save();
        }
       
        res.json(chat);
    }

    catch(err){
        console.log(err);
        res.status(500).json({ error: "Server error" });

    }



})

module.exports=chatRouter;
