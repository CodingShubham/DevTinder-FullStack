import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addConnections } from './utils/connectionsSlice';

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/connections",
        { withCredentials: true }
      );

      // ✅ FIX IS HERE
      dispatch(addConnections(res.data.data));
   

    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
 getConnections();
}, []);


  if (!connections || connections.length === 0) {
    return <p>No connections found</p>;
  }

  return (
    <div className='text-white'>
      <h1 className='text-center font-semi-bold text-2xl'>Connections</h1>
     {
      connections.map((connection)=>{
        return(
          <div className='text-xl mx-7 flex justify-center mt-5'>
            <h2 className='bg-gray-600 w-80 h-50 p-5   rounded-md'>{connection.firstName}</h2>
          </div>
        )
      
      })
     }
    </div>
  );
}

export default Connections;
