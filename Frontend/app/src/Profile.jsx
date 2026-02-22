import React, { useState, useEffect } from "react";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import { useSelector, useDispatch } from "react-redux";
import CardFeed from "./CardFeed";
import { BASE_URL } from "./utils/constants";

function Profile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoUrl(user.photoUrl || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
    }
  }, [user]);

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base text-center">
            Profile updated successfully!
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-12 px-4 sm:px-6 py-6 max-w-7xl mx-auto">

        {/* Form Section */}
        <div className="w-full max-w-md bg-base-100 shadow-xl rounded-xl p-5 sm:p-6">
          <form onSubmit={saveProfile} className="flex flex-col gap-4">

            <div>
              <label className="block mb-1 font-medium text-sm sm:text-base">
                First Name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded-md p-2 text-sm sm:text-base"
                type="text"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm sm:text-base">
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded-md p-2 text-sm sm:text-base"
                type="text"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm sm:text-base">
                Photo URL
              </label>
              <input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full border rounded-md p-2 text-sm sm:text-base"
                type="url"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm sm:text-base">
                Age
              </label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border rounded-md p-2 text-sm sm:text-base"
                type="number"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm sm:text-base">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border rounded-md p-2 text-sm sm:text-base"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm sm:text-base">
                About
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full border rounded-md p-2 text-sm sm:text-base resize-none"
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition text-sm sm:text-base"
            >
              Save Profile
            </button>

          </form>
        </div>

        {/* Preview Card */}
        {user && (
          <div className="w-full max-w-md">
            <CardFeed
              user={{
                _id: user._id,
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
              }}
            />
          </div>
        )}

      </div>
    </>
  );
}

export default Profile;