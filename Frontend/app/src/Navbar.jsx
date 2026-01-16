
import axios from "axios"
import {  useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Navbar(){

  const user=useSelector((store)=>store.user);
  console.log(user);

  const navlink=useNavigate();

  const handleClick= async ()=>{
     console.log("✅ Logout button clicked"); // debugging
  

    try{
    const res=await axios.post("http://localhost:3000/logout",{}, { withCredentials: true});
     console.log(res.data);
    navlink("/login");


      }

      catch(err){
        console.error(err);
        alert("Unknown Error occured while logout");
        // if(err.status===401)
      }




  }


  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);



    return(

    <div  className="flex space-x-60 p-5 justify-center text-2xl bg-blue-300">
      <h1 className="bg-blue-300 font-bold text-gray-800 cursor-pointer">
  <Link to="/login" className=" bg-inherit">
    DEVTINIDER
  </Link>
</h1>


      <div className="space-x-5 bg-blue-300">
  
    {/* <button type="button" onClick={handleClick} className="  bg-blue-300 px-20  rounded-lg">Logout</button> */}

      <div className="space-x-5 bg-blue-300 relative ml-60" ref={dropdownRef}>
  {user&&<img
    src="/pp.jpeg"
    alt="profile"
    onClick={() => setOpen(!open)}
    className="w-10 h-10 rounded-full cursor-pointer border object-cover "
  />}

  {open && (
    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border overflow-hidden text-base">
      <Link
        to={"/profile"}
        className="block px-4 bg-white py-2 hover:bg-gray-500"
      >
        Profile
      </Link>

      <Link
        to="/connections"
        className="block bg-white px-4 py-2 hover:bg-gray-500"
      >
        Connections
      </Link>

      <button
        onClick={handleClick}
        className="w-full bg-white text-left px-4 py-2 hover:bg-gray-500 text-black-500"
      >
        Logout
      </button>
    </div>
  )}
</div>


      </div>

  
      
  
    </div>
  )
}

    
