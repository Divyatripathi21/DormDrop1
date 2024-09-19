import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SP from "./SP.jpg";
export default function SetForgotPassword() {
  const [newPass, setnewPass] = useState();
  const [confnewPass, setconfnewPass] = useState();
  const navigate = useNavigate();
  const { username } = useParams();
  const [loading, setLoading] = useState(false);

  const handleChange1 = (e) => {
    setnewPass(e.target.value);
  };

  const handleChange2 = (e) => {
    setconfnewPass(e.target.value);
  };

  const handleOnclick = async (e) => {
    e.preventDefault();

    if (newPass !== confnewPass) {
      toast.error("Password Do Not Match Try Again");
    } else {
      try {
        setLoading(true);
        const res = await fetch(`/api/otp/setforgotpassword/${username}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ confnewPass }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          console.log("error from backend");
        }

        if (data.success === true) {
          toast.success("Password Reset Successfully");
          navigate("/signin");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${SP})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-xl shadow-md ">
          <h1 className="text-2xl font-semibold mb-1">Set Your New Password</h1>
          <div className="flex flex-col items-center">
            <label htmlFor="New Password" className="mb-2"></label>
            <input
              type="text"
              id="New Password"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="New Password"
              onChange={handleChange1}
            />
            <label htmlFor="Confirm Password" className="mb-2"></label>
            <input
              type="text"
              id="Confirm Password"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Confirm Password"
              onChange={handleChange2}
            />
            {loading ? (
              <>
                <button
                  onClick={handleOnclick}
                  className="mt-4 hover:scale-105 transition-transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8  shadow-md text-white font-semibold py-2 px-4 rounded-md "
                >
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleOnclick}
                className="mt-4 hover:scale-105 transition-transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8  shadow-md text-white font-semibold py-2 px-4 rounded-md "
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
