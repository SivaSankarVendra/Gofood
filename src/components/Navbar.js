import React, { useState, } from "react";
import { Link,useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Wishlist from "../screens/Wishlist";
import { useCart } from "./ContentReducer";
import logo from "../assets/logo.png"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate()
  const [modalView,setModalView]=useState(false)

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout=()=>{
    localStorage.removeItem("authToken")
    navigate("/login")
  }
  const data=useCart()

  return (
    <nav className="p-5 bg-green-600/85 text-white shadow md:flex md:justify-between md:items-center font-poppins h-[10vh] md:h-[9vh]">
      <div className="flex justify-between items-center">
        <span className="text-base sm:text-xl md:text-2xl lg:text-3xl font-Poppins font-bold cursor-pointer">
          <span>GoFood</span>
          <img
            className="h-8 md:h-10 lg:h-12 inline pb-2"
            src={logo}
            alt="logo"
          />
        </span>
        
        <span
          className="text-3xl cursor-pointer mx-2 md:hidden block"
          onClick={handleMenu}
        >
          <i className={isMenuOpen ? "fas fa-xmark" : "fas fa-bars"}></i>
        </span>
      </div>
      <ul
        className={`md:flex md:items-center md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 ${
          isMenuOpen ? "block" : "hidden"
        } md:static absolute bg-green-500 md:bg-transparent w-full left-0 top-16 transition-all ease-in duration-500 z-10`}
      >
        <li className="mx-1.5 lg:mx-4 my-6 md:my-0">
          <Link
            to="/"
            className="text-xl md:text-lg lg:text-xl hover:text-slate-600 duration-500"
          >
            Home
          </Link>
        </li>

        <li className="mx-1.5 lg:mx-4 my-6 md:my-0">
          <Link
            to="/about"
            className="text-xl md:text-lg lg:text-xl hover:text-slate-600 duration-500"
          >
            About
          </Link>
        </li>

        {localStorage.getItem("authToken") ? (
          <li className="mx-1.5 lg:mx-4 my-6 md:my-0">
            <Link
              to="/myOrders"
              className="text-xl md:text-lg lg:text-xl hover:text-slate-600 duration-500"
            >
              My Orders
            </Link>
          </li>
        ) : (
          ""
        )}

        {!localStorage.getItem("authToken") ? (
          <div>
            <button className="bg-white block md:inline my-2 text-green-700 font-Poppins font-semibold duration-500 px-6 py-2 mx-1 lg:mx-2 rounded-md hover:bg-gray-200 hover:text-black">
              <Link to="/login">Login</Link>
            </button>
            <button className="bg-white block md:inline my-4 text-green-700 font-Poppins font-semibold duration-500 px-6 py-2 mx-1 lg:mx-2 rounded-md hover:bg-gray-200 hover:text-black">
              <Link to="/signup">Signup</Link>
            </button>
          </div>
        ) : (
          <div>
            <button className="bg-white block md:inline my-2 text-green-600/85 font-Poppins font-semibold duration-500 px-6 py-2 mx-1 lg:mx-2 rounded-md hover:bg-gray-200 hover:text-black"  onClick={()=>setModalView(true)}>
              My Wishlist{" "}{data.length?<span className="px-2 py-1 rounded-full text-white text-xs bg-red-600">{data.length}</span>:null}
            </button>
            {modalView? <Modal onClose={()=>setModalView(false)}><Wishlist/></Modal>:null}
            <button className="bg-red-600 block md:inline my-4 text-white font-Poppins font-semibold duration-500 px-6 py-2 mx-1 lg:mx-2 rounded-md hover:bg-gray-200 hover:text-black" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
