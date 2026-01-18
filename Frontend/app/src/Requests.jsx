import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRequests } from "./utils/requestsSlice";


function Requests(){
      const dispatch=useDispatch();
      const request=useSelector((store)=>store.requests);
       const requestReceived= async()=>{
            try{

              const res= await axios.get("http://localhost:3000/user/requests/recieved",{withCredentials:true}) 
              dispatch(addRequests(res.data.data));
              console.log(res.data.data);
              
            }

            catch(err){
              console.error(err);

            }
        }  
        

          const handleRequest= async (status, _id)=>{

              try{

            const res=await axios.post("http://localhost:3000/request/review/"+status+"/"+_id,{},{withCredentials:true})

              }

              catch(err){
                console.log(err);
              }

          }
      
        

        useEffect(()=>{
          requestReceived();
        },[])
    


return(
    <div className="text-white">
       {
        request.map((request)=>{

          return(
            <div className=" text-center">
              <h1 className="text-xl font-semibold ">Friend Requests</h1>

              <div className="flex justify-center">

              <div className="text-xl  mx-7 flex justify-start space-x-5 mt-5 items-center  bg-gray-700 w-96 h-45 rounded-md">
              <img className='w-16 h-16 ml-2.5 object-cover rounded-full ' src={request?.fromUserId?.photoUrl} />
              <h2 className="bg-gray-700 text-xl">{request?.fromUserId?.firstName}</h2>

          

                    <button onClick={()=>handleRequest("accepted",request._id)}

                    className="w-18 bg-black text-base  justify-center items-center  rounded-full  px-4 py-2 hover:bg-gray-500 text-black-500  "
                  >
                    Acccept
                  </button>


                  <button
                    onClick={()=>handleRequest("rejected",request._id)}

                    className=" flex justify-center text-base  items-center w-24 bg-black  rounded-full px-4 py-2 hover:bg-gray-500 text-black-500 "
                  >
                    Reject
                  </button>


              </div>
              
              </div>

            </div>
          )

        })
       }
        
        
        </div>

    

)
}

export default Requests;