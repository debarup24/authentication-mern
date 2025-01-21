import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // JUST COMMIT

  return (
    <div className=" w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className=" w-28 sm:w-32" />

      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 border border-gray-500 rounded-full shadow-md shadow-purple-500 px-6 py-2 text-black-200 hover:bg-gray-200 transition-all"
      >
        Login <img src={assets.arrow_icon} alt="" />
      </button>
    </div>
  );
};

export default Navbar;
