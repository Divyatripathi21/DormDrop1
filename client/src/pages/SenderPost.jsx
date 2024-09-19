import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SenderPost = () => {
  const [senderData, setsenderData] = useState([]);

  useEffect(() => {
    const fetchSenderPost = async () => {
      try {
        const res = await fetch("/api/sender/senderpost");
        const data = await res.json();

        if (res.ok) {
          setsenderData(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSenderPost();
  }, [setsenderData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {senderData.map((sender) => (
        <div key={sender._id} className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800">{sender.name}</h3>
          <p className="text-gray-600 mt-2">
            Registration Number: {sender.registrationNumber}
          </p>
          <p className="text-gray-600">Phone Number: {sender.mobileNumber}</p>
          <p className="text-gray-600">
            Time Availability: {sender.availabilityTime}
          </p>
          <Link to="/stopwatch">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out">
              Confirm to Proceed
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SenderPost;