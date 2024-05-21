import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("email",credentials.email)
      localStorage.setItem("authToken",json.authtoken)
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black/85">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="block text-3xl text-center font-semibold">
          <i className="fa-regular fa-user"></i> Login
        </h1>
        <hr className="mt-3" />
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="email" className="block text-base mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              placeholder="Enter Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="block text-base mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              placeholder="Enter Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2">
                Remember Me
              </label>
            </div>
            <div>
              <Link to="#" className="text-indigo-800 font-semibold">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <button
              type="submit"
              className="bg-green-700 border-2 border-green-700 text-white py-1 mx-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
            >
              Login
            </button>
          
          <button className="bg-indigo-700 border-2 border-indigo-700 text-white py-1 mx-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">
            <Link
              to="/signup"
            >
              Signup
            </Link>
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
