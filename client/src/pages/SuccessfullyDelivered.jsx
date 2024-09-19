import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { theDashboard } from "../redux/dashboard/dashboardSlice";
import { Alert, Spinner } from "flowbite-react";
import SP from "./cycle.jpg";

const SuccessfullyDelivered = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const { currentUser } = useSelector((state) => state.user);
  const { currentReceiver } = useSelector((state) => state.RECEIVER);
  const formdata = {
    username: currentUser.username,
    receivers: [currentReceiver],
  };

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/dashboard/userdashboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          console.log("error from bakck");
        }

        if (res.ok) {
          console.log("success");
          dispatch(theDashboard(data));
          // console.log(data);
        }
      } catch (error) {
        console.log("error from cathc");
        setLoading(false);
      }
    };

    handleSubmit();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        navigate("/dashboard");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <Spinner size="xl" className="w-20 h-20" /> {/* Spinner size */}
            <span className="pl-3 text-xl">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          className="min-h-screen flex justify-center items-center bg-gray-100"
          style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}
        >
          <div className="bg-white bg-opacity-80 p-8 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-black">
              Successful Delivery!
            </h1>
            <p className="text-gray-700">
              Redirecting in {countdown} seconds...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessfullyDelivered;
