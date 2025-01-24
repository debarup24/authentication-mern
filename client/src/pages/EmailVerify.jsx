import React from "react";
import { assets } from "../assets/assets";

const EmailVerify = () => {
  //Store the OTP

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-200 via-rose-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer "
      />

      <form className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verification OTP !
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the six digit code sent to your email.
        </p>
        <div className="flex justify-between mb-8">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                key={index}
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                required
                maxLength={1}
              />
            ))}
        </div>

        <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white  text-base hover:font-semibold">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
