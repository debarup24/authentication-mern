import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);

  //Store the OTP
  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Delete the input number using backspace button on keyboard
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // OTP Paste : copy OTP from email, paste it in the input by "ctrl+v" & it should be filled in all 6 input places
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text"); // data added
    // split it (added Data)
    const pasteArray = paste.split("");

    // ** Now paste all the number one by one in the input field
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      // store the OTP in the otpArray
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join(""); // join this array & create a single string

      // Backend API call
      const { data } = await axios.post(backendUrl + "/api/auth/");
    } catch (error) {}
  };

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
          Email Verification OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the seven digit code sent to your email.
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                key={index}
                className="w-10 h-10 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                // move cursor to next automatically
                onInput={(e) => handleInput(e, index)}
                // backspace key
                onKeyDown={(e) => handleKeyDown(e, index)}
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
