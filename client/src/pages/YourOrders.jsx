import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Spinner } from "flowbite-react";
import { FiX } from "react-icons/fi"; // Import the X icon from react-icons
import SP from "./block.jpg";
export default function YourOrders() {
  const { currentYourOrders } = useSelector((state) => state.YOURORDERS);

  // Extracting data from currentYourOrders
  const { senders } = currentYourOrders;
  const [loading, setLoading] = useState(true);
  const [selectedSender, setSelectedSender] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set the loading time to 2 seconds (2000 milliseconds)

    return () => clearTimeout(timer);
  }, []);

  const handleSenderClick = (sender) => {
    setSelectedSender(sender);
  };

  const handleClosePopup = () => {
    setSelectedSender(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedSender &&
        !event.target.closest(".pop-up") &&
        !event.target.closest(".sender-card")
      ) {
        setSelectedSender(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedSender]);

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${SP})` }}>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 opacity-90 z-50">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="container mx-auto p-4">
          {currentYourOrders === 0 ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">
                You haven't received any orders yet!
              </h1>
              <p className="text-gray-600">Keep up the good work!</p>
            </div>
          ) : (
            <>
              <p className="text:xl sm:text-3xl font-bold text-center mb-5">
                Total Numbers of orders received by you:{" "}
                <span className="rounded-md p-1 text-red-900 sm:">
                  {senders.length}
                </span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {senders.map((sender, index) => (
                  <div
                    key={index}
                    className="relative bg-white opacity-80 text-black text-xl rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:z-10 cursor-pointer sender-card"
                    onClick={() => handleSenderClick(sender)}
                  >
                    <div className="absolute inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-lg rounded-lg"></div>
                    <ul className="relative z-10 text-center font-lobster">
                      <li>
                        <span className="">Name:</span> {sender.name}
                      </li>
                      <li>
                        <span className="">Registration Number:</span>{" "}
                        {sender.registrationNumber}
                      </li>
                      <li>
                        <span className="">Block:</span> {sender.block}
                      </li>
                      <li>
                        <span className="">Room:</span> {sender.room}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              {/* Pop-up for selected sender */}
              {selectedSender && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
                  <div className="relative size-80 flex flex-col items-center justify-center bg-white opacity-80 text-black text-xl rounded-3xl shadow-md p-4 pop-up">
                    <div className="absolute inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-lg rounded-lg"></div>
                    <div
                      className="absolute top-4 right-4 cursor-pointer"
                      onClick={handleClosePopup}
                    >
                      <FiX className="text-black text-xl hover:text-red-500" />
                    </div>
                    <ul className="relative z-10 text-center font-lobster">
                      <li>
                        <span className="">Name:</span> {selectedSender.name}
                      </li>
                      <li>
                        <span className="">Registration Number:</span>{" "}
                        {selectedSender.registrationNumber}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
