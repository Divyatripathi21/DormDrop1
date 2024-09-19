import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SP from "./block.jpg";

export default function Ratings() {
  
  const { currentRecSideSender } = useSelector((state) => state.RECSIDESENDER);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
    console.log(rate);
  };

  const data = {
    rate: rating,
    username: currentRecSideSender.registrationNumber,
  };

  const handleSubmit = async () => {
    try {
      console.log("hhh");
      setLoading(true);
      const res = await fetch("/api/rating/storeRating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      setLoading(false);

      if (responseData.success === false) {
        console.log("failed from try");
      }

      if (res.ok) {
        toast.success("Thanks for the feedback");
        navigate("/successfullyreceived");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen px-4 sm:px-0 "
      style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}
    >
      <div className="w-full sm:w-1/2 md:w-1/3 p-8 border border-gray-300 shadow-lg rounded-lg bg-white opacity-95">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
          Share Your Experience
        </h1>
        <div className="flex justify-center mb-8 sm:mb-16 space-x-2 sm:space-x-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`h-8 w-8 sm:h-12 sm:w-12 cursor-pointer ${
                star <= rating ? "text-pink-500" : "text-gray-400"
              }`}
              onClick={() => handleRating(star)}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.02 6.186a1 1 0 00.95.69h6.487c.97 0 1.371 1.24.588 1.81l-5.25 3.775a1 1 0 00-.364 1.118l2.02 6.186c.3.921-.755 1.688-1.54 1.118l-5.25-3.775a1 1 0 00-1.175 0l-5.25 3.775c-.784.57-1.838-.197-1.54-1.118l2.02-6.186a1 1 0 00-.364-1.118l-5.25-3.775c-.784-.57-.383-1.81.588-1.81h6.487a1 1 0 00.95-.69l2.02-6.186z"
              />
            </svg>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-500 text-black text-lg rounded hover:scale-105 transition-transform flex items-center"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" className="mr-2" /> : "Submit"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
