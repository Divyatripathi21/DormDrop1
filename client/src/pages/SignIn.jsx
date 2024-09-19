import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import SP from "./SP.jpg";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
      <div className="min-h-screen flex items-center justify-center  p-5">
        <div className="rounded-lg flex p-6 max-w-lg w-96 mx-auto flex-col md:flex-row md:items-center gap-5 bg-white bg-opacity-80">
          <div className="flex-1">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
            >
              <div className="text-center mr-5 mb-5">
                <span className="px-2 py-1 mr- span-color rounded-lg bg-gray-300 text-gray-800 font-semibold">
                  Dorm
                </span>
                Drop
              </div>
            </Link>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Your Registration number" />
                <TextInput
                  type="text"
                  placeholder="Enter your 9 digit registration number"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your password" />
                <TextInput
                  type="password"
                  placeholder="**********"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <div to="/signup" className="text-black">
                New to DormDrop?  
                <Link to="/signup" className="text-blue-500 ml-1">
                Create an account
                </Link>
              </div>
            </div>
            <div className="flex gap-2 text-sm mt-5">
              <Link to="/setpassword" className="text-blue-500">
                Forgot password?
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
