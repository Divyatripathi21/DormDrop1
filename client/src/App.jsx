import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/ContactUs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sender from "./pages/Sender";
import Receiver from "./pages/Receiver";
import ReceiverPost from "./pages/ReceiverPost";
import SenderPost from "./pages/SenderPost";
import Stopwatch from "./pages/Stopwatch";
import AfterPickingTimer from "./pages/AfterPickingTimer";
import SendOTP from "./pages/SendOTP";
import { ToastContainer } from "react-toastify";
import SuccessfullyDelivered from "./pages/SuccessfullyDelivered";
import SenderEnd1 from "./pages/SenderEnd1";
import ReceiverEnd1 from "./pages/ReceiverEnd1";
import Rec2Stopwatch from "./pages/Rec2Stopwatch";
import Rec1_5 from "./pages/Rec1_5";
import YourOrders from "./pages/YourOrders";
import SuccessfullyReceived from "./pages/SuccessfullyReceived";
import PrivateRoute from "./components/PrivateRoute";
import SetPassword from "./pages/SetPassword";
import SetForgotPassword from "./pages/SetForgotPassword";
import Rec1Stopwatch from "./pages/Rec1Stopwatch";
import Ratings from "./pages/Ratings";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/:menuItem" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contactus" element={<ContactUs />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sender" element={<Sender />} />
          <Route path="/receiver" element={<Receiver />} />
          <Route path="/receiverpost" element={<ReceiverPost />} />
          <Route path="/senderpost" element={<SenderPost />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/afterpickingtimer" element={<AfterPickingTimer />} />
          <Route path="/sendotp" element={<SendOTP />} />
          <Route
            path="/successfullydelivered"
            element={<SuccessfullyDelivered />}
          />
          <Route
            path="/successfullyreceived"
            element={<SuccessfullyReceived />}
          />
          <Route path="/senderend1" element={<SenderEnd1 />} />
          <Route path="/receiverend1/:t1" element={<ReceiverEnd1 />} />
          <Route path="/rec1stopwatch/:t1" element={<Rec1Stopwatch />} />
          <Route path="/rec2stopwatch" element={<Rec2Stopwatch />} />
          <Route path="/rec1_5" element={<Rec1_5 />} />
          <Route path="/yourorders" element={<YourOrders />} />
          <Route path="/ratings" element={<Ratings />} />
        </Route>
        <Route path="/setpassword" element={<SetPassword />} />
        <Route
          path="/setforgotpassword/:username"
          element={<SetForgotPassword />}
        />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}
