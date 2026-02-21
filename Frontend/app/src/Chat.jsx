// import { useParams } from "react-router-dom";
// import { socketInitialization } from "./utils/socket";
// import { useEffect, useRef, useState } from "react";
// import{useSelector} from "react-redux"
// import axios from "axios"
// import { BASE_URL } from "./utils/constants";


// function Chat(){

//   const[newMessage,setnewMessage]=useState("");
//   const[message,setMessage]=useState([]);

// const user=useSelector((store)=>store.user);
// const userId=user?._id;
// const{targetUserId}=useParams();
// const socketRef = useRef(null);

// let fetchChatMessages=async()=>{

//   const chat=await axios.get(BASE_URL+"/chat/" + targetUserId,{withCredentials:true})
//   console.log(chat.data.messages);
//   const chatMsg=chat?.data?.messages;
//   setMessage(chatMsg)

// }

// useEffect(()=>{
//     fetchChatMessages();
// },[])

//   useEffect(()=>{
//   if(!userId){
//   return;
// }
//   socketRef.current=socketInitialization();
//  socketRef.current.emit("joinChat",{userId,targetUserId});

//  socketRef.current.on("messageReceived",(chatMsg)=>{
//   // console.log(text)
//   setMessage((message)=>[...message,chatMsg])
    
// })

// return()=>{
//    socketRef.current.disconnect();
// }
//   },[userId, targetUserId])


//   let handleSendMessage=()=>{

//       if (!socketRef.current) return;
//        socketRef.current.emit("sendMessage",{firstName:user.firstName,userId,targetUserId,text:newMessage,})
//        setnewMessage("")

//   }
  

// return (
//  <>

// <div className="flex justify-center items-center min-h-screen bg-base-200">
      
//       <div className="card w-2/4  h-[500px] bg-black shadow-xl flex flex-col">

//         {/* Chat Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">

//           {/* Start Chat */}

//        {     message.map((msg,index)=>{

//          const isMyMessage = msg.sender?._id === userId;
//               return<>

//                 <div className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}>
//             <div className="chat-image avatar">
//               <div className="w-10 rounded-full">
//                 <img
//                   alt="Obi-Wan"
//                   src={msg.sender.photoUrl}
//                 />
//               </div>
//             </div>
//             <div className="chat-header">
//               {msg?.sender?.firstName}
//               <time className="text-xs opacity-50 ml-2">12:45</time>
//             </div>
           
//             <div key={index} className="chat-bubble">{msg?.text}</div>
//             <div className="chat-footer opacity-50">
//               Delivered
//             </div>
//           </div>
              
//               </> 
                
//                }) }


//         </div>

//         {/* Input Section */}
//         <div className="p-3 border-t flex gap-2">
//           <input
//           value={newMessage}
//           onChange={(e)=>setnewMessage(e.target.value)}
//             type="text"
//             placeholder="Type a message..."
//             className="input input-bordered w-full"
//           />
//           <button onClick={handleSendMessage} className="btn btn-primary">
//             Send
//           </button>
//         </div>

//       </div>

//     </div>
 
//  </>
// );
// }

// export default Chat






import { useParams } from "react-router-dom";
import { socketInitialization } from "./utils/socket";
import { useEffect, useRef, useState } from "react";
import{useSelector} from "react-redux"
import axios from "axios"
import { BASE_URL } from "./utils/constants";


function Chat(){

  const[newMessage,setnewMessage]=useState("");
  const[message,setMessage]=useState([]);

const user=useSelector((store)=>store.user);
const userId=user?._id;
const{targetUserId}=useParams();
const socketRef = useRef(null);

let fetchChatMessages=async()=>{

  const chat=await axios.get(BASE_URL+"/chat/" + targetUserId,{withCredentials:true})
  console.log(chat.data.messages);
  const chatMsg=chat?.data?.messages;

  const updateChatmsg=chatMsg.map((msg)=>{

    return{ senderId: msg.sender._id, firstName:msg.sender.firstName, lastName:msg.sender.lastName, text:msg.text,photoUrl:msg.sender.photoUrl}

  })

  setMessage(updateChatmsg)

}

useEffect(()=>{
    fetchChatMessages();
},[])

  useEffect(()=>{
  if(!userId){
  return;
}
  socketRef.current=socketInitialization();
 socketRef.current.emit("joinChat",{userId,targetUserId});

 socketRef.current.on("messageReceived",socketRef.current.on("messageReceived", (msg) => {
  setMessage((prev) => [...prev, msg]);
}));

return()=>{
   socketRef.current.disconnect();
}
  },[userId, targetUserId])


  let handleSendMessage=()=>{

      if (!socketRef.current) return;
       socketRef.current.emit("sendMessage",{firstName:user.firstName,lastName:user.lastName, userId,targetUserId,text:newMessage})
       setnewMessage("")

  }
  

return (
 <>

<div className="flex justify-center items-center min-h-screen bg-base-200">
      
      <div className="card w-2/4  h-[500px] bg-black shadow-xl flex flex-col">

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Start Chat */}

       {     message.map((msg,index)=>{

         const isMyMessage = msg.senderId === userId;
              return<>

                <div className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Obi-Wan"
                  src={msg.photoUrl}
                />
              </div>
            </div>
            <div className="chat-header">
              {msg?.firstName}
              <time className="text-xs opacity-50 ml-2">12:45</time>
            </div>
           
            <div key={index} className={`chat-bubble ${isMyMessage ? "bg-blue-500 text-white":"bg-gray-300 text-black"}`}>{msg?.text}</div>
            <div className="chat-footer opacity-50">
              Delivered
            </div>
          </div>
              
              </> 
                
               }) }


        </div>

        {/* Input Section */}
        <div className="p-3 border-t flex gap-2">
          <input
          value={newMessage}
          onChange={(e)=>setnewMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full"
          />
          <button onClick={handleSendMessage} className="btn btn-primary">
            Send
          </button>
        </div>

      </div>

    </div>
 
 </>
);
}

export default Chat