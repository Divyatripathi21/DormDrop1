import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AnimatedHourglass from "../components/AnimatedHourglass";
import SP from "./block.jpg";

const Rec1Stopwatch = () => {
  const navigate = useNavigate();
  const { currentRecSideSender } = useSelector((state) => state.RECSIDESENDER);
  const { t1 } = useParams();
  const c = 1;
  const [countdown, setCountdown] = useState(c*60);

  useEffect(() => {
    const storedCountdown = localStorage.getItem("countdown");
    const endTime = localStorage.getItem("endTime");

    if (c && storedCountdown && endTime) {
      const now = new Date().getTime();
      const remainingTime = endTime - now;
      if (remainingTime > 0) {
        setCountdown(Math.floor(remainingTime / 1000)); // Convert milliseconds to seconds
      } else {
        localStorage.removeItem("countdown");
        localStorage.removeItem("endTime");
      }
    } else if (c) {
      const endTime = new Date().getTime() + c * 60 * 1000; // Convert waitTime to milliseconds
      localStorage.setItem("endTime", endTime);
      setCountdown(c * 60); // Convert waitTime to seconds
    }
  }, [c]);

  useEffect(() => {
    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          const newCountdown = Math.max(prevCountdown - 1, 0); // Ensure countdown never goes below 0
          localStorage.setItem("countdown", newCountdown);
          return newCountdown;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else if (countdown === 0) {
      localStorage.removeItem("countdown");
      localStorage.removeItem("endTime");
      navigate("/rec1_5");
    }
  }, [countdown]);

  // Convert total seconds into minutes and seconds
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}>
      <div className="flex flex-col min-h-screen items-center justify-center px-6 mb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          {/* Left side */}
          <div className="w-full my-4 sm:pt-12 sm:max-w-xl bg-white opacity-80 shadow-md rounded-lg overflow-hidden">
            <h1 className="text-xl font-bold text-center mb-4">
              Time in which delivery guy will arrive outside of Gate-2
            </h1>

            <div className="flex items-center justify-center text-6xl sm:text-8xl font-bold">
              <div>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
              <AnimatedHourglass />
            </div>
          </div>

          {/* Right side */}
          <div className="w-full my-4 sm:max-w-xl bg-white opacity-80 shadow-md rounded-lg overflow-hidden">
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-xl font-bold mb-2">Receiver Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                <div className="flex flex-col">
                  <p className="text-gray-700 font-semibold">Name:</p>
                  <p className="text-gray-600">{currentRecSideSender.name}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-700 font-semibold">
                    Registration Number:
                  </p>
                  <p className="text-gray-600">
                    {currentRecSideSender.registrationNumber}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-700 font-semibold">Mobile Number:</p>
                  <p className="text-gray-600">
                    {currentRecSideSender.mobileNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rec1Stopwatch;
