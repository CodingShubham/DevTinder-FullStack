import { useParams } from "react-router-dom";
import { socketInitialization } from "./utils/socket";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./utils/constants";

function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState([]);
  const [targetUser, setTargetUser] = useState(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const { targetUserId } = useParams();
  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  const fetchTargetUser = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/${targetUserId}`,
        { withCredentials: true }
      );

      setTargetUser(res.data.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(
        `${BASE_URL}/chat/${targetUserId}`,
        { withCredentials: true }
      );

      const chatMsg = chat?.data?.messages || [];

      const updateChatMsg = chatMsg.map((msg) => ({
        senderId: msg.sender._id,
        firstName: msg.sender.firstName,
        lastName: msg.sender.lastName,
        text: msg.text,
        photoUrl: msg.sender.photoUrl,
        createdAt: msg.createdAt,
      }));

      setMessage(updateChatMsg);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!targetUserId) return;
    fetchTargetUser();
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = socketInitialization();
    socketRef.current.emit("joinChat", { userId, targetUserId });

    socketRef.current.on("messageReceived", (msg) => {
      setMessage((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const handleSendMessage = () => {
    if (!socketRef.current || !newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-3 sm:px-6">
      <div className="w-full sm:w-[95%] md:w-3/4 lg:w-2/4 h-[90vh] sm:h-[600px] bg-black shadow-2xl flex flex-col rounded-2xl">

        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 bg-gray-900 border-b border-gray-700 rounded-t-2xl">
          
          <div className="w-10 h-10 sm:w-11 sm:h-11">
            <img
              src={targetUser?.photoUrl}
              alt={targetUser?.firstName}
              className="w-full h-full rounded-full object-cover border border-gray-600"
            />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-white">
              {targetUser
                ? `${targetUser.firstName}`
                : "Loading..."}
            </h2>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
          {message.map((msg, index) => {
            const isMyMessage = msg.senderId === userId;

            return (
              <div
                key={index}
                className={`chat ${
                  isMyMessage ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-8 sm:w-10 rounded-full">
                    <img alt={msg.firstName} src={msg.photoUrl} />
                  </div>
                </div>

                <div className="chat-header text-white text-xs sm:text-sm">
                  {msg.firstName}
                  <time className="text-[10px] sm:text-xs opacity-50 ml-2">
                    {msg.createdAt &&
                      new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                  </time>
                </div>

                <div
                  className={`chat-bubble text-sm sm:text-base ${
                    isMyMessage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </div>

                <div className="chat-footer opacity-50 text-[10px] sm:text-xs">
                  Delivered
                </div>
              </div>
            );
          })}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-gray-700 bg-gray-900 rounded-b-2xl flex gap-2 sm:gap-3">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:outline-none text-sm sm:text-base"
          />
          <button
            onClick={handleSendMessage}
            className="btn bg-blue-600 hover:bg-blue-700 text-white border-none text-sm sm:text-base px-4"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chat;