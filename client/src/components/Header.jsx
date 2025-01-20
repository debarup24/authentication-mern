import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center text-xl gap-2 sm:text-3xl font-medium mb-2">
        Hey Developer{" "}
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
      <button className=" w-44 h-9 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md shadow-rose-400 transition-all px-3 py-1">
        Get Started
      </button>
    </div>
  );
};

export default Header;
