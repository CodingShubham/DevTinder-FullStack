import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addConnections } from './utils/connectionsSlice';
import { BASE_URL } from './utils/constants';
import { Link } from 'react-router-dom';

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",
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
    return (
      <p className="text-base sm:text-lg text-white text-center mt-6 px-4">
        No connections found
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 py-8">

      <h1 className="text-2xl sm:text-3xl text-center font-semibold mb-8">
        Connections
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {connections.map((connection) => {
          const { _id, firstName, photoUrl } = connection;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full border-2 border-gray-600"
                  src={photoUrl}
                  alt={firstName}
                />
                <h2 className="text-base sm:text-lg font-medium">
                  {firstName}
                </h2>
              </div>

              {/* Chat Button */}
              <Link
                to={"/chat/" + _id}
                className="w-full sm:w-auto text-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Chat
              </Link>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Connections;