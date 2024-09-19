import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import SP from "./block.jpg";

export default function Rec1_5() {
  const navigate = useNavigate();
  const { currentRecSideSender } = useSelector((state) => state.RECSIDESENDER);

  const socket = io.connect("http://localhost:3000"); //https://dormdrop.onrender.com  //http://localhost:3000

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("sendMessageToRec1_5", (data) => {
      console.log("Received message from server:", data);
      if (data === "yes") navigate("/rec2stopwatch");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Clean up on component unmount
    return () => {
      socket.off("connect");
      socket.off("sendMessageToRec1_5");
      socket.off("disconnect");
    };
  }, [navigate, socket]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4"
    style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}>
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://media1.tenor.com/m/rec5dlPBK2cAAAAC/mr-bean-waiting.gif"
          alt="Waiting GIF"
          className="rounded-lg mb-4 w-full max-w-md"
        />
        <div className="bg-white opacity-80 rounded-lg p-4 shadow-md text-center w-full max-w-md">
          <p className="text-xl font-semibold mb-2">
            Waiting for the delivery person to pickup your order from Gate 2
          </p>
          <p className="text-gray-600">
            Please wait patiently until the delivery person confirms.
          </p>
        </div>
      </div>
      <div className="w-full sm:max-w-xl bg-white opacity-80 shadow-md rounded-lg overflow-hidden">
        <div className="p-4 flex flex-col h-full">
          <h2 className="text-xl font-bold mb-4">Receiver Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <div className="flex flex-col">
              <p className="text-gray-700 font-semibold">Name:</p>
              <p className="text-gray-600">{currentRecSideSender.name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-700 font-semibold">Registration Number:</p>
              <p className="text-gray-600">{currentRecSideSender.registrationNumber}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-700 font-semibold">Mobile Number:</p>
              <p className="text-gray-600">{currentRecSideSender.mobileNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
