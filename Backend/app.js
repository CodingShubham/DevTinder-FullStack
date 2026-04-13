
// const connectDB=require("./config/database");
// const userModel=require("./Model/user");
// const express=require("express");
// const app=express();
// const cookieparser=require("cookie-parser");
// const authRouter=require("./routes/auth");
// const {profileApi}=require("./routes/profile");
// const {requestRouter}=require("./routes/request");
// const http=require("http")

// const cors=require("cors");
// const userRouter = require("./routes/user");
// const Chat=require("./Model/chat")


// app.use(cors({
//   origin: "http://localhost:5173", // your React dev URL
//   credentials: true
// }));


// app.use(express.json());
// app.use(cookieparser());

// const server=http.createServer(app);
// const socket=require("socket.io");
// const chatRouter = require("./routes/chat");
// const io=socket(server,{
//     cors:{
//         origin:"http://localhost:5173",
//     }
// })


// io.on("connection",(socket)=>{

// socket.on("joinChat",({userId,targetUserId})=>{

//     const room=[userId,targetUserId].sort().join("-");
//     socket.join(room)
//     console.log(room)

// })

// socket.on("sendMessage", async({userId,targetUserId,firstName,text})=>{

//     const room=[userId,targetUserId].sort().join("-");

//     try{

//         let chat= await Chat.findOne({
//             participants:{$all:[userId,targetUserId]}
//         })

//         if(!chat){

//             chat=new Chat({
//                 participants:[userId,targetUserId],
//                 messages:[],
//             })
//         }

//         chat.messages.push({
//             sender:userId,
//             text:text,
//         })

//       await chat.save();
//  const user = await userModel.findById(userId)
//         .select("firstName lastName photoUrl");

//     io.to(room).emit("messageReceived",{  sender: {
//     _id: user._id,
//     firstName: user.firstName,
//     photoUrl: user.photoUrl,
//   },
//   text: text, })
//     console.log(text)

//     }

//     catch(err){

//          console.error("Error saving message:", err);

//     }


    
// })

// })


// connectDB().then(()=>{

//     console.log("Database Connected Sucessfully");
    
//     server.listen(3000,(req,res)=>{

//         console.log("server is listening on port 3000")
        
//     })


// }).catch((err)=>{

//           console.log("server is not connected")

// });



//     app.use("/", authRouter);
//     app.use("/",profileApi)
//     app.use("/",requestRouter)
//     app.use("/",userRouter);
//     app.use("/",chatRouter);





require("dotenv").config();
const connectDB=require("./config/database");
const userModel=require("./Model/user");
const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");
const authRouter=require("./routes/auth");
const {profileApi}=require("./routes/profile");
const {requestRouter}=require("./routes/request");
const http=require("http")
const cors=require("cors");
const userRouter = require("./routes/user");
const Chat=require("./Model/chat")


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


app.use(express.json());
app.use(cookieparser());

const server=http.createServer(app);
const socket=require("socket.io");
const chatRouter = require("./routes/chat");
const io=socket(server,{
    cors:{
        origin:"http://localhost:5173",
    }
})


io.on("connection",(socket)=>{

socket.on("joinChat",({userId,targetUserId})=>{

    const room=[userId,targetUserId].sort().join("-");
    socket.join(room)
    console.log(room)

})

socket.on("sendMessage", async({userId,targetUserId,text})=>{
    const user = await userModel.findById(userId)
  .select("firstName lastName photoUrl");

    const room=[userId,targetUserId].sort().join("-");

    try{

        let chat= await Chat.findOne({
            participants:{$all:[userId,targetUserId]}
        })

        if(!chat){

            chat=new Chat({
                participants:[userId,targetUserId],
                messages:[],
            })
        }

        chat.messages.push({
            sender:userId,
            text:text,
        })

      await chat.save();

      let savedMessage=chat.messages[chat.messages.length-1];

    io.to(room).emit("messageReceived",{ senderId: user._id, firstName:user.firstName, lastName:user.lastName, text:savedMessage.text, photoUrl:user.photoUrl, createdAt:savedMessage.createdAt })
    console.log(text)

    }

    catch(err){

         console.error("Error saving message:", err);

    }


    
})

})


connectDB().then(()=>{

    console.log("Database Connected Sucessfully");
    
    server.listen(3000,(req,res)=>{

        console.log("server is listening on port 3000")
        
    })


}).catch((err)=>{

          console.log("server is not connected")

});



    app.use("/", authRouter);
    app.use("/",profileApi)
    app.use("/",requestRouter)
    app.use("/",userRouter);
    app.use("/",chatRouter);







