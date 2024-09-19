import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Spinner } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
export default function SenderEnd1() {
  const { currentReceiver } = useSelector((state) => state.RECEIVER);
  const { currentSender } = useSelector((state) => state.SENDER);
  const [loading, setLoading] = useState(false);
 
 

  const navigate = useNavigate();

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/senderend/senderend1", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentReceiver, currentSender }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          console.log("error from bakck");
          toast.error("Something went wrong...")
         
        }

        if (res.ok) {
          console.log("success");
          console.log("ho gya bhaiya");
          navigate("/stopwatch")
        }
      } catch (error) {
        setLoading(false);
        console.log("error from catch");
        toast.error("Something went wrong...")
        navigate("/receiverpost")
      }
    };

    handleSubmit();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <Spinner size="xl" className="w-20 h-20" /> {/* Spinner size */}
            <span className="pl-3 text-xl">Loading...</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}