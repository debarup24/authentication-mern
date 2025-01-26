import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState(0);

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

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-200 via-rose-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer "
      />

      <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset Password OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your registered email address
        </p>

        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <img src={assets.mail_icon} alt="mail" className="w-3 h-3" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="bg-transparent outline-none text-white"
            placeholder="Email"
            required
          />
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white text-base mt-3">
          Submit
        </button>
      </form>

      {/* Next Form (2) for adding passw reset OTP */}

      <form
        // onSubmit={onSubmitHandler}
        className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Password Reset OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the six digit code sent to your email.
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                key={index}
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
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
          Submit
        </button>
      </form>

      {/* Enter New Password form (3) */}

      <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          New Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the new password
        </p>

        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <img src={assets.lock_icon} alt="" className="w-3 h-3" />
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            name="password"
            className="bg-transparent outline-none text-white"
            placeholder="New Password"
            required
          />
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white text-base mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
