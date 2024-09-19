import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SP from "./SP.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(res);

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      console.log("7");
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
      <div className="min-h-screen  flex flex-col justify-center items-center p-3">
        <div className="flex flex-col md:flex-row md:items-center p-5 rounded-lg shadow-lg max-w-3xl w-96 gap-5 bg-white bg-opacity-80">
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
                <Label value="Your Registration Number" />
                <TextInput
                  type="text"
                  placeholder="Enter your 9 digit registration number"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your email" />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your password" />
                <TextInput
                  type="password"
                  placeholder="Password"
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
                  "Sign Up"
                )}
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to="/signin" className="text-blue-500">
                Sign In
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
