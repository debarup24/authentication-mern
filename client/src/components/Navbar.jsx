import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { MdVerified } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const { backendUrl, getUserData, setIsLoggedin, userData, setUserData } =
    useContext(AppContext);

  axios.defaults.withCredentials = true;

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className=" w-28 sm:w-32" />

      <div className=" flex flex-row ">
        {userData ? (
          <div className="bg-black rounded-full w-9 h-9 shadow-md shadow-red-600 cursor-pointer flex justify-center items-center text-white text-lg font-semibold relative group">
            {userData.name[0].toUpperCase()}
            {/* <div>
            {" "}
            <MdVerified className="text-blue-400" />{" "}
          </div> */}

            <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-9 text-slate-800">
              <ul className=" list-none m-0 p-2 rounded-md bg-gray-100 text-sm">
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Verify email
                  </li>
                )}

                <li
                  onClick={logout}
                  className="py-1 px-2 pr-10 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 border border-gray-500 rounded-full shadow-md shadow-purple-500 px-6 py-2 text-black-200 hover:bg-gray-200 transition-all"
          >
            Login <img src={assets.arrow_icon} alt="" />
          </button>
        )}
        {userData.isAccountVerified && (
          <div className="relative mt-4">
            {" "}
            <MdVerified className="text-blue-600 size-6 ml-[-9px]" />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
