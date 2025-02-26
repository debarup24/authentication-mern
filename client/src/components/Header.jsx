import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center text-xl gap-2 sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"} !
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />{" "}
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to My App
      </h2>
      <p className="mb-8 max-w-md">
        {" "}
        Let's start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <div className="flex flex-row gap-3">
        <button className=" w-44 h-9 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md shadow-rose-400 transition-all px-3 py-1">
          Get Started
        </button>
        <Link to={"/ai-mail"}>
          <button className=" w-44 h-9 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md shadow-rose-400 transition-all px-3 py-1">
            AI Email
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
