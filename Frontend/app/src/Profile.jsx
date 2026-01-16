import React, { useState, useEffect} from 'react'
import axios from "axios"
import { addUser } from './utils/userSlice';
import{useSelector,useDispatch} from "react-redux"
import CardFeed from './CardFeed';

function Profile() {
   const user=useSelector((store)=>store.user);
  const[firstName,setFirstName]=useState("");
  const[lastName,setlastName]=useState("");
  const[photoUrl,setphotoUrl]=useState("");
  const[age,setage]=useState("");
  const[gender,setgender]=useState("");
  const[about,setabout]=useState("");
  const dispatch=useDispatch("");
  const[toast,setToast]=useState(false);

   useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setlastName(user.lastName || "");
      setphotoUrl(user.photoUrl || "");
      setage(user.age || "");
      setgender(user.gender || "");
      setabout(user.about || "");
    }
  }, [user]);


  const saveProfile= async(e)=>{
     e.preventDefault();

try{
    const res=await axios.patch("http://localhost:3000/profile/edit",{firstName},{withCredentials: true});
    console.log("edit: ",res.data);
    dispatch(addUser(res.data));
    setToast(true);

    setTimeout(()=>{

      setToast(false);

    },1000)
  }

  catch(err){
    console.error(err.message);

  }

  }


  return (

    <>
  { toast && ( <div className="toast toast-top toast-end z-50 flex justify-center  ">
    <div className="alert alert-success  bg-green-400 p-3 rounded-md fixed ">
      <span className=' bg-green-400  '>Profile updated successfully!</span>
    </div>
  </div>)}
      <div className='flex justify-center space-x-8'>
        
     <div className="flex justify-center mt-20">
      <div className="min-h-[100px] w-80 flex justify-center border rounded-lg text-xl items-center">
        <form className="flex flex-col">

          <label className="text-white my-2 text-base">First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-black rounded-lg text-center text-white"
            type="text"
          />

          <label className="text-white mt-3 text-base">Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            className="bg-black rounded-lg text-center text-white"
            type="text"
          />

          <label className="text-white mt-3 text-base">Photo URL</label>
          <input
            value={photoUrl}
            onChange={(e) => setphotoUrl(e.target.value)}
            className="bg-black rounded-lg text-center text-white"
            type="url"
          />

          <label className="text-white mt-3 text-base">Age</label>
          <input
            value={age}
            onChange={(e) => setage(e.target.value)}
            className="bg-black rounded-lg text-center text-white"
            type="number"
          />

          <label className="text-white mt-3 text-base">Gender</label>
          <input
            value={gender}
            onChange={(e) => setgender(e.target.value)}
            className="bg-black rounded-lg text-center text-white"
            type="text"
          />

          <label className="text-white mt-3 text-base">About</label>
          <textarea
            value={about}
            onChange={(e) => setabout(e.target.value)}
            className="bg-black rounded-lg text-white p-2"
          />

          <div className="flex justify-center mb-7">
            <button
              onClick={saveProfile}
              type="submit"
              className="mt-10 bg-blue-400 text-black px-4 py-1 rounded-lg"
            >
              Save Profile
            </button>
          </div>

        </form>
      </div>
    </div>

     <CardFeed user={{firstName}} />
     
     </div>
     
    
</>
  );

 
}

export default Profile  