import { Alert, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { theSender } from "../redux/sender/senderSlice";
import cycle from "./cycle.jpg";

const Sender = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.registrationNumber ||
      !formData.mobileNumber ||
      !formData.availabilityTime ||
      !formData.name
    ) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/sender/senderform", {
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
        dispatch(theSender(data));
        navigate("/receiverpost");
        //send this to reciver's post lists
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center "
      style={{ backgroundImage: `url(${cycle})`, backgroundSize: "cover" }}
    >
      <div className="max-w-md bg-slate-300  shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-4 text-center ">
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
              className="w-full px-4 py-2 border   rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your name "
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
            <label htmlFor="mobileNumber" className="block text-lg font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              onChange={handleChange}
              className="w-full px-4 py-2  border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label
              htmlFor="availabilityTime"
              className="block text-lg font-medium"
            >
              Availability Time (mins)
            </label>
            <input
              type="number"
              id="availabilityTime"
              onChange={handleChange}
              className="w-full px-4 py-2  border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Example 10 min"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full hover:scale-105  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
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

export default Sender;
