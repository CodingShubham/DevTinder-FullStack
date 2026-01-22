import React from 'react'
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from './utils/userSlice.js';
import { useDispatch } from "react-redux";
import { BASE_URL } from './utils/constants.js';


function Login() {
  const [email, setEmail] = useState("ss9824473@gmail.com");
  const [password, setPassword] = useState("Shubham@123");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const[islogin,setIslogin]=useState(true);
  const[firstname,setFirstName]=useState("");
   const[lasttname,setlastName]=useState("");

  const handleClick = async (e) => {
    e.preventDefault();
if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }
  // sudo systemctl restart nginx    sudo nano /etc/nginx/sites-available/default
    try {
      const res = await axios.post(
        BASE_URL+"/login",
        {
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,  
          headers: {
            "Content-Type": "application/json",
          },
             
        }
      );

    
      dispatch(addUser(res.data));
      


      if (res.status === 200) {
        navigate("/feed");
         
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Invalid email or password");
    }
  };

    const handleSignUp=async(e)=>{

      try{
         e.preventDefault();
        const res=await axios.post(BASE_URL+"/signup",{ firstName: firstname,
        lastName: lasttname,
        emailId: email,
        password},{withCredentials:true})
          dispatch(addUser(res.data))
          return  navigate("/profile");
        }

      

      catch(err){

        console.error(err);

      }

    }



  return (
    <div className="flex justify-center mt-20  ">
      
        
      <div className="min-h-[100px] w-80 flex justify-center border rounded-lg text-xl items-center">
        
        <form onSubmit={islogin?handleClick:handleSignUp} className="flex flex-col">
            <h2 className='text-white text-center mt-2'>{islogin?"Log In":"Sign Up"}</h2>
       { !islogin && ( <> <input
            onChange={(e) =>setFirstName (e.target.value)}
            value={firstname}
            className="mt-6   bg-black rounded-lg text-center text-white text-md focus:outline-none "
            placeholder="First Name"
            required
            type="text"
          />


           <input
            onChange={(e) => setlastName(e.target.value)}
            value={lasttname}
            className="mt-6   bg-black rounded-lg text-center text-white text-md focus:outline-none "
            placeholder="Last Name"
            required
            type="text"
          />
        </>)}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className=" bg-black rounded-lg text-center text-white text-md focus:outline-none mt-5"
            placeholder="Email"
            type='email'
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mt-6   bg-black rounded-lg text-center text-white text-md focus:outline-none "
            placeholder="Password"
            required
            type="password"
          />



          <div className=' flex space-x-10 '>

          <button
            type="submit"
            className="  w-[80px] mt-10 mb-6  border rounded-md p-1 bg-white"
            
          >
           {islogin? " Login":"Sign Up"}
          </button>

          <p onClick={()=>setIslogin(!islogin)} className='text-white text-lg text-center mt-10 cursor-pointer hover:text-gray-500 underline  '>{islogin?"Existing User!! Login":"New User! Sign Up"}</p>

 </div>
       

      

          
        </form>

        
      </div>

      
    </div>
  );
}

export default Login;
