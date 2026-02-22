import React from 'react'
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from './utils/userSlice.js';
import { useDispatch } from "react-redux";
import { BASE_URL } from './utils/constants.js';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [islogin, setIslogin] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lasttname, setlastName] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/login",
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

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstname,
          lastName: lasttname,
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-sm sm:max-w-md border border-gray-700 rounded-xl p-6 sm:p-8 bg-gray-900 shadow-lg">
        <form
          onSubmit={islogin ? handleClick : handleSignUp}
          className="flex flex-col"
        >
          <h2 className="text-white text-center text-xl font-semibold mb-6">
            {islogin ? "Log In" : "Sign Up"}
          </h2>

          {!islogin && (
            <>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
                className="mb-4 px-4 py-2 bg-black rounded-md text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First Name"
                required
                type="text"
              />

              <input
                onChange={(e) => setlastName(e.target.value)}
                value={lasttname}
                className="mb-4 px-4 py-2 bg-black rounded-md text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last Name"
                required
                type="text"
              />
            </>
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mb-4 px-4 py-2 bg-black rounded-md text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mb-6 px-4 py-2 bg-black rounded-md text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            required
            type="password"
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto min-w-[110px] px-4 py-2 
              border border-gray-500 rounded-md 
              bg-blue-600 text-white font-medium 
              hover:bg-blue-700 active:scale-95 
              transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              {islogin ? "Login" : "Sign Up"}
            </button>

            <p
              onClick={() => setIslogin(!islogin)}
              className="text-white text-sm sm:text-base text-center cursor-pointer hover:text-gray-400 underline transition"
            >
              {islogin
                ? "New User? Sign Up"
                : "Existing User? Login"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;