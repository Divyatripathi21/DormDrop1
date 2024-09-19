import { useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

export default function ContactUs() {
  const navigate = useNavigate();

  const handleCross = () => {
    navigate('/');
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 bg-white p-8 rounded-lg shadow-lg relative">
        <button className="absolute top-4 right-4 hover:text-red-500" onClick={handleCross}>
          <RiCloseLine size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-4xl font-bold my-5">Contact Us</h2>
        </div>
        <p className="font-semibold text-xl text-center mb-5">
          At DormDrop, we value your experience. If you encounter any issues or have suggestions on how we can improve our service, please don’t hesitate to reach out. We're here to ensure your deliveries are smooth and hassle-free.
        </p>
        <div className="text-center">
          <p className="text-lg font-medium">Company Name: DormDrop</p>
          <p className="text-lg font-medium">Email: <a href="mailto:dropdrom@gmail.com" className="text-blue-500">dropdrom@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
