import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { theOtp } from "../redux/otp/otpSlice";
import { io } from "socket.io-client";
import { Spinner } from "flowbite-react";
import SP from "./cycle.jpg";

const SendOTP = () => {
  const dispatch = useDispatch();
  const { currentReceiver } = useSelector((state) => state.RECEIVER);
  const [OtpSentSuccessfully, setOtpSentSuccessfully] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = currentReceiver.email;
  const formdata = {
    email: email,
  };

  const handleOnclick = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/otp/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setOtpSentSuccessfully(false);
        console.log("failed from try");
      }

      if (res.ok) {
        setOtpSentSuccessfully(true);
        console.log(data.otp);
        dispatch(theOtp(data.otp));
        //sending this to index.js to rec 1_5
        const socket = io.connect("http://localhost:3000");

        //   https://dormdrop.onrender.com
        //http://localhost:3000
        socket.on("connect", () => {
          console.log("Connected to server");
          socket.emit("picked", { message: "yes" });
        });

        navigate("/afterpickingtimer");
        toast.success("OTP SENT SUCCESSFULLY");
      }
    } catch (error) {
      setLoading(false);
      setOtpSentSuccessfully(false);
      toast.error("Something went wrong");
      console.log("failed from catch");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}
    >
      <div className="p-4 mx-4 rounded-xl bg-white bg-opacity-80 flex flex-col items-center justify-center ">
        <div className="text-2xl font-bold text-center mb-8">
          <p> The delivery partner has arrived outside of Gate-2.</p>
          <p>Please contact the receiver at phone number </p>
        </div>
        <div className="font-bold text-xl mb-8">
          Mobile Number:{" "}
          <a
            href={`tel:${currentReceiver.mobileNumber}`}
            className="text-blue-700 hover:text-blue-500"
          >
            {currentReceiver.mobileNumber}
          </a>
        </div>
        <div className="mb-2">
          <p>
            By clicking the Below button you confirm that you up the order and
            send an OTP To the Receiver
          </p>
        </div>
        {OtpSentSuccessfully === false ? (
          <button
            onClick={handleOnclick}
            className="hover:scale-105 transition-transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded"
          >
            Resend OTP/Confirm
          </button>
        ) : loading ? (
          <button
            onClick={handleOnclick}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded"
          >
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          </button>
        ) : (
          <button
            onClick={handleOnclick}
            className="hover:scale-105 transition-transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded"
          >
            Order picked? SendOtp/Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default SendOTP;
