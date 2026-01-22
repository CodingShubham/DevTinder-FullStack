import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addConnections } from './utils/connectionsSlice';
import { BASE_URL } from './utils/constants';

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL+"/user/connections",
        { withCredentials: true }
      );

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
          <div className='flex justify-center'>  
          <div className='text-xl mx-7 flex justify-center space-x-2 mt-5 items-center  bg-gray-700 w-80 h-45 rounded-md'>
             <img className='w-16 h-16 object-cover rounded-full ' src={connection.photoUrl } />
            <h2 className='p-5  bg-gray-700  '>{connection.firstName}</h2>

          </div>
           </div>
        )
      
      })
     }
    </div>
  );
}

export default Connections;
