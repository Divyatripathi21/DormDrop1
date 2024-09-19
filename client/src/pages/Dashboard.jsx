import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Spinner } from "flowbite-react";
import { FiX } from "react-icons/fi"; // Import the X icon from react-icons
import SP from "./block.jpg";
 
export default function Dashboard() {
  const { currentDashboard } = useSelector((state) => state.DASHBOARD);
  const { currentUser } = useSelector((state) => state.user);
 
  // Extracting data from currentDashboard
  const { receivers } = currentDashboard;
  const [loading, setLoading] = useState(true);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [rating, setRating] = useState(0);
 
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(`/api/rating/storeRating/${currentUser.username}`);
        const data = await res.json();
        console.log(data);
 
        if (res.ok) {
          setRating(data.rate);
          
        } else {
          console.log("Error retrieving rating");
        }
      } catch (error) {
        console.log("Error fetchingsd rating:", error);
      }
    };
    

     // Fetch sender data every 5 seconds if data hasn't been fetched yet
     const interval = setInterval(() => {
      if (!rating) {
        fetchRating();
      }
    }, 2000);

    // Clear the interval when the component unmounts or when currentUser changes
    return () => clearInterval(interval);

    
  }, [rating]);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set the loading time to 2 seconds (2000 milliseconds)
 
    return () => clearTimeout(timer);
  }, []);
 
  const handleReceiverClick = (receiver) => {
    setSelectedReceiver(receiver);
  };
 
  const handleClosePopup = () => {
    setSelectedReceiver(null);
  };
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedReceiver &&
        !event.target.closest(".pop-up") &&
        !event.target.closest(".receiver-card")
      ) {
        setSelectedReceiver(null);
      }
    };
 
    document.addEventListener("click", handleClickOutside);
 
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedReceiver]);
 
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${SP})` }}
    >
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 opacity-75 z-50">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="container mx-auto p-4">
          {currentDashboard === 0 ? (
            <div className="text-center min-h-screen ">
              <div className="bg-white bg-opacity-40">
                <h1 className="text-3xl font-bold mb-4 ">
                  You haven't delivered any orders yet!
                </h1>
                <p className="text-gray-600">Keep up the good work!</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl sm:text-3xl font-bold text-center mb-5">
                Total Numbers of orders you delivered:{" "}
                <span className="rounded-md p-1 text-yellow-900 sm:">
                  {receivers.length}
                </span>
              </p>
              <p className="text-xl sm:text-3xl font-bold text-center mb-5">
                Your rating is:{" "}
                <span className="rounded-md p-1 text-yellow-900 sm:">
                  {rating === 0 ?  "Not yet rated" : rating}
                </span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {receivers.map((receiver, index) => (
                  <div
                    key={index}
                    className="relative bg-white bg-opacity-40 text-black text-xl rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:z-10 cursor-pointer receiver-card"
                    onClick={() => handleReceiverClick(receiver)}
                  >
                    <div className="absolute inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-lg rounded-lg"></div>
                    <ul className="relative z-10 text-center font-lobster">
                      <li>
                        <span className=""></span> {receiver.name}
                      </li>
                      <li>
                        <span className=""></span> {receiver.registrationNumber}
                      </li>
                      <li>
                        <span className="">Block:</span>
                        <span className="ml-1">{receiver.block}</span>
                        <span className=" ml-4">Room:</span>
                        <span className="ml-1">{receiver.room}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              {/* Pop-up for selected receiver */}
              {selectedReceiver && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
                  <div className="relative size-80 flex flex-col items-center justify-center bg-white bg-opacity-80 text-black text-xl rounded-3xl shadow-md p-4 ">
                    <div className="absolute inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-lg rounded-lg"></div>
                    <div
                      className="absolute top-4 right-4 cursor-pointer"
                      onClick={handleClosePopup}
                    >
                      <FiX className="text-black text-xl hover:text-red-500" />
                    </div>
                    <ul className="relative z-10 text-center font-lobster">
                      <li>
                        <span className=""></span> {selectedReceiver.name}
                      </li>
                      <li>
                        <span className=""></span>{" "}
                        {selectedReceiver.registrationNumber}
                      </li>
                      <li>
                        <span className="">Block:</span>
                        <span className="ml-1">{selectedReceiver.block}</span>
                        <span className=" ml-4">Room:</span>
                        <span className="ml-1">{selectedReceiver.room}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}