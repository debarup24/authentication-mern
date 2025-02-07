import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
   // here in AppContextProvider - we can declare any state variable or functions and we can access it in any component
 
  // for API hit, we have to send cookies also, for that we have to make "withCredentials = true" for the api request :
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  // Check Authentication
  const getAuthState = async () => {
    // we call this 'getAuthState' function when ever the page got rendered, therefore use - 'useEffect' hook

    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Create a func, that will get the user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");

      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // we call this 'getAuthState' function when ever the page got rendered,   therefore use - 'useEffect' hook
  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    //here we will pass all variables and Func, so that we can acess it in any other component
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
