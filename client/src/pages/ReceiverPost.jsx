import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { theReceiver } from "../redux/receiver/receiverSlice";
import { io } from "socket.io-client";
import { Alert, Spinner } from "flowbite-react";
import SP from "./cycle.jpg";

const ReceiverPost = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [receiverData, setreceiverData] = useState([]);
  const navigate = useNavigate();

  const socket = io("http://localhost:3000");

  //         https://dormdrop.onrender.com
  //http://localhost:3000

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("sendMessageToReceiverPost", (data) => {
    console.log("Received message from server:", data);
    if (data === "receiverFormSubmitted") window.location.reload();
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  useEffect(() => {
    const fetchReceiverPost = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        const res = await fetch("/api/receiver/receiverpost");
        const data = await res.json();
        setLoading(false);
        if (res.ok) {
          setreceiverData(data);
        }
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchReceiverPost();
  }, [setreceiverData]);

  const handleOnclick = (receiver) => {
    dispatch(theReceiver(receiver));

    const socket = io.connect("http://localhost:3000");
    //https://dormdrop.onrender.com
    //http://localhost:3000

    socket.on("connect", () => {
      console.log("Connected to server");
      const registrationNumber = receiver.registrationNumber;
      const senderRegistrationNumber = currentUser.username;
      console.log(senderRegistrationNumber);
      socket.emit("deleteInProcessReceiver", registrationNumber);
      socket.emit("deleteInProcessSender", senderRegistrationNumber);
    });

    navigate("/senderend1");
  };

  // Conditional rendering when receiverData is not available
  if (receiverData.length === 0 && loading === false) {
    return (
      <div
        style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="bg-slate-300 rounded-lg shadow-lg p-6">
          <p className="text-xl font-semibold text-gray-800">
            No one is willing for a delivery 😊
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Spinner size="xl" className="w-20 h-20" /> {/* Spinner size */}
          <span className="pl-3 text-xl">Loading...</span>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {receiverData.map((receiver) => (
              <div
                key={receiver._id}
                className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {receiver.name}
                </h3>
                <p className="text-gray-600 mt-2">
                  <span className="font-bold">Registration Number</span>:{" "}
                  {receiver.registrationNumber}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Phone Number</span>:{" "}
                  {receiver.mobileNumber}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Email</span>: {receiver.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Block</span>: {receiver.block}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Room</span>: {receiver.room}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Wait Time</span>:{" "}
                  {receiver.waitTime}
                </p>
                <button
                  onClick={() => handleOnclick(receiver)}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform text-white font-semibold py-2 px-4 rounded-lg mt-4 w-full text-center"
                >
                  Confirm to Proceed
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiverPost;
