import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up Now");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 via-rose-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer "
      />
      {/* Card */}
      <div className="bg-slate-900 p-10 rounded-xl shadow-lg shadow-blue-700 w-full sm:w-96 text-indigo-300 text-sm items-center ">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up Now" ? "Create Account" : "Login"}{" "}
        </h2>
        <p className="text-center mb-6 text-sm">
          {" "}
          {state === "Sign Up Now"
            ? "Create Your Account"
            : "Login to your account!"}
        </p>

        <form>
          {state === "Sign Up Now" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          {state === "Login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="mb-4 text-indigo-500 cursor-pointer font-medium"
            >
              Forgot Password?
            </p>
          )}

          <button className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-700 to-indigo-900 text-white font-medium">
            {" "}
            {state}
          </button>
        </form>

        {state === "Sign Up Now" ? (
          <p className="text-center mt-4 text-gray-400 text-sm">
            Already have an account? &nbsp;{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center mt-4 text-gray-400 text-sm">
            Don't have an account? &nbsp;{" "}
            <span
              onClick={() => setState("Sign Up Now")}
              className="text-blue-400 underline cursor-pointer"
            >
              Sign Up here
            </span>
          </p>
        )}

        <div className="text-center mt-2">
          <button className="bg-slate-700 rounded-md inline-flex p-3 my-3 gap-2  ">
            <img src={assets.google_icon} alt="" className=" w-5" /> Continue
            with <span className="font-semibold">Google</span>
          </button>

          {/* <button className="bg-slate-700 rounded-md p-3 my-3  ">
            Continue with <span className="font-semibold">Google</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
