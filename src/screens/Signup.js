import React,{useState} from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [credentials,setcredentials]=useState({name:'',email:'',password:'',location:''})
  const handleSubmit = async(e) => {
    e.preventDefault()
    const response=await fetch("http://localhost:5000/api/createuser",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.location})
    })
    const json=await response.json()
    console.log(json)
  };
  const handleChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleUser = () => {};

  return (
    <div className="flex justify-center items-center h-screen bg-black/85">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-lg">
        <h1 className="text-3xl text-center font-semibold">
          <i className="fa-regular fa-user mr-2"></i>
          Create User
        </h1>
        <hr className="my-4" />
        <div className="mb-4">
          <label htmlFor="username" className="block text-base mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border w-full text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-md"
            placeholder="Enter Username"
            name="name"
            value={credentials.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-base mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border w-full text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-md"
            placeholder="Enter Email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-base mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border w-full text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-md"
            placeholder="Enter Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-base mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="border w-full text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-md"
            placeholder="Enter Location"
            name="location"
            value={credentials.location}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
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
        <div className="flex justify-between">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-1/2 border-2 border-green-700 bg-green-700 text-white py-2 mx-1 rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
          >
            Signup
          </button>
          <button
            type="submit"
            onClick={handleUser}
            className="w-1/2 border-2 border-indigo-700 bg-indigo-700 text-white py-2 mx-1 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
          >
            <Link to='/login'>
            Already a user
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
