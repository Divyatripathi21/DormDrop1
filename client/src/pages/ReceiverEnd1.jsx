import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rec1Stopwatch from "./Rec1Stopwatch";
import { theRecSideSender } from "../redux/recSideSenderr/recSideSenderrSlice";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import SP from "./block.jpg";

const ReceiverEnd1 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentSender, setCurrentSender] = useState(null); // Define state variable to store currentSender
  const [f, setf] = useState(null); // Define state variable to store currentSender
  const [dataFetched, setDataFetched] = useState(false); // Flag to indicate whether data has been fetched
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {t1}=useParams();
  const t1 = 1;

  useEffect(() => {
    const fetchSenderData = async () => {
      try {
        const res = await fetch(
          `/api/senderend/senderend1/${currentUser.username}`
        );
        const data = await res.json();

        if (res.ok) {
          setCurrentSender(data.currentData.currentSender); // Store currentSender in state variable
          dispatch(theRecSideSender(data.currentData.currentSender));
          setDataFetched(true); // Set flag to true when data is fetched
          setf(data.currentData.currentReceiver.registrationNumber);
          console.log(`f is ${f}`);
          console.log(currentUser.username);

          const socket = io.connect("https://dormdrop.onrender.com");
          //https://dormdrop.onrender.com
          //http://localhost:3000
          socket.on("connect", () => {
            console.log("Connected to server");

            const sendermodel = data.currentData._id;
            socket.emit("deleteSenderend1model", sendermodel);
          });
        } else {
          console.log("Error retrieving sender data");
        }
      } catch (error) {
        console.log("Error fetching sender data:", error);
      }
    };

    fetchSenderData();

    // Fetch sender data every 5 seconds if data hasn't been fetched yet
    const interval = setInterval(() => {
      if (!dataFetched) {
        fetchSenderData();
      }
    }, 2000);

    // Clear the interval when the component unmounts or when currentUser changes
    return () => clearInterval(interval);
  }, [dataFetched]);

  useEffect(() => {
    if (currentSender && f === currentUser.username) {
      navigate(`/rec1stopwatch/${t1}`);
    }
  }, [currentSender, f, currentUser.username, navigate, t1]);

  return (
    <div style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}>
      <div className="h-screen flex justify-center items-center ">
        <div className="">
          <img
            src="https://media1.tenor.com/m/rec5dlPBK2cAAAAC/mr-bean-waiting.gif"
            alt="Waiting GIF"
            className="h-64  rounded-lg"
          />
          <div className="bg-white opacity-80 rounded-lg p-4 shadow-md text-center">
            <p className="text-xl font-semibold">
              Waiting for someone to pick your order
            </p>
            <p className="text-gray-600">
              Please wait patiently until the delivery person confirms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverEnd1;
