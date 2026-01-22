import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRequests } from "./utils/requestsSlice";
import { BASE_URL } from "./utils/constants";


function Requests(){
      const dispatch=useDispatch();
      const request=useSelector((store)=>store.requests || []);
       const requestReceived= async()=>{
            try{

              const res= await axios.get(BASE_URL+"/user/requests/recieved",{withCredentials:true}) 
              dispatch(addRequests(res.data.data));
             
              
            }

            catch(err){
              console.error(err);

            }
        }  
        

          const handleRequest= async (status, _id)=>{

              try{

            const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})

              }

              catch(err){
                console.log(err);
              }

          }
      
        

        useEffect(()=>{
          requestReceived();
        },[])
    


return(
    <div className="text-white text-center mt-5">
           <h1 className="text-xl font-semibold ">Friend Requests</h1>
       {
        request.map((request)=>{

          return(
            <div key={request._id} className=" text-center text-lg ">
         

              <div className="flex justify-center">

              <div className="text-base  mx-7 flex justify-start space-x-5 mt-10 items-center  bg-gray-700 w-1/3 h-45 rounded-lg">
              <img className='w-14 h-14 ml-2.5 object-cover rounded-full ' src={request?.fromUserId?.photoUrl} />
              <h2 className="bg-gray-700 text-lg">{request?.fromUserId?.firstName}</h2>

          

                    <button onClick={()=>handleRequest("accepted",request._id)}

                    className="w-18 bg-black text-base  justify-center items-center  rounded-full  px-4 py-2 text-black-500 hover:bg-blue-700 "
                  >
                    Acccept
                  </button>


                  <button
                    onClick={()=>handleRequest("rejected",request._id)}

                    className=" flex justify-center text-base  items-center w-24 bg-black  rounded-full px-4 py-2 hover:bg-red-500 text-black-700 "
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