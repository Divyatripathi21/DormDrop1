import { Alert, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import cycle from "./cycle.jpg";

const Receiver = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  var t1;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const socket = io("http://localhost:3000");

    //http://localhost:3000
    //  https://dormdrop.onrender.com
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("receiverFormSubmitted", {
        message: "receiverFormSubmitted",
      });
    });

    if (
      !formData.registrationNumber ||
      !formData.mobileNumber ||
      !formData.block ||
      !formData.name ||
      !formData.room ||
      !formData.waitTime ||
      !formData.email
    ) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/receiver/receiverform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        t1 = formData.waitTime;
        navigate(`/receiverend1/${t1}`);
        //send this to sender's post lists
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-gray-100"
      style={{ backgroundImage: `url(${cycle})`, backgroundSize: "cover" }}
    >
      <div className="max-w-md my-8 bg-white bg-opacity-80  shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Enter Your Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={handleChange}
              className="w-full px-4 py-2  border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              htmlFor="registrationNumber"
              className="block text-lg font-medium"
            >
              Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              onChange={handleChange}
              className="w-full px-4 py-2   border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your registration number"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium">
              email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              className="w-full px-4 py-2   border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-lg font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              onChange={handleChange}
              className="w-full px-4 py-2   border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label htmlFor="block" className="block text-lg font-medium">
              Hostel Block
            </label>
            <input
              type="number"
              id="block"
              onChange={handleChange}
              className="w-full px-4 py-2   border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Example 15"
            />
          </div>
          <div>
            <label htmlFor="room" className="block text-lg font-medium">
              Room number
            </label>
            <input
              type="number"
              id="room"
              onChange={handleChange}
              className="w-full px-4 py-2   border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Example 707"
            />
          </div>
          <div>
            <label htmlFor="waitTime" className="block text-lg font-medium">
              Order Arriving at Gate2 in..
            </label>
            <input
              type="number"
              id="waitTime"
              onChange={handleChange}
              className="w-full px-4 py-2   border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Example 10 mins"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r hover:scale-105  from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Receiver;
