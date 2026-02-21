import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRequests } from "./utils/requestsSlice";
import { BASE_URL } from "./utils/constants";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests || []);

  const requestReceived = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      // Refresh list after action
      requestReceived();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestReceived();
  }, []);

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Friend Requests
      </h1>

      {requests.length === 0 && (
        <p className="text-center text-gray-400">
          No friend requests available
        </p>
      )}

      <div className="flex flex-col items-center gap-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="w-full max-w-xl bg-gray-800 rounded-xl shadow-md p-5 flex items-center justify-between"
          >
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 object-cover rounded-full border"
                src={req?.fromUserId?.photoUrl}
                alt="profile"
              />
              <h2 className="text-lg font-medium">
                {req?.fromUserId?.firstName}
              </h2>
            </div>

            {/* Right Section */}
            <div className="flex gap-3">
              <button
                onClick={() => handleRequest("accepted", req._id)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                Accept
              </button>

              <button
                onClick={() => handleRequest("rejected", req._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requests;
