import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const { menuItem } = useParams();

  const handleCross = () => {
    navigate('/');
  }

  const getContent = () => {
    switch (menuItem) {
      case "Our Work":
        return "DormDrop is a cutting-edge platform designed to simplify student life by facilitating quick and reliable deliveries within campus premises. Our mission is to bridge the gap between students and the items they need from Gate 2, providing a convenient, efficient, and secure service. With DormDrop, students can effortlessly have their items delivered directly to their hostel rooms, ensuring a hassle-free experience that saves time and reduces stress.";
      case "Sender Perspective":
        return "As a sender, a student near the Student Plaza can fill out a form to check if any receivers are waiting for deliveries from Gate 2. If a receiver is available, the sender can choose them based on their hostel block, pick up the item from Gate 2, and deliver it to the hostel block after verifying an OTP.";
      case "Receiver Perspective":
        return "As a receiver, your role begins once a sender selects you from the list of available students. A timer will start to show when the sender picks up your order from Gate 2. You'll see another timer tracking the sender's arrival at your hostel block. Once the sender arrives, you'll verify the delivery using an OTP. After the delivery is complete, you'll have the option to rate the sender, which will be updated in their rating section.";
      default:
        return "DormDrop was born out of the frustrations we faced as students trying to get items delivered from Gate 2 to our hostel rooms, especially during hot summers, rainy days, or on those lazy Sundays. The path between the hostel and the gate is challenging, with steep slopes that make the journey time-consuming and exhausting. Balancing a busy schedule, we realized the need for a solution that saves time and effort. Our motivation was to create a service that eliminates these hassles, making campus life more convenient and stress-free.";
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 bg-white p-8 rounded-lg shadow-lg relative">
        <button className="absolute top-4 right-4 hover:text-red-500" onClick={handleCross}>
          <RiCloseLine size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-4xl font-bold my-5">{menuItem}</h2>
        </div>
        <p className="font-semibold text-xl text-center">{getContent()}</p>
      </div>
    </div>
  );
}
