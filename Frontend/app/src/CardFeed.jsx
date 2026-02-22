import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { removeUserFeed } from "./utils/feedSlice";
import { BASE_URL } from "./utils/constants";

function CardFeed({ user }) {
  const dispatch = useDispatch();

  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
  } = user;

  const handleFeed = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 py-6">
      <div className="w-full max-w-sm sm:max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition duration-300">

        {/* Image Section */}
        <div className="h-56 sm:h-64 w-full">
          <img
            src={photoUrl}
            alt={firstName}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 text-center text-white">
          
          {/* Name */}
          <h2 className="text-xl sm:text-2xl font-semibold">
            {firstName} {lastName}
          </h2>

          {/* Age & Gender */}
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            {age} years • {gender}
          </p>

          {/* About */}
          <p className="text-sm text-gray-300 mt-3 leading-relaxed px-2 sm:px-4">
            {about}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6">
            <button
              onClick={() => handleFeed("interested")}
              className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition duration-200 cursor-pointer text-sm sm:text-base"
            >
              Interested
            </button>

            <button
              onClick={() => handleFeed("ignored")}
              className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-200 cursor-pointer text-sm sm:text-base"
            >
              Ignore
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CardFeed;