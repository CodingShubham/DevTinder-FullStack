import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "./utils/userSlice";
import { BASE_URL } from "./utils/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navlink = useNavigate();

  const handleClick = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      navlink("/login");
    } catch (err) {
      console.error(err);
      alert("Unknown Error occured while logout");
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="w-full bg-blue-950 px-3 sm:px-6 py-3 sm:py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/feed"
          className="text-lg sm:text-2xl font-bold text-gray-200 hover:text-white transition"
        >
          DEVTINIDER
        </Link>

        {/* Profile Dropdown */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <img
              src={user.photoUrl}
              alt="profile"
              onClick={() => setOpen(!open)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer border-2 border-white object-cover"
            />

            {open && (
              <div
                className="
                  absolute 
                  right-0 
                  mt-2 
                  w-40 
                  sm:w-44 
                  bg-white 
                  rounded-lg 
                  shadow-lg 
                  overflow-hidden 
                  text-sm 
                  text-gray-700 
                  z-50
                "
              >
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <Link
                  to="/connections"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Connections
                </Link>

                <Link
                  to="/requests"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Requests
                </Link>

                <Link
                  to="/feed"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Feed
                </Link>

                <div className="border-t"></div>

                <button
                  onClick={() => {
                    setOpen(false);
                    handleClick();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}