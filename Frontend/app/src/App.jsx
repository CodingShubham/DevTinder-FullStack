import "./App.css"
import Navbar from "./Navbar";
import {BrowserRouter, Routes, Route, Outlet, useNavigate} from "react-router-dom"
import Test from "./Test";
import axios from "axios";
import { useEffect } from "react";
export default  function APP(){

const navigate=useNavigate();

  const fetchUser=async ()=>{

    try{

      const res=await axios.get("http://localhost:3000/profile/view",{
        withCredentials:true,
      });


    }

    catch(err){

      if(err.status===401){
        navigate("/login");
      }

      // if (err.response?.status === 401) {
      //   navigate("/login");
      // }


      console.error(err);
    }


  }

  useEffect(()=>{

    fetchUser();

  },[]);

  return(

    <div> 
      <Navbar/>
       <Test/>
      <Outlet></Outlet>
     

    </div>

  );
}